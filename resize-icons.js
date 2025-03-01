import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function resizeIcon() {
  const sourceIcon = path.join(__dirname, 'public', 'icons', 'icon.png');

  // Check if source icon exists
  if (!fs.existsSync(sourceIcon)) {
    console.error('Source icon not found:', sourceIcon);
    process.exit(1);
  }

  // Create 128px icon
  await sharp(sourceIcon)
    .resize(128, 128)
    .toFile(path.join(__dirname, 'public', 'icons', 'icon128.png'));

  // Create 48px icon
  await sharp(sourceIcon)
    .resize(48, 48)
    .toFile(path.join(__dirname, 'public', 'icons', 'icon48.png'));

  // Create 16px icon
  await sharp(sourceIcon)
    .resize(16, 16)
    .toFile(path.join(__dirname, 'public', 'icons', 'icon16.png'));

  console.log('Icons resized successfully!');
}

resizeIcon().catch(err => {
  console.error('Error resizing icons:', err);
  process.exit(1);
});