import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import kebabCase from "lodash/kebabCase"

const Tags = ({ tags }) => {
  const links = (tags || []).filter(tag => kebabCase(tag))
  if (links.length === 0) return null

  return (
    <TagList>
      {links.map(tag => (
        <Tag key={tag}>
          <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
        </Tag>
      ))}
    </TagList>
  )
}

export default Tags

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
  list-style: none;
`

const Tag = styled.li`
  text-transform: uppercase;
  font-size: var(--size-300);

  & a {
    position: relative;
    z-index: 2;
    display: inline-block;
    padding: 0.2rem 0.6rem;
    border-radius: 4px;
    text-decoration: none;
    color: inherit;
    border: 1px solid var(--glass-border);
    background-color: var(--glass-bg-strong);
    -webkit-backdrop-filter: var(--glass-blur);
    backdrop-filter: var(--glass-blur);
    transition: background-color 0.3s ease-out;
  }

  & a:hover {
    background-color: var(--glass-bg-hover);
  }

  :root:not(.dark-mode) & a:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`
