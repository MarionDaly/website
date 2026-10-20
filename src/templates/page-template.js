import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Prose from "../components/prose"

// A plain text page. Any file in content/pages without a "template" uses this,
// e.g. content/pages/careers.md becomes /careers/.
const PageTemplate = ({ data }) => (
  <Layout>
    <PageWrapper>
      <Prose dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} />
    </PageWrapper>
  </Layout>
)

export default PageTemplate

export const Head = ({ data, location }) => (
  <Seo
    title={data.markdownRemark.frontmatter.title}
    description={
      data.markdownRemark.frontmatter.description || data.markdownRemark.excerpt
    }
    pathname={location.pathname}
  />
)

export const pageQuery = graphql`
  query SimplePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        title
        description
      }
    }
  }
`

const PageWrapper = styled.div`
  padding-top: var(--size-900);
  padding-bottom: var(--size-900);
  margin-left: auto;
  margin-right: auto;
  max-width: 70ch;
`
