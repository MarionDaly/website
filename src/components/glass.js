import { css } from "styled-components"

// The frosted-glass surface used by cards, buttons and pills.
// styled-components 6 no longer adds vendor prefixes, so Safari's
// -webkit-backdrop-filter is written out by hand.
export const glass = css`
  border: 1px solid var(--glass-border);
  background-color: var(--glass-bg);
  -webkit-backdrop-filter: var(--glass-blur);
  backdrop-filter: var(--glass-blur);
`
