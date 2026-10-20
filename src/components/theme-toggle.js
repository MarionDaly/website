import React, { useEffect, useState } from "react"
import styled from "styled-components"

// The initial theme is set by the inline script in gatsby-ssr.js.
// Which icon shows is decided by CSS, so the server and browser render the
// same markup and there is no hydration mismatch.
const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(undefined)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains(`dark-mode`))
  }, [])

  const toggle = () => {
    const root = document.documentElement
    const next = root.classList.contains(`dark-mode`) ? `light` : `dark`
    root.classList.remove(`light-mode`, `dark-mode`)
    root.classList.add(`${next}-mode`)
    root.style.colorScheme = next
    try {
      localStorage.setItem(`theme`, next)
    } catch (e) {}
    setIsDark(next === `dark`)
  }

  return (
    <ToggleButton
      type="button"
      className="theme-toggle"
      aria-label="Dark mode"
      aria-pressed={isDark}
      title="Toggle dark mode"
      onClick={toggle}
    >
      <MoonIcon className="icon-moon" />
      <SunIcon className="icon-sun" />
    </ToggleButton>
  )
}

export default ThemeToggle

const MoonIcon = props => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
)

const SunIcon = props => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    <circle cx="12" cy="12" r="5" />
    <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
  </svg>
)

const ToggleButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: transparent;
  color: inherit;
  cursor: pointer;
  transition: background-color 0.3s ease-out;

  &:hover {
    background-color: var(--glass-bg-hover);
  }

  & .icon-sun {
    display: none;
  }

  :root.dark-mode & .icon-sun {
    display: block;
  }

  :root.dark-mode & .icon-moon {
    display: none;
  }

  /* No JavaScript: the button can't do anything, so hide it */
  :root:not(.dark-mode):not(.light-mode) & {
    visibility: hidden;
  }
`
