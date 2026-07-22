import 'dotenv/config';
import { readdirSync, existsSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import { v2 as cloudinary } from 'cloudinary';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

const semesterArg = process.argv.find((a) => a.startsWith('--semester='));
const SEMESTER = semesterArg ? semesterArg.split('=')[1] : null;
const THUMBS_DIR = SEMESTER
  ? join(ROOT, 'public', 'images', 'archive', SEMESTER, 'thumbs')
  : null;

const UPLOAD_PRESET = process.env.CLOUDINARY_UPLOAD_PRESET ?? 'catedra_palestina';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

const ACCENT_MAP = {
  á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u',
  ñ: 'n', ü: 'u', à: 'a', è: 'e', ì: 'i',
  ò: 'o', ù: 'u', ã: 'a', õ: 'o', ç: 'c',
};

function slugify(text, maxLen = 50) {
  return text
    .toLowerCase()
    .replace(/[áéíóúñüàèìòùãõç]/g, (c) => ACCENT_MAP[c] || c)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, maxLen)
    .replace(/-+$/, '');
}

async function uploadToCloudinary(filePath, publicId) {
  const result = await cloudinary.uploader.upload(filePath, {
    public_id: publicId,
    upload_preset: UPLOAD_PRESET,
    overwrite: true,
  });
  return result.secure_url;
}

async function main() {
  console.log('=== Subir thumbnails a Cloudinary + actualizar Supabase ===\n');

  if (SEMESTER && !existsSync(THUMBS_DIR)) {
    console.error(`Error: No se encuentra el directorio de thumbnails:\n  ${THUMBS_DIR}`);
    process.exit(1);
  }

  let thumbMap = {};
  if (THUMBS_DIR && existsSync(THUMBS_DIR)) {
    const files = readdirSync(THUMBS_DIR).filter((f) => f.endsWith('.webp'));
    console.log(`Encontrados ${files.length} archivos locales.\n`);
    for (const f of files) {
      const prefix = f.slice(0, 2);
      thumbMap[prefix] = f;
    }
  } else {
    console.log('Sin directorio local — se leerán thumbnails desde Supabase.\n');
  }

  let query = supabase
    .from('projects')
    .select('id, n, kind, year, title, thumbnail')
    .order('id', { ascending: true });

  if (SEMESTER) {
    query = query.eq('year', SEMESTER);
  }

  const { data: projects, error } = await query;

  if (error) {
    console.error('Error al consultar Supabase:', error.message);
    process.exit(1);
  }

  console.log(`Consultados ${projects.length} proyectos en Supabase.\n`);

  let uploaded = 0;
  let skipped = 0;
  let failed = 0;

  for (const p of projects) {
    const filename = thumbMap[p.n];
    if (!filename) {
      console.log(`[${p.n}] ! No se encontró thumbnail local para n=${p.n}`);
      skipped++;
      continue;
    }

    const filePath = join(THUMBS_DIR, filename);
    const slug = slugify(p.title, 50);
    const publicId = `projects/${p.year}/${p.n}-${p.kind}-${slug}`;

    try {
      const url = await uploadToCloudinary(filePath, publicId);
      console.log(`[${p.n}] ✓ ${publicId}`);

      const { error: updateError } = await supabase
        .from('projects')
        .update({ thumbnail: url })
        .eq('id', p.id);

      if (updateError) {
        console.log(`         ✗ DB update failed: ${updateError.message}`);
        failed++;
      } else {
        uploaded++;
      }
    } catch (err) {
      console.log(`[${p.n}] ✗ Upload failed: ${err.message}`);
      failed++;
    }
  }

  console.log('\n=== Resumen ===');
  console.log(`Subidos y actualizados: ${uploaded}`);
  console.log(`Saltados (sin archivo local): ${skipped}`);
  console.log(`Fallidos: ${failed}`);
}

main().catch((err) => {
  console.error('Error fatal:', err);
  process.exit(1);
});
