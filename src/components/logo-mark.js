import React from "react"

// Inline copy of the placeholder logo in src/images/icon.svg.
const LogoMark = ({ size = 64, className }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 512 512"
    aria-hidden="true"
    focusable="false"
  >
    <rect width="512" height="512" rx="112" fill="#be123c" />
    <path
      d="M136 268 L220 352 L384 176"
      fill="none"
      stroke="#ffffff"
      strokeWidth="56"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

export default LogoMark
