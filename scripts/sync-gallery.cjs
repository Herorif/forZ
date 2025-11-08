const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = process.cwd();
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'public');
const OUTPUT = path.join(PROJECT_ROOT, 'src', 'content', 'galleryMedia.ts');

const SUPPORTED = new Set(['.jpg', '.jpeg', '.mp4']);

const files = fs
  .readdirSync(PUBLIC_DIR)
  .filter((file) => SUPPORTED.has(path.extname(file).toLowerCase()))
  .sort((a, b) => a.localeCompare(b));

const entries = files.map((name) => ({
  src: `/${name}`,
  type: name.toLowerCase().endsWith('.mp4') ? 'video' : 'image',
  label: name.replace(/\.[^/.]+$/, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim(),
}));

const content = `export type GalleryMediaItem = {
  src: string;
  type: 'image' | 'video';
  label: string;
};

export const galleryMedia: GalleryMediaItem[] = ${JSON.stringify(entries, null, 2)};
`;

fs.writeFileSync(OUTPUT, content);
console.log(`✨ Synced ${entries.length} media files into src/content/galleryMedia.ts`);

