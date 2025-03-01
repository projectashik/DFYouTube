# DF Tube - Distraction Free YouTube

<p align="center">
  <img src="public/icons/icon128.png" alt="DF Tube Logo" width="128" height="128">
</p>

A browser extension that removes distracting elements from YouTube, allowing you to focus on the content you want to watch without being pulled into endless scrolling or recommendations.

## Features

- **Hide Home Feed**: Remove the YouTube home page feed to avoid getting sucked into the recommendation algorithm
- **Hide Comments**: Remove the comments section on videos
- **Hide Recommendations**: Remove the recommended videos sidebar
- **Hide Shorts**: Remove YouTube Shorts content
- **Hide Notifications**: Remove notification icons and counters

## Installation

### Chromium-based Browsers (Chrome, Edge, Brave, Arc, Chromium, etc.)

1. Download the latest release (`dftube-chrome.zip`) from the [Releases](https://github.com/projectashik/dftube/releases/latest) page
2. Unzip the file
3. Open your browser's extension page:
   - Chrome: `chrome://extensions/`
   - Edge: `edge://extensions/`
   - Brave: `brave://extensions/`
   - Arc: Click on the "..." menu → Extensions
   - Other Chromium browsers: Usually accessible via Settings → Extensions
4. Enable "Developer mode" (usually a toggle in the top-right corner)
5. Click "Load unpacked" and select the unzipped folder

### Firefox (version 109+)

Firefox version 109 and above supports Manifest V3 extensions.

1. Download the latest release (`dftube-firefox-mv3.zip`) from the [Releases](https://github.com/projectashik/dftube/releases/latest) page
2. Unzip the file
3. Open Firefox and go to `about:debugging#/runtime/this-firefox`
4. Click "Load Temporary Add-on..." and select any file in the unzipped folder

### Firefox (older versions)

Firefox versions below 109 only support Manifest V2 extensions.

1. Download the latest release (`dftube-firefox-mv2.zip`) from the [Releases](https://github.com/projectashik/dftube/releases/latest) page
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
   git clone https://github.com/projectashik/dftube.git
   cd dftube
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm run dev
   ```

### Building

You can use the provided build script to build the extension for both Chrome and Firefox:

```
./build.sh
```

This will create three zip files:
- `dftube-chrome.zip` - For Chromium-based browsers (Chrome, Edge, Brave, Arc, etc.)
- `dftube-firefox-mv3.zip` - For Firefox version 109+ (Manifest V3)
- `dftube-firefox-mv2.zip` - For older Firefox versions (Manifest V2)

Or build manually:

- For Chromium-based browsers:
  ```
  npm run build:chrome
  ```

- For Firefox (Manifest V3):
  ```
  npm run build:firefox
  ```

The built extension will be in the `dist` directory.

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

## How It Works

DF Tube uses CSS to hide distracting elements on YouTube. When you toggle a setting in the popup, the extension applies or removes CSS classes to hide or show the corresponding elements.

The extension includes:

1. **Content Script**: Runs on YouTube pages and applies the CSS classes based on your settings
2. **Background Script**: Initializes default settings and handles communication
3. **Popup UI**: Allows you to toggle which elements to hide

## Troubleshooting

If the extension isn't working properly:

1. Make sure it's enabled in your browser's extension settings
2. Try refreshing the YouTube page
3. Check if there have been any updates to YouTube's layout that might affect the extension

## Browser Compatibility

- **Chromium-based browsers** (Chrome, Edge, Brave, Arc, etc.): Fully compatible with the latest versions
- **Firefox**:
  - Version 109+ supports Manifest V3
  - Older versions require Manifest V2

## Developer

- **Ashik Chapagain** (Fullstack web developer)
- GitHub: [github.com/projectashik](https://github.com/projectashik)

## License

MIT