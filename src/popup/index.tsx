import React, { useEffect, useState } from "react"
import { createRoot } from "react-dom/client"
import browser from "webextension-polyfill"

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

interface StatusMessage {
  text: string
  isError: boolean
}

const App: React.FC = () => {
  const [settings, setSettings] = useState<HideElements>(defaultSettings)
  const [status, setStatus] = useState<StatusMessage | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Load settings on component mount
  useEffect(() => {
    const loadSettings = async () => {
      try {
        setIsLoading(true)
        const result = await browser.storage.sync.get("hideElements")
        setSettings(result.hideElements || defaultSettings)
      } catch (error) {
        console.error("Error loading settings:", error)
        setStatus({
          text: "Error loading settings",
          isError: true,
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadSettings()
  }, [])

  // Handle toggle changes
  const handleToggle = async (key: keyof HideElements) => {
    const newSettings = {
      ...settings,
      [key]: !settings[key],
    }

    setSettings(newSettings)

    try {
      await browser.storage.sync.set({ hideElements: newSettings })
      setStatus({
        text: "Settings saved!",
        isError: false,
      })
      setTimeout(() => setStatus(null), 2500)
    } catch (error) {
      console.error("Error saving settings:", error)
      setStatus({
        text: "Error saving settings",
        isError: true,
      })
    }
  }

  if (isLoading) {
    return (
      <div className='container'>
        <p>Loading settings...</p>
      </div>
    )
  }

  return (
    <div className='container'>
      <h1>
        <svg viewBox='0 0 24 24' fill='currentColor'>
          <path d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-5-9h10v2H7z' />
        </svg>
        DF Tube Settings
      </h1>

      <div className='settings-list'>
        <div className='setting-item'>
          <div>
            <div className='setting-label'>Hide Home Feed</div>
            <div className='setting-description'>
              Remove the YouTube home page feed
            </div>
          </div>
          <label className='toggle'>
            <input
              type='checkbox'
              checked={settings.feed}
              onChange={() => handleToggle("feed")}
            />
            <span className='slider'></span>
          </label>
        </div>

        <div className='setting-item'>
          <div>
            <div className='setting-label'>Hide Comments</div>
            <div className='setting-description'>
              Remove comments section on videos
            </div>
          </div>
          <label className='toggle'>
            <input
              type='checkbox'
              checked={settings.comments}
              onChange={() => handleToggle("comments")}
            />
            <span className='slider'></span>
          </label>
        </div>

        <div className='setting-item'>
          <div>
            <div className='setting-label'>Hide Recommendations</div>
            <div className='setting-description'>
              Remove recommended videos sidebar
            </div>
          </div>
          <label className='toggle'>
            <input
              type='checkbox'
              checked={settings.recommendations}
              onChange={() => handleToggle("recommendations")}
            />
            <span className='slider'></span>
          </label>
        </div>

        <div className='setting-item'>
          <div>
            <div className='setting-label'>Hide Shorts</div>
            <div className='setting-description'>
              Remove YouTube Shorts content
            </div>
          </div>
          <label className='toggle'>
            <input
              type='checkbox'
              checked={settings.shorts}
              onChange={() => handleToggle("shorts")}
            />
            <span className='slider'></span>
          </label>
        </div>

        <div className='setting-item'>
          <div>
            <div className='setting-label'>Hide Notifications</div>
            <div className='setting-description'>
              Remove notification icons and counters
            </div>
          </div>
          <label className='toggle'>
            <input
              type='checkbox'
              checked={settings.notifications}
              onChange={() => handleToggle("notifications")}
            />
            <span className='slider'></span>
          </label>
        </div>
      </div>

      {status && (
        <div className={`status-message ${status.isError ? "error" : ""}`}>
          {status.text}
        </div>
      )}

      <div className='footer'>
        <p>DF Tube - Distraction Free YouTube</p>
        <div className='developer-info'>
          <p>Developed by: Ashik Chapagain (Fullstack web developer)</p>
          <p>
            <a
              href='https://github.com/projectashik'
              target='_blank'
              rel='noopener noreferrer'
            >
              github.com/projectashik
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

const container = document.getElementById("root")
if (container) {
  const root = createRoot(container)
  root.render(<App />)
}
