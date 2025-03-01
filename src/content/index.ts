import browser from "webextension-polyfill"

// Define the elements to hide based on user preferences
interface HideElements {
  feed: boolean
  comments: boolean
  recommendations: boolean
  shorts: boolean
  notifications: boolean
}

// Default settings
const defaultSettings: HideElements = {
  feed: true,
  comments: true,
  recommendations: true,
  shorts: true,
  notifications: true,
}

// Debounce function to limit how often a function can be called
function debounce(func: Function, wait: number): (...args: any[]) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null

  return function executedFunction(...args: any[]) {
    const later = () => {
      timeout = null
      func(...args)
    }

    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(later, wait)
  }
}

// Get user settings from storage
async function getUserSettings(): Promise<HideElements> {
  try {
    const result = await browser.storage.sync.get("hideElements")
    return result.hideElements || defaultSettings
  } catch (error) {
    console.error("Error getting settings:", error)
    return defaultSettings
  }
}

// Apply CSS classes based on settings
function applySettings(settings: HideElements): void {
  const html = document.documentElement

  // Apply or remove classes based on settings
  Object.entries(settings).forEach(([key, value]) => {
    if (value) {
      html.classList.add(`df-hide-${key}`)
    } else {
      html.classList.remove(`df-hide-${key}`)
    }
  })
}

// Initialize the content script
async function init(): Promise<void> {
  const settings = await getUserSettings()
  applySettings(settings)

  // Listen for settings changes
  browser.storage.onChanged.addListener((changes) => {
    if (changes.hideElements) {
      applySettings(changes.hideElements.newValue)
    }
  })
}

// Run the initialization as soon as possible
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init)
} else {
  init()
}

// Debounced function to apply settings
const debouncedApplySettings = debounce(async () => {
  const settings = await getUserSettings()
  applySettings(settings)
}, 250)

// Observe DOM changes to handle dynamically loaded content
const observer = new MutationObserver(debouncedApplySettings)

// Start observing once the DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false,
      characterData: false,
    })
  })
} else {
  observer.observe(document.body, {
    childList: true,
    subtree: true,
    attributes: false,
    characterData: false,
  })
}
