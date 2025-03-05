#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get the version from git tag
const getGitTag = () => {
  try {
    const tag = execSync('git describe --tags --abbrev=0').toString().trim();
    return tag.replace('v', ''); // Remove 'v' prefix if present
  } catch (error) {
    console.error('Error getting git tag:', error.message);
    process.exit(1);
  }
};

// Update version in a JSON file
const updateVersion = (filePath, newVersion) => {
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    const json = JSON.parse(content);
    json.version = newVersion;
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n');
    console.log(`Updated version to ${newVersion} in ${filePath}`);
  } catch (error) {
    console.error(`Error updating ${filePath}:`, error.message);
    process.exit(1);
  }
};

// Find all manifest files in the public directory
const findManifestFiles = (dir) => {
  const files = fs.readdirSync(dir);
  return files.filter(file => file.startsWith('manifest.') && file.endsWith('.json'));
};

// Main function
const main = () => {
  const newVersion = getGitTag();
  const rootDir = path.resolve(__dirname, '..');
  const publicDir = path.join(rootDir, 'public');

  // Update all manifest files
  const manifestFiles = findManifestFiles(publicDir);
  manifestFiles.forEach(file => {
    updateVersion(path.join(publicDir, file), newVersion);
  });

  // Update package.json
  updateVersion(path.join(rootDir, 'package.json'), newVersion);

  // Stage the changes
  try {
    const filesToStage = [
      ...manifestFiles.map(file => `public/${file}`),
      'package.json'
    ];
    execSync(`git add ${filesToStage.join(' ')}`);
    console.log('Staged version changes');
  } catch (error) {
    console.error('Error staging changes:', error.message);
    process.exit(1);
  }
};

main();