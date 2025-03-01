import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Configuration options
const config = {
  sourceDir: 'public/screenshots',
  destinations: [
    {
      name: 'chrome',
      width: 1280,
      height: 800,
      fit: sharp.fit.contain, // Using sharp.fit enum instead of string
      background: { r: 255, g: 255, b: 255, alpha: 1 } // white background
    },
    // {
    //   name: 'firefox',
    //   width: 1280,
    //   height: 720,
    //   fit: sharp.fit.contain,
    //   background: { r: 255, g: 255, b: 255, alpha: 1 }
    // },
    // {
    //   name: 'edge',
    //   width: 1366,
    //   height: 768,
    //   fit: sharp.fit.contain,
    //   background: { r: 255, g: 255, b: 255, alpha: 1 }
    // }
  ],
  // Set to true to add a prefix to the filename (e.g., "chrome-filename.png")
  addPrefixToFilename: false,
  // Set to true to skip files that already exist in the destination
  skipExistingFiles: true
};

// Create destination directories if they don't exist
for (const dest of config.destinations) {
  const destDir = path.join(config.sourceDir, dest.name);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
    console.log(`Created directory: ${destDir}`);
  }
}

// Get all image files from the source directory
const imageFiles = fs.readdirSync(config.sourceDir)
  .filter(file => {
    // Only process PNG files and skip files in subdirectories
    const filePath = path.join(config.sourceDir, file);
    return fs.statSync(filePath).isFile() &&
           path.extname(file).toLowerCase() === '.png';
  });

// Process each image for each destination
async function processImages() {
  console.log(`Found ${imageFiles.length} screenshots to resize`);

  for (const file of imageFiles) {
    const sourcePath = path.join(config.sourceDir, file);

    for (const dest of config.destinations) {
      const destDir = path.join(config.sourceDir, dest.name);
      const destFilename = config.addPrefixToFilename
        ? `${dest.name}-${file}`
        : file;
      const destPath = path.join(destDir, destFilename);

      // Skip if file exists and skipExistingFiles is true
      if (config.skipExistingFiles && fs.existsSync(destPath)) {
        console.log(`Skipping existing file: ${destPath}`);
        continue;
      }

      try {
        // Resize image according to destination configuration
        await sharp(sourcePath)
          .resize({
            width: dest.width,
            height: dest.height,
            fit: dest.fit,
            background: dest.background
          })
          .toFile(destPath);

        console.log(`Resized for ${dest.name}: ${file} -> ${destPath}`);
      } catch (error) {
        console.error(`Error processing ${file} for ${dest.name}:`, error);
      }
    }
  }

  console.log('All screenshots have been resized');
}

processImages().catch(err => {
  console.error('An error occurred during processing:', err);
  process.exit(1);
});