import sharp from 'sharp';
import toIco from 'to-ico';
import { readFileSync, writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PUBLIC = resolve(__dirname, '..', 'public');

const MASTER = 512;
const CIRCLE_BG = '#F5F5F5';

/* ============ 1. Read source PNG & make black bg transparent ============ */
const source = readFileSync(resolve(PUBLIC, 'tree-icon.png'));

const raw = await sharp(source)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const { data } = raw;
for (let i = 0; i < data.length; i += 4) {
  const max = Math.max(data[i], data[i + 1], data[i + 2]);
  if (max < 20) {
    data[i + 3] = 0;
  } else if (max < 50) {
    data[i + 3] = Math.round(((max - 20) / 30) * 255);
  }
}

const transparent = await sharp(data, {
  raw: { width: raw.info.width, height: raw.info.height, channels: 4 },
})
  .png()
  .toBuffer();

/* ============ 2. Trim empty space & scale to fill circle diameter ============ */
const circleDiam = Math.round(MASTER * 0.92);
const iconFilled = await sharp(transparent)
  .trim()
  .resize(circleDiam, circleDiam, { fit: 'cover', position: 'centre' })
  .png()
  .toBuffer();

/* ============ 3. White smoke circle ============ */
const circleSvg = `<svg width="${MASTER}" height="${MASTER}" viewBox="0 0 ${MASTER} ${MASTER}" xmlns="http://www.w3.org/2000/svg">
  <circle cx="${MASTER / 2}" cy="${MASTER / 2}" r="${MASTER * 0.46}" fill="${CIRCLE_BG}"/>
</svg>`;

const circle = await sharp(Buffer.from(circleSvg)).png().toBuffer();

/* ============ 4. Composite: circle bg + transparent icon ============ */
const master = await sharp({
  create: { width: MASTER, height: MASTER, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } },
})
  .composite([
    { input: circle, gravity: 'centre' },
    { input: iconFilled, gravity: 'centre' },
  ])
  .png()
  .toBuffer();

/* ============ 5. Generate all sizes ============ */
const SIZES = [
  { size: 16,  name: 'favicon-16x16.png',        ico: true },
  { size: 32,  name: 'favicon-32x32.png',        ico: true },
  { size: 48,  name: 'favicon-48x48.png',        ico: true },
  { size: 180, name: 'apple-touch-icon.png',     ico: false },
  { size: 192, name: 'icon-192.png',             ico: false },
  { size: 512, name: 'icon-512.png',             ico: false },
];

const icoInputs = [];

for (const { size, name, ico } of SIZES) {
  const buf = await sharp(master).resize(size, size).png().toBuffer();
  writeFileSync(resolve(PUBLIC, name), buf);
  console.log(`  OK  ${name}`);
  if (ico) icoInputs.push(buf);
}

/* ============ 6. .ico ============ */
const icoBuf = await toIco(icoInputs);
writeFileSync(resolve(PUBLIC, 'favicon.ico'), icoBuf);
console.log('  OK  favicon.ico (16+32+48)');

/* ============ 7. favicon.svg ============ */
const b64 = master.toString('base64');
const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${MASTER} ${MASTER}" width="${MASTER}" height="${MASTER}">
  <image width="${MASTER}" height="${MASTER}" xlink:href="data:image/png;base64,${b64}"/>
</svg>`;
writeFileSync(resolve(PUBLIC, 'favicon.svg'), svg);
console.log('  OK  favicon.svg');

/* ============ 8. OG image (white bg + tree) ============ */
const OG_W = 1200, OG_H = 630, ICON_SZ = 420;

const ogIcon = await sharp(master).resize(ICON_SZ, ICON_SZ).png().toBuffer();

const ogImage = await sharp({
  create: { width: OG_W, height: OG_H, channels: 3, background: { r: 245, g: 245, b: 245 } },
})
  .composite([{ input: ogIcon, gravity: 'centre' }])
  .png()
  .toBuffer();

writeFileSync(resolve(PUBLIC, 'og-image.png'), ogImage);
console.log('  OK  og-image.png');

console.log('\nAll favicons regenerated with white-circle background.');
