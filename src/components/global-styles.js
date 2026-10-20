import { createGlobalStyle } from "styled-components"

/*
 * Design tokens and base styles, ported from gatsby-starter-glass
 * (https://github.com/yinkakun/gatsby-starter-glass, MIT).
 *
 * Light values live on :root, so the site is light when JavaScript is off.
 * gatsby-ssr.js adds "dark-mode" or "light-mode" to <html> before first paint.
 * Change the colours below to rebrand the whole site.
 */
const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  p,
  figure,
  blockquote,
  dl,
  dd {
    margin: 0;
  }

  ul[role="list"],
  ol[role="list"] {
    list-style: none;
  }

  html:focus-within {
    scroll-behavior: smooth;
  }

  html {
    height: -webkit-fill-available;
  }

  body {
    min-height: 100vh;
    min-height: -webkit-fill-available;
    text-rendering: optimizeSpeed;
    line-height: 1.5;
  }

  a:not([class]) {
    text-decoration-skip-ink: auto;
  }

  img,
  picture {
    max-width: 100%;
    display: block;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
  }

  @media (prefers-reduced-motion: reduce) {
    html:focus-within {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }

  :root {
    color-scheme: light;

    --size-200: 0.56rem;
    --size-300: 0.75rem;
    --size-400: 1rem;
    --size-500: 1.33rem;
    --size-600: 1.77rem;
    --size-700: 2.36rem;
    --size-800: 3.15rem;
    --size-900: 4.2rem;

    --font-body: "Poppins", -apple-system, BlinkMacSystemFont, avenir next,
      avenir, helvetica neue, helvetica, Ubuntu, roboto, noto, segoe ui, arial,
      sans-serif;
    --font-code: ui-monospace, SFMono-Regular, Menlo, Consolas,
      "Liberation Mono", monospace;

    --color-text: #37292c;
    --color-text-muted: rgba(55, 41, 44, 0.8);
    --color-bg: #ffffff;
    --bg-gradient: linear-gradient(315deg, #ccfbf1 0%, #ffe4e6 50%);
    --bg-gradient-opacity: 1;
    /* #f43f5e is for decoration only; it is too light for text on the pastels */
    --color-accent: #f43f5e;
    --color-accent-text: #be123c;
    --selection-bg: #37292c;
    --selection-text: #ffffff;
    --focus-ring: #be123c;
    --scrollbar-thumb: rgba(55, 41, 44, 0.4);

    --glass-bg: rgba(255, 255, 255, 0.3);
    --glass-bg-hover: rgba(255, 255, 255, 0.5);
    --glass-bg-strong: rgba(255, 255, 255, 0.7);
    --glass-border: rgba(255, 255, 255, 0.5);
    --glass-border-strong: rgba(255, 255, 255, 0.8);
    --glass-blur: blur(10px);
  }

  :root.dark-mode {
    color-scheme: dark;

    --color-text: #e9e9e9;
    --color-text-muted: rgba(233, 233, 233, 0.8);
    --color-bg: #252526;
    --bg-gradient-opacity: 0;
    --color-accent-text: #fda4af;
    --selection-bg: #e9e9e9;
    --selection-text: #252526;
    --focus-ring: #fda4af;
    --scrollbar-thumb: rgba(233, 233, 233, 0.3);

    --glass-bg: #3b3b3c;
    --glass-bg-hover: #454546;
    --glass-bg-strong: #2e2e2f;
    --glass-border: #515151;
    --glass-border-strong: #5f5f60;
    --glass-blur: none;
  }

  body {
    font-family: var(--font-body);
    color: var(--color-text);
    background-color: var(--color-bg);
    transition-property: background-color, color;
    transition-duration: 0.3s;
    transition-timing-function: ease-out;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Fixed pastel gradient behind everything (iOS ignores background-attachment: fixed) */
  body::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background-image: var(--bg-gradient);
    opacity: var(--bg-gradient-opacity);
    transition: opacity 0.3s ease-out;
  }

  ::selection {
    background: var(--selection-bg);
    color: var(--selection-text);
  }

  :focus-visible {
    outline: 2px solid var(--focus-ring);
    outline-offset: 3px;
    border-radius: 2px;
  }

  body::-webkit-scrollbar {
    width: 10px;
  }

  body::-webkit-scrollbar-thumb {
    background-color: var(--scrollbar-thumb);
  }

  body::-webkit-scrollbar-track {
    background: transparent;
  }

  h1,
  h2,
  h3,
  h4 {
    line-height: 1.125;
  }

  h1,
  h2,
  h3 {
    font-weight: 700;
  }

  h1 {
    font-size: var(--size-800);
  }

  h2 {
    font-size: var(--size-700);
  }

  h3 {
    font-size: var(--size-600);
  }

  p {
    font-size: var(--size-400);
  }

  p,
  li {
    max-width: none;
  }

  code,
  kbd,
  pre {
    font-family: var(--font-code);
  }

  .gatsby-resp-image-wrapper {
    margin-left: 0 !important;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
`

export default GlobalStyle
