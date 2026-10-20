/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr/
 */

import React from "react"

// Runs in <head> before the page paints, so a returning visitor who chose dark
// mode never sees a flash of the light theme. Without JavaScript the site stays
// light. Keep in sync with src/components/theme-toggle.js.
const themeInitScript = `(function () {
  try {
    var root = document.documentElement
    var theme = null
    try {
      theme = localStorage.getItem("theme")
    } catch (e) {}
    if (theme !== "dark" && theme !== "light") {
      theme =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
    }
    root.classList.remove("light-mode", "dark-mode")
    root.classList.add(theme + "-mode")
    root.style.colorScheme = theme
  } catch (e) {}
})()`

export const onRenderBody = ({ setHtmlAttributes, setHeadComponents }) => {
  setHtmlAttributes({ lang: `en` })
  setHeadComponents([
    <script
      key="theme-init"
      dangerouslySetInnerHTML={{ __html: themeInitScript }}
    />,
  ])
}
