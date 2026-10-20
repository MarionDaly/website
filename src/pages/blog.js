import React from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/post-list"

// The blog index at /blog/. Posts live in content/blog/<slug>/index.md.
const BlogPage = ({ data }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <HeaderWrapper>
        <h1>Blog</h1>
        <p>Research notes and thoughts from the Make No Mistakes AI team.</p>
        {posts.length > 0 && <Link to="/tags/">View all tags</Link>}
      </HeaderWrapper>

      {posts.length > 0 ? (
        <PostList posts={posts} />
      ) : (
        <p>No posts yet. Check back soon.</p>
      )}
    </Layout>
  )
}

export default BlogPage

export const Head = ({ location }) => (
  <Seo
    title="Blog"
    description="Research notes and thoughts from the Make No Mistakes AI team."
    pathname={location.pathname}
  />
)

export const pageQuery = graphql`
  query BlogPage {
    allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { frontmatter: { date: DESC } }
    ) {
      nodes {
        ...PostListItem
      }
    }
  }
`

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--size-300);
  margin-top: var(--size-900);
  margin-bottom: var(--size-700);

  & a {
    align-self: flex-start;
    color: inherit;
  }
`
