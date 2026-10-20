import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostList from "../components/post-list"
import StyledLink from "../components/styled-link"

// Home page. Text comes from content/pages/index.md.
const IndexTemplate = ({ data }) => {
  const intro = data.markdownRemark
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout>
      <Hero>
        <Intro dangerouslySetInnerHTML={{ __html: intro.html }} />
        <Actions>
          <StyledLink to="/products/">Our products</StyledLink>
          <StyledLink to="/contact/">Get in touch</StyledLink>
        </Actions>
      </Hero>

      {posts.length > 0 && (
        <section aria-labelledby="latest-posts">
          <SectionTitle id="latest-posts">Latest from the blog</SectionTitle>
          <PostList posts={posts} />
          <ViewAll>
            <StyledLink to="/blog/">View all posts</StyledLink>
          </ViewAll>
        </section>
      )}
    </Layout>
  )
}

export default IndexTemplate

export const Head = ({ data, location }) => (
  <Seo
    description={data.markdownRemark.frontmatter.description}
    pathname={location.pathname}
  />
)

export const pageQuery = graphql`
  query IndexPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      frontmatter {
        description
      }
    }
    allMarkdownRemark(
      filter: { fields: { contentType: { eq: "posts" } } }
      sort: { frontmatter: { date: DESC } }
      limit: 3
    ) {
      nodes {
        ...PostListItem
      }
    }
  }
`

const Hero = styled.div`
  padding-top: var(--size-900);
  padding-bottom: var(--size-900);
`

const Intro = styled.div`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  max-width: 60ch;
  text-align: center;

  & p {
    margin-top: var(--size-400);
    font-size: var(--size-500);
  }

  @media screen and (max-width: 700px) {
    & h1 {
      font-size: var(--size-700);
    }

    & p {
      font-size: var(--size-400);
    }
  }
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--size-400);
  margin-top: var(--size-700);
`

const SectionTitle = styled.h2`
  margin-bottom: var(--size-600);
  font-size: var(--size-600);
  text-align: center;
`

const ViewAll = styled.div`
  display: flex;
  justify-content: center;
  margin: var(--size-800) auto;
`
