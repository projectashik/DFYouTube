#!/bin/bash

# DF YouTube Extension Build Script
# This script builds the extension for Chrome and Firefox (both MV2 and MV3)

# Exit on error
set -e

echo "Building DF YouTube - Distraction Free YouTube Extension"
echo "===================================================="

# Check if Node.js and npm are installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js and try again."
    exit 1
fi

if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm and try again."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Clean dist directory
echo "Cleaning dist directory..."
rm -rf dist dist-chrome dist-firefox-mv3 dist-firefox-mv2
mkdir -p dist dist-chrome dist-firefox-mv3 dist-firefox-mv2

# Build for Chrome
echo "Building for Chrome..."
NODE_ENV=production npm run build:chrome || { echo "Chrome build failed"; exit 1; }

# Check if dist directory exists and has content
if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
    echo "Warning: dist directory is empty or does not exist after Chrome build"
    # Create dist directory if it doesn't exist
    mkdir -p dist
else
    # Copy files to Chrome build directory
    echo "Copying files to Chrome build directory..."
    cp -r dist/* dist-chrome/ || { echo "Failed to copy files to Chrome build directory"; exit 1; }
fi

# Build for Firefox MV3
echo "Building for Firefox MV3..."
NODE_ENV=production npm run build:firefox || { echo "Firefox MV3 build failed"; exit 1; }

# Check if dist directory exists and has content
if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
    echo "Warning: dist directory is empty or does not exist after Firefox MV3 build"
    # Create dist directory if it doesn't exist
    mkdir -p dist
else
    # Copy files to Firefox MV3 build directory
    echo "Copying files to Firefox MV3 build directory..."
    cp -r dist/* dist-firefox-mv3/ || { echo "Failed to copy files to Firefox MV3 build directory"; exit 1; }
fi

# Build for Firefox MV2
echo "Building for Firefox MV2..."
NODE_ENV=production npm run build:firefox:v2 || { echo "Firefox MV2 build failed"; exit 1; }

# Check if dist directory exists and has content
if [ ! -d "dist" ] || [ -z "$(ls -A dist)" ]; then
    echo "Warning: dist directory is empty or does not exist after Firefox MV2 build"
    # Create dist directory if it doesn't exist
    mkdir -p dist
else
    # Copy files to Firefox MV2 build directory
    echo "Copying files to Firefox MV2 build directory..."
    cp -r dist/* dist-firefox-mv2/ || { echo "Failed to copy files to Firefox MV2 build directory"; exit 1; }
fi

# Lint Firefox extensions with web-ext
echo "Linting Firefox MV3 extension..."
npm run lint:firefox || { echo "Warning: Firefox MV3 linting found issues"; }

echo "Linting Firefox MV2 extension..."
npm run lint:firefox:v2 || { echo "Warning: Firefox MV2 linting found issues"; }

# Create zip files
echo "Creating zip files..."

# Create Chrome zip
echo "Creating Chrome zip..."
cd dist-chrome || { echo "Failed to change directory to dist-chrome"; exit 1; }
zip -r ../dfyoutube-chrome.zip . || { echo "Failed to create Chrome zip"; exit 1; }
cd .. || { echo "Failed to return to root directory"; exit 1; }

# Create Firefox MV3 zip
echo "Creating Firefox MV3 zip..."
cd dist-firefox-mv3 || { echo "Failed to change directory to dist-firefox-mv3"; exit 1; }
zip -r ../dfyoutube-firefox-mv3.zip . || { echo "Failed to create Firefox MV3 zip"; exit 1; }
cd .. || { echo "Failed to return to root directory"; exit 1; }

# Create Firefox MV2 zip
echo "Creating Firefox MV2 zip..."
cd dist-firefox-mv2 || { echo "Failed to change directory to dist-firefox-mv2"; exit 1; }
zip -r ../dfyoutube-firefox-mv2.zip . || { echo "Failed to create Firefox MV2 zip"; exit 1; }
cd .. || { echo "Failed to return to root directory"; exit 1; }

echo "Build complete!"
echo "Chrome extension: dfyoutube-chrome.zip"
echo "Firefox MV3 extension: dfyoutube-firefox-mv3.zip"
echo "Firefox MV2 extension: dfyoutube-firefox-mv2.zip"

echo ""
echo "Note: For permanent installation in Firefox, the extension ID in public/manifest.firefox.json"
echo "and public/manifest.firefox.v2.json must be in the format 'name@example.com' (without curly braces)"
echo "or a UUID format like '{12345678-1234-1234-1234-123456789012}'."

echo ""
echo "Installation instructions:"
echo "- Chrome/Edge/Brave: Go to chrome://extensions, enable Developer mode, and drag dfyoutube-chrome.zip onto the page."
echo "- Firefox: Go to about:debugging#/runtime/this-firefox, click 'Load Temporary Add-on', and select dfyoutube-firefox-mv3.zip or dfyoutube-firefox-mv2.zip."
echo ""
echo "Troubleshooting:"
echo "- If you encounter issues with Firefox MV3, try using the MV2 version instead."
echo "- For permanent installation in Firefox, you need to sign the extension through the Firefox Add-ons site."
echo ""