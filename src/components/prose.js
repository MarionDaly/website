import styled from "styled-components"

// Typography for Markdown content (blog posts and simple pages),
// ported from the template's post styles.
const Prose = styled.div`
  word-wrap: break-word;

  & > * + * {
    margin-top: var(--size-300);
  }

  & > p + p,
  & > * + pre,
  & > pre + *,
  & > * + .gatsby-highlight,
  & > .gatsby-highlight + * {
    margin-top: var(--size-500);
  }

  & * + h1,
  & * + h2,
  & * + h3 {
    margin-top: var(--size-800);
  }

  & h1 {
    font-size: var(--size-700);
  }

  & h2 {
    font-size: var(--size-600);
  }

  & h3 {
    font-size: var(--size-500);
  }

  & b,
  & strong {
    font-weight: 700;
  }

  & a {
    color: inherit;
    text-decoration: underline;
    text-decoration-thickness: 0.125rem;
    text-decoration-color: var(--color-accent);
  }

  & ul,
  & ol {
    padding-left: var(--size-500);
  }

  & li + li {
    margin-top: var(--size-200);
  }

  & blockquote {
    padding-left: var(--size-400);
    border-left: 5px solid var(--color-accent);
    font-style: italic;
  }

  & img {
    max-width: 100%;
    height: auto;
  }

  & figure figcaption,
  & img + em {
    display: block;
    margin-top: var(--size-200);
    font-size: var(--size-300);
    color: var(--color-text-muted);
  }

  & :not(pre) > code {
    padding: 0.1em 0.35em;
    border-radius: 4px;
    font-size: 0.9em;
    white-space: normal;
  }

  & pre {
    overflow-x: auto;
    max-width: 100%;
    border-radius: 8px;
  }

  & hr {
    border: none;
    border-top: 1px solid var(--glass-border-strong);
    margin: var(--size-700) 0;
  }

  & table {
    border-collapse: collapse;
    width: 100%;
  }

  & th,
  & td {
    padding: var(--size-200) var(--size-300);
    border-bottom: 1px solid var(--glass-border-strong);
    text-align: left;
  }
`

export default Prose
