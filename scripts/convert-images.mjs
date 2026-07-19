import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'fs';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';

const FONDOS = 'C:/Users/Acbel/Documents/Desarrollo/Palestina/FondosArchivo';
const ARCHIVE = 'C:/Users/Acbel/Documents/Desarrollo/Palestina/public/images/archive/2025-I';
const THUMBS = join(ARCHIVE, 'thumbs');

const THUMB_MAP = [
  { file: 'Grupo 1 - Cementario de Memorias.jpeg', name: '01_Video_Grupo01_CementerioMemorias.webp' },
  { file: 'Grupo 2 - Identidad Palestina.jpeg',    name: '02_Video_Grupo02_IdentidadPalestina.webp' },
  { file: 'Grupo 3 - Linea de tiempo.jpeg',        name: '03_Cartografia_Grupo03_LineaTiempo.webp' },
  { file: 'Grupo 4 - Mural.jpg',                   name: '04_Mural_Grupo04_Invisibilizados.webp' },
  { file: 'Grupo 5 - Mural.jpg',                   name: '05_Mural_Grupo05_CaminosResistencia.webp' },
  { file: 'Grupo 6.jpg',                           name: '06_Collage_Grupo06_DosNarrativas.webp' },
  { file: 'Grupo 7.jpeg',                          name: '07_Podcast_Grupo07_BellezaHorror.webp' },
  { file: 'Grupo 8.jpeg',                          name: '08_Podcast_Grupo08_VocesEntreMuros.webp' },
  { file: 'Grupo 9.jpeg',                          name: '09_Collage_Grupo09_FragmentosTerritorio.webp' },
  { file: 'Grupo 10.jpg',                          name: '10_Collage_Grupo10_MujerPalestina.webp' },
  { file: 'Grupo 11.jpg',                          name: '11_Collage_Grupo11_Nakba.webp' },
  { file: 'Grupo 12.jpg',                          name: '12_Fanzine_Grupo12_MujeresPalestina.webp' },
  { file: 'Grupo 13.jpeg',                         name: '13_Podcast_Grupo13_VocesUniversidad.webp' },
  { file: 'Grupo 14.jpg',                          name: '14_Collage_Grupo14_ExpresionesGenocidio.webp' },
  { file: 'Grupo 15.jpg',                          name: '15_Grabado_Grupo15_Linoleo.webp' },
  { file: 'Grupo 16.jpeg',                         name: '16_Ensayo_Grupo16_ActivismoMedios.webp' },
  { file: 'Grupo 17.jpeg',                         name: '17_Video_Grupo17_GritoLibertad.webp' },
  { file: 'Grupo 18.jpeg',                         name: '18_Podcast_Grupo18_VocesPalestina.webp' },
  { file: 'Grupo 19.jpg',                          name: '19_Mural_Grupo19_PintandoVerdad.webp' },
  { file: 'Grupo 20.jpg',                          name: '20_Mural_Grupo20_CuidadoGuerra.webp' },
  { file: 'Grupo 21.jpeg',                         name: '21_Video_Grupo21_EducandoEscombros.webp' },
  { file: 'Grupo 22.jpg',                          name: '22_Collage_Grupo22_EntreEscombros.webp' },
  { file: 'Grupo 23.jpeg',                         name: '23_Video_Grupo23_RascalChildren.webp' },
  { file: 'Grupo 24.jpg',                          name: '24_Mural_Grupo24_PancartaSalud.webp' },
  { file: 'Grupo 25.jpg',                          name: '25_Podcast_Grupo25_VocesResisten.webp' },
  { file: 'Grupo 26.jpeg',                         name: '26_Podcast_Grupo26_VocesPalestina.webp' },
];

const EXISTING_MAP = [
  { file: '03_Cartografia_Grupo03_QR.png',       name: '03_Cartografia_Grupo03_QR.webp' },
  { file: '06_Collage_Grupo06_Israel.jpg',        name: '06_Collage_Grupo06_Israel.webp' },
  { file: '06_Collage_Grupo06_Palestina.jpg',     name: '06_Collage_Grupo06_Palestina.webp' },
  { file: '09_Collage_Grupo09_Maqueta_Foto.jpeg', name: '09_Collage_Grupo09_Maqueta_Foto.webp' },
];

async function convert(srcPath, destPath) {
  await sharp(srcPath).webp({ quality: 82 }).toFile(destPath);
  console.log(`  ✓ ${destPath.split('/').slice(-2).join('/')}`);
}

async function main() {
  console.log('=== Converting FondosArchivo → thumbs/ ===');
  for (const { file, name } of THUMB_MAP) {
    const src = join(FONDOS, file);
    const dest = join(THUMBS, name);
    await convert(src, dest);
  }

  console.log('\n=== Converting existing images in 2025-I/ ===');
  for (const { file, name } of EXISTING_MAP) {
    const src = join(ARCHIVE, file);
    const dest = join(ARCHIVE, name);
    await convert(src, dest);
  }

  console.log('\n✅ Done!');
}

main().catch(console.error);
