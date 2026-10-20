import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Prose from "../components/prose"
import LogoMark from "../components/logo-mark"
import { glass } from "../components/glass"

// About page. Text and the optional photo come from content/pages/about.md.
const AboutTemplate = ({ data }) => {
  const { html, frontmatter } = data.markdownRemark
  const image = getImage(frontmatter.profile_image)

  return (
    <Layout>
      <AboutWrapper>
        {image ? (
          <AboutImage image={image} alt={frontmatter.profile_image_alt || ``} />
        ) : (
          // No photo set in about.md: show the logo in the circle instead
          <ImagePlaceholder>
            <LogoMark size={120} />
          </ImagePlaceholder>
        )}

        <AboutCopy dangerouslySetInnerHTML={{ __html: html }} />
      </AboutWrapper>
    </Layout>
  )
}

export default AboutTemplate

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
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      html
      excerpt(pruneLength: 160)
      frontmatter {
        title
        description
        profile_image_alt
        profile_image {
          childImageSharp {
            gatsbyImageData(
              width: 300
              aspectRatio: 1
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  }
`

const AboutWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: var(--size-700);
  padding-top: var(--size-900);
  padding-bottom: var(--size-900);

  @media screen and (max-width: 1000px) {
    & {
      flex-direction: column;
    }
  }
`

const AboutImage = styled(GatsbyImage)`
  flex-shrink: 0;
  border-radius: 50%;
  height: 300px;
  width: 300px;
`

const ImagePlaceholder = styled.div`
  ${glass}
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px;
  height: 300px;
  border-radius: 50%;
`

const AboutCopy = styled(Prose)`
  max-width: 60ch;
`
