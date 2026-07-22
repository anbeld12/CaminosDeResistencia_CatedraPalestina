import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY,
);

async function migrate() {
  console.log('Migrando semestres existentes…');

  const { data: projects, error } = await supabase
    .from('projects')
    .select('year');

  if (error) {
    console.error('Error al obtener proyectos:', error.message);
    process.exit(1);
  }

  const unique = new Set(projects.map((p) => p.year).filter(Boolean));
  const years = Array.from(unique).sort();

  if (years.length === 0) {
    console.log('No se encontraron semestres en los proyectos.');
    process.exit(0);
  }

  console.log(`Semestres encontrados: ${years.join(', ')}`);

  for (const year of years) {
    const { error: insertError } = await supabase
      .from('semesters')
      .upsert({ name: year }, { onConflict: 'name' });

    if (insertError) {
      console.error(`Error al insertar "${year}":`, insertError.message);
    } else {
      console.log(`  ✓ "${year}" creado`);
    }
  }

  const { count } = await supabase
    .from('semesters')
    .select('*', { count: 'exact', head: true });

  console.log(`\nTotal semestres en la tabla: ${count}`);
  console.log('Migración completada.');
}

migrate();
