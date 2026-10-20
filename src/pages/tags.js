import React from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import kebabCase from "lodash/kebabCase"
import Layout from "../components/layout"
import Seo from "../components/seo"

// Every blog tag with its post count, at /tags/.
const TagsPage = ({ data }) => {
  // Tags that share a URL ("LLMs" and "llms") are one tag; count each post once.
  const tags = new Map()
  data.allMarkdownRemark.nodes.forEach(post => {
    ;(post.frontmatter.tags || []).forEach(tag => {
      const slug = kebabCase(tag)
      if (!slug) return
      if (!tags.has(slug)) tags.set(slug, { name: tag, posts: new Set() })
      tags.get(slug).posts.add(post.id)
    })
  })
  const sorted = [...tags].sort(([a], [b]) => a.localeCompare(b))

  return (
    <Layout>
      <TagsWrapper>
        <h1>All tags</h1>
        <TagList>
          {sorted.map(([slug, { name, posts }]) => (
            <li key={slug}>
              <Link to={`/tags/${slug}/`}>
                {name} ({posts.size})
              </Link>
            </li>
          ))}
        </TagList>
      </TagsWrapper>
    </Layout>
  )
}

export default TagsPage

export const Head = ({ location }) => (
  <Seo title="All tags" pathname={location.pathname} />
)

export const pageQuery = graphql`
  query AllTags {
    allMarkdownRemark(filter: { fields: { contentType: { eq: "posts" } } }) {
      nodes {
        id
        frontmatter {
          tags
        }
      }
    }
  }
`

const TagsWrapper = styled.div`
  padding-top: var(--size-900);
  padding-bottom: var(--size-900);

  & h1 {
    font-size: var(--size-700);
  }
`

const TagList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: var(--size-400);
  margin-top: var(--size-700);
  padding: 0;
  list-style: none;

  & a {
    display: inline-block;
    padding: 0.4rem 0.8rem;
    border-radius: 4px;
    text-decoration: none;
    text-transform: uppercase;
    font-size: var(--size-300);
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
`
