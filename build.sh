#!/bin/bash

# DF Tube Build Script

echo "Building DF Tube - Distraction Free YouTube Extension"
echo "===================================================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "Node.js is not installed. Please install Node.js before continuing."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "npm is not installed. Please install npm before continuing."
    exit 1
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Clean dist directory
echo "Cleaning dist directory..."
rm -rf dist dist-firefox-mv2 dist-firefox-mv3 dist-chrome

# Build for Chrome
echo "Building extension for Chrome..."
npm run build:chrome

# Create Chrome-specific dist directory
echo "Creating Chrome-specific dist directory..."
mkdir -p dist-chrome
cp -r dist/* dist-chrome/
# Remove Firefox manifest files from Chrome build
find dist-chrome -name "manifest.firefox*" -type f -delete

# Create Chrome zip file
echo "Creating Chrome zip file..."
cd dist-chrome
zip -r ../dftube-chrome.zip .
cd ..

# Build for Firefox (Manifest V3)
echo "Building extension for Firefox (Manifest V3)..."
npm run build:firefox

# Create Firefox MV3-specific dist directory
echo "Creating Firefox MV3-specific dist directory..."
mkdir -p dist-firefox-mv3
cp -r dist/* dist-firefox-mv3/
# Remove Firefox manifest files from MV3 build (we'll use the main manifest.json)
find dist-firefox-mv3 -name "manifest.firefox*" -type f -delete

# Create Firefox Manifest V3 zip file
echo "Creating Firefox Manifest V3 zip file..."
cd dist-firefox-mv3
zip -r ../dftube-firefox-mv3.zip .
cd ..

# Create Firefox Manifest V2 version
echo "Creating Firefox Manifest V2 version..."
mkdir -p dist-firefox-mv2
cp -r dist/* dist-firefox-mv2/
cp public/manifest.firefox.v2.json dist-firefox-mv2/manifest.json
# Remove Firefox manifest files from MV2 build
find dist-firefox-mv2 -name "manifest.firefox*" -type f -delete

# Create Firefox Manifest V2 zip file
echo "Creating Firefox Manifest V2 zip file..."
cd dist-firefox-mv2
zip -r ../dftube-firefox-mv2.zip .
cd ..

echo ""
echo "Build completed successfully!"
echo ""
echo "Chrome extension is available in: dftube-chrome.zip"
echo "Firefox Manifest V3 extension is available in: dftube-firefox-mv3.zip"
echo "Firefox Manifest V2 extension is available in: dftube-firefox-mv2.zip"
echo ""
echo "Installation instructions:"
echo ""
echo "For Chrome/Edge/Brave:"
echo "1. Open browser and go to chrome://extensions/"
echo "2. Enable 'Developer mode'"
echo "3. Click 'Load unpacked' and select the extracted dftube-chrome.zip folder"
echo ""
echo "For Firefox (version 109+):"
echo "1. Open Firefox and go to about:debugging#/runtime/this-firefox"
echo "2. Click 'Load Temporary Add-on...'"
echo "3. Select any file in the extracted dftube-firefox-mv3.zip folder"
echo ""
echo "For Firefox (older versions):"
echo "1. Open Firefox and go to about:debugging#/runtime/this-firefox"
echo "2. Click 'Load Temporary Add-on...'"
echo "3. Select any file in the extracted dftube-firefox-mv2.zip folder"
echo ""
echo "Note: For permanent installation in Firefox, the extension ID must be in the format 'name@example.com'."
echo "For Firefox Add-ons Store, it's recommended to use the Manifest V2 version for broader compatibility."
echo ""
echo "Thank you for using DF Tube!"