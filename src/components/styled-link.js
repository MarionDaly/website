import styled from "styled-components"
import { Link } from "gatsby"

// The template's glass button, used for calls to action.
const StyledLink = styled(Link)`
  display: inline-block;
  padding: 0.5rem 1.5rem;
  color: inherit;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  border-radius: 4px;
  border: 1px solid var(--glass-border-strong);
  background-color: var(--glass-bg-strong);
  -webkit-backdrop-filter: var(--glass-blur);
  backdrop-filter: var(--glass-blur);
  transition: background-color 0.3s ease-out;

  &:hover {
    background-color: var(--glass-bg-hover);
  }

  :root:not(.dark-mode) &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
`

export default StyledLink
