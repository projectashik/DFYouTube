import browser from "webextension-polyfill"

// Default settings
const defaultSettings = {
  feed: true,
  comments: true,
  recommendations: true,
  shorts: true,
  notifications: true,
}

// Initialize settings when extension is installed
browser.runtime.onInstalled.addListener(async (details) => {
  if (details.reason === "install") {
    try {
      // Set default settings
      await browser.storage.sync.set({ hideElements: defaultSettings })
      console.log("DF Tube: Default settings initialized")
    } catch (error) {
      console.error("DF Tube: Error initializing settings", error)
    }
  }
})

// Listen for messages from content script or popup
browser.runtime.onMessage.addListener(async (message) => {
  if (message.action === "getSettings") {
    try {
      const result = await browser.storage.sync.get("hideElements")
      return result.hideElements || defaultSettings
    } catch (error) {
      console.error("DF Tube: Error getting settings", error)
      return defaultSettings
    }
  }
})
