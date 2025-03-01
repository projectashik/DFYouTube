# DF Tube - Distraction Free YouTube

A browser extension that removes distracting elements from YouTube, allowing you to focus on the content you want to watch without being pulled into endless scrolling or recommendations.

## Features

- **Hide Home Feed**: Remove the YouTube home page feed to avoid getting sucked into the recommendation algorithm
- **Hide Comments**: Remove the comments section on videos
- **Hide Recommendations**: Remove the recommended videos sidebar
- **Hide Shorts**: Remove YouTube Shorts content
- **Hide Notifications**: Remove notification icons and counters

## Installation

### Chrome / Edge / Brave

1. Download the latest release from the [Releases](https://github.com/yourusername/dftube/releases) page
2. Unzip the file
3. Open Chrome and go to `chrome://extensions/`
4. Enable "Developer mode" in the top right
5. Click "Load unpacked" and select the unzipped folder

### Firefox

1. Download the latest release from the [Releases](https://github.com/yourusername/dftube/releases) page
2. Open Firefox and go to `about:addons`
3. Click the gear icon and select "Install Add-on From File..."
4. Select the downloaded `.xpi` file

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. Clone the repository
   ```
   git clone https://github.com/yourusername/dftube.git
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

Or build manually:

- For Chrome/Edge/Brave:
  ```
  npm run build:chrome
  ```

- For Firefox:
  ```
  npm run build:firefox
  ```

The built extension will be in the `dist` directory.

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

## License

MIT