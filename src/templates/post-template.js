import React from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Prose from "../components/prose"
import Tags from "../components/tags"
import { glass } from "../components/glass"

// A single blog post from content/blog/<slug>/index.md.
const PostTemplate = ({ data }) => {
  const { frontmatter, html, timeToRead } = data.markdownRemark
  const { newer, older } = data

  return (
    <Layout>
      <PostWrapper>
        <article>
          <header>
            <PostTitle>{frontmatter.title}</PostTitle>
            <PostMeta>
              <time dateTime={frontmatter.dateIso}>{frontmatter.date}</time>
              <span aria-hidden="true"> · </span>
              <span>{timeToRead} min read</span>
            </PostMeta>
          </header>

          <PostContent dangerouslySetInnerHTML={{ __html: html }} />
        </article>

        {(newer || older) && (
          <PostPagination aria-label="More posts">
            {newer && (
              <div>
                <span>Newer post</span>
                <Link to={newer.fields.slug}>{newer.frontmatter.title}</Link>
              </div>
            )}

            {older && (
              <div>
                <span>Older post</span>
                <Link to={older.fields.slug}>{older.frontmatter.title}</Link>
              </div>
            )}
          </PostPagination>
        )}

        <Tags tags={frontmatter.tags} />
      </PostWrapper>
    </Layout>
  )
}

export default PostTemplate

export const Head = ({ data, location }) => {
  const { frontmatter, excerpt } = data.markdownRemark
  return (
    <Seo
      title={frontmatter.title}
      description={frontmatter.description || excerpt}
      pathname={location.pathname}
      type="article"
    >
      <meta property="article:published_time" content={frontmatter.dateIso} />
    </Seo>
  )
}

export const pageQuery = graphql`
  query PostById($id: String!, $newerId: String, $olderId: String) {
    markdownRemark(id: { eq: $id }) {
      excerpt(pruneLength: 160)
      html
      timeToRead
      frontmatter {
        title
        description
        tags
        date(formatString: "MMMM D, YYYY")
        dateIso: date
      }
    }
    newer: markdownRemark(id: { eq: $newerId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    older: markdownRemark(id: { eq: $olderId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`

const PostWrapper = styled.div`
  padding-top: var(--size-900);
  padding-bottom: var(--size-900);
  margin-left: auto;
  margin-right: auto;
  max-width: 70ch;
`

const PostTitle = styled.h1`
  font-size: var(--size-700);
`

const PostMeta = styled.p`
  display: block;
  margin-top: 0.5rem;
  font-size: var(--size-400);
  text-transform: uppercase;
  color: var(--color-text-muted);
`

const PostContent = styled(Prose)`
  padding-top: var(--size-800);
`

const PostPagination = styled.nav`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: var(--size-900);
  margin-bottom: var(--size-700);

  & > * {
    ${glass}
    position: relative;
    flex: 1;
    min-width: min(100%, 25ch);
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    transition: background-color 0.3s ease-out;
  }

  & > *:hover {
    background-color: var(--glass-bg-hover);
  }

  & > *:focus-within {
    outline: 2px solid var(--focus-ring);
    outline-offset: 3px;
  }

  & span {
    text-transform: uppercase;
    opacity: 0.8;
    font-size: var(--size-300);
    padding-bottom: var(--size-300);
  }

  & a {
    color: inherit;
    text-decoration: none;
    font-size: var(--size-400);
  }

  & a:focus-visible {
    outline: none;
  }

  & a::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
`
