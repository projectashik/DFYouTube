# DF YouTube - Distraction Free YouTube

<p align="center">
  <img src="public/icons/icon128.png" alt="DF YouTube Logo" width="128" height="128">
</p>

<p align="center">
  <a href="https://chromewebstore.google.com/detail/df-youtube-distraction-fr/ikeajfeodalhkonnaiklhpakinnghgaa">
    <img src="https://img.shields.io/badge/Chrome-Add%20to%20Chrome-green?style=for-the-badge&logo=google-chrome" alt="Chrome Web Store">
  </a>
  <a href="https://addons.mozilla.org/en-US/firefox/addon/df-youtube-by-ashik/">
    <img src="https://img.shields.io/badge/Firefox-Add%20to%20Firefox-orange?style=for-the-badge&logo=firefox-browser" alt="Firefox Add-ons">
  </a>
  <a href="https://microsoftedge.microsoft.com/addons/detail/gmmnflbmpmdmbbgjdahhkalpiccfbpfj">
    <img src="https://img.shields.io/badge/Edge-Add%20to%20Edge-blue?style=for-the-badge&logo=microsoft-edge" alt="Microsoft Edge Add-ons">
  </a>
</p>

A browser extension that removes distracting elements from YouTube, allowing you to focus on the content you want to watch without being pulled into endless scrolling or recommendations.

## Features

- **Hide Home Feed**: Remove the YouTube home page feed to avoid getting sucked into the recommendation algorithm
- **Hide Comments**: Remove the comments section on videos
- **Hide Recommendations**: Remove the recommended videos sidebar
- **Hide Shorts**: Remove YouTube Shorts content
- **Hide Notifications**: Remove notification icons and counters

## Screenshots

<p align="center">
  <strong>Before: YouTube with distractions</strong><br>
  <img src="public/screenshots/before-shorts.png" alt="YouTube before DF YouTube" width="700">
</p>

<p align="center">
  <strong>After: Clean YouTube experience with DF YouTube</strong><br>
  <img src="public/screenshots/after.png" alt="YouTube after DF YouTube" width="700">
</p>

<p align="center">
  <strong>Before: Video page with distractions</strong><br>
  <img src="public/screenshots/video-page-before-dfyoutbe.png" alt="YouTube video page before DF YouTube" width="700">
</p>

<p align="center">
  <strong>After: Clean video page experience</strong><br>
  <img src="public/screenshots/video-page-after-dfyoutube.png" alt="YouTube video page after DF YouTube" width="700">
</p>

<p align="center">
  <strong>After: Shorts removed</strong><br>
  <img src="public/screenshots/after-shorts.png" alt="YouTube with Shorts removed" width="700">
</p>

<p align="center">
  <strong>After: All distractions removed</strong><br>
  <img src="public/screenshots/after-all-enabled.png" alt="YouTube with all distractions removed" width="700">
</p>

## Installation

### Browser Extension Stores

- **Chrome Web Store**: [DF YouTube - Distraction Free YouTube](https://chromewebstore.google.com/detail/df-youtube-distraction-fr/ikeajfeodalhkonnaiklhpakinnghgaa)
- **Firefox Add-ons**: [DF YouTube by Ashik](https://addons.mozilla.org/en-US/firefox/addon/df-youtube-by-ashik/)
- **Microsoft Edge Add-ons**: [DF YouTube](https://microsoftedge.microsoft.com/addons/detail/gmmnflbmpmdmbbgjdahhkalpiccfbpfj)

### Manual Installation

#### Chromium-based Browsers (Chrome, Brave, Arc, Chromium, etc.)

1. Download the latest release (`dfyoutube-chrome.zip`) from the [Releases](https://github.com/projectashik/dfyoutube/releases/latest) page
2. Unzip the file
3. Open your browser's extension page:
   - Chrome: `chrome://extensions/`
   - Brave: `brave://extensions/`
   - Arc: Click on the "..." menu → Extensions
   - Other Chromium browsers: Usually accessible via Settings → Extensions
4. Enable "Developer mode" (usually a toggle in the top-right corner)
5. Click "Load unpacked" and select the unzipped folder

#### Microsoft Edge

1. Download the latest release (`dfyoutube-edge.zip`) from the [Releases](https://github.com/projectashik/dfyoutube/releases/latest) page
2. Unzip the file
3. Open Edge's extension page: `edge://extensions/`
4. Enable "Developer mode" (toggle in the left sidebar)
5. Click "Load unpacked" and select the unzipped folder

#### Firefox (version 109+)

Firefox version 109 and above supports Manifest V3 extensions.

1. Download the latest release (`dfyoutube-firefox-mv3.zip`) from the [Releases](https://github.com/projectashik/dfyoutube/releases/latest) page
2. Unzip the file
3. Open Firefox and go to `about:debugging#/runtime/this-firefox`
4. Click "Load Temporary Add-on..." and select any file in the unzipped folder

#### Firefox (older versions)

Firefox versions below 109 only support Manifest V2 extensions.

1. Download the latest release (`dfyoutube-firefox-mv2.zip`) from the [Releases](https://github.com/projectashik/dfyoutube/releases/latest) page
2. Unzip the file
3. Open Firefox and go to `about:debugging#/runtime/this-firefox`
4. Click "Load Temporary Add-on..." and select any file in the unzipped folder

**Note**: For permanent installation in Firefox, the extension ID must be in the format 'name@example.com'. For Firefox Add-ons Store submission, it's recommended to use the Manifest V2 version for broader compatibility with older Firefox versions.

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository
   ```
   git clone https://github.com/projectashik/dfyoutube.git
   cd dfyoutube
   ```

2. Create the extension files
   ```
   sh ./build.sh
   ```


### Building

You can use the provided build script to build the extension for both Chrome and Firefox:

```
./build.sh
```

This will create three zip files:
- `dfyoutube-chrome.zip` - For Chromium-based browsers (Chrome, Brave, Arc, etc.)
- `dfyoutube-edge.zip` - For Microsoft Edge
- `dfyoutube-firefox-mv3.zip` - For Firefox version 109+ (Manifest V3)
- `dfyoutube-firefox-mv2.zip` - For older Firefox versions (Manifest V2)

Or build manually:

- For Chromium-based browsers:
  ```
  npm run build:chrome
  ```

- For Microsoft Edge:
  ```
  npm run build:edge
  ```

- For Firefox (Manifest V3):
  ```
  npm run build:firefox
  ```

- For Firefox (Manifest V2):
  ```
  npm run build:firefox:v2
  ```

The built extension will be in the `dist` directory.

### CI Environment and Crypto Polyfill

When building in CI environments (like GitHub Actions), you might encounter issues with `crypto.getRandomValues`. This project includes a polyfill for this functionality that is automatically used in the build process.

The polyfill is implemented in `crypto-polyfill.js` and is used by the Vite configuration to ensure builds work correctly in CI environments. The GitHub Actions workflow is configured to:

1. Create an environment variable with a deterministic seed for builds
2. Set up the crypto polyfill if it doesn't exist
3. Use Node.js experimental VM modules to ensure compatibility

If you're setting up your own CI environment, make sure to:
- Create a `.env` file with `VITE_RANDOM_SEED` set to a deterministic value
- Ensure the `crypto-polyfill.js` file is present
- Set `NODE_OPTIONS=--experimental-vm-modules` if needed

### Creating Releases

This project uses GitHub Actions to automatically build and publish releases when a new tag is pushed.

To create a new release:

1. Update the version number in `public/manifest.json`, `public/manifest.firefox.json`, and `public/manifest.firefox.v2.json`
2. Commit your changes
   ```
   git add .
   git commit -m "Bump version to x.y.z"
   ```
3. Create and push a new tag
   ```
   git tag vx.y.z
   git push origin vx.y.z
   ```

GitHub Actions will automatically build the extension packages and create a new release with the zip files attached.

### Icon Generation

The extension uses icons in multiple sizes (16px, 48px, and 128px). If you want to update the icon, replace the `public/icons/icon.png` file with your new icon and run:

```
npm install sharp
node resize-icons.js
```

This will automatically generate the required icon sizes.

### Screenshot Preparation

For store submissions, you may need screenshots in specific dimensions. The project includes scripts to resize screenshots:

```
# Install Sharp if not already installed
npm install sharp

# Resize all screenshots to 1280x800 for Chrome Web Store
npm run resize-screenshots

# Or use the advanced script with more options
npm run resize-screenshots:advanced
```

The advanced script (`resize-screenshots-advanced.js`) can be configured to generate screenshots for multiple stores with different dimensions. Edit the configuration section in the script to customize the output.

## How It Works

DF YouTube uses CSS to hide distracting elements on YouTube. When you toggle a setting in the popup, the extension applies or removes CSS classes to hide or show the corresponding elements.

The extension includes:

1. **Content Script**: Runs on YouTube pages and applies the CSS classes based on your settings
2. **Background Script**: Initializes default settings and handles communication
3. **Popup UI**: Allows you to toggle which elements to hide

## Troubleshooting

If the extension isn't working properly:

1. Make sure it's enabled in your browser's extension settings
2. Try refreshing the YouTube page
3. Check if there have been any updates to YouTube's layout that might affect the extension

If you encounter issues with Firefox MV3, try using the MV2 version instead, especially for older Firefox versions.

## Browser Compatibility

- **Chromium-based browsers** (Chrome, Brave, Arc, etc.): Fully compatible with the latest versions
- **Microsoft Edge**: Fully compatible with the latest versions
- **Firefox**:
  - Version 109+ supports Manifest V3
  - Older versions require Manifest V2

## Developer

- **Ashik Chapagain** (Fullstack web developer)
- GitHub: [github.com/projectashik](https://github.com/projectashik)

## License

MIT