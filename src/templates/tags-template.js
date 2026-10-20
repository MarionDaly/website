import React from "react"
import styled from "styled-components"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/post-list"

// All posts with one tag, at /tags/<tag>/.
const TagsTemplate = ({ pageContext, data }) => {
  const { tag } = pageContext
  const { totalCount, nodes } = data.allMarkdownRemark

  return (
    <Layout>
      <TagsWrapper>
        <Title>
          {totalCount} {totalCount === 1 ? `post` : `posts`} tagged “{tag}”
        </Title>
        <AllTagsLink to="/tags/">View all tags</AllTagsLink>
        <PostList posts={nodes} />
      </TagsWrapper>
    </Layout>
  )
}

export default TagsTemplate

export const Head = ({ pageContext, location }) => (
  <Seo
    title={`Posts tagged “${pageContext.tag}”`}
    pathname={location.pathname}
  />
)

export const pageQuery = graphql`
  query TagPage($tags: [String]) {
    allMarkdownRemark(
      filter: {
        fields: { contentType: { eq: "posts" } }
        frontmatter: { tags: { in: $tags } }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      totalCount
      nodes {
        ...PostListItem
      }
    }
  }
`

const TagsWrapper = styled.div`
  padding-top: var(--size-900);
  padding-bottom: var(--size-900);
`

const Title = styled.h1`
  font-size: var(--size-700);
`

const AllTagsLink = styled(Link)`
  display: inline-block;
  margin-top: var(--size-300);
  margin-bottom: var(--size-700);
  color: inherit;
`
