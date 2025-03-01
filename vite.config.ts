import react from "@vitejs/plugin-react"
import { fileURLToPath } from "url"
import { defineConfig } from "vite"
import webExtension from "vite-plugin-web-extension"

export default defineConfig(({ mode }) => {
  const browser = mode === "firefox" ? "firefox" : "chrome"
  const manifestPath =
    browser === "firefox"
      ? "./public/manifest.firefox.json"
      : "./public/manifest.json"

  return {
    plugins: [
      react(),
      webExtension({
        manifest: manifestPath,
        browser,
      }),
    ],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  }
})
