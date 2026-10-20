import React from "react"
import styled from "styled-components"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Prose from "../components/prose"
import EmailLink from "../components/email-link"
import { glass } from "../components/glass"

// Contact page. The text comes from content/pages/contact.md; the email
// address lives in src/components/email-link.js (kept out of the HTML for spam).
const ContactTemplate = ({ data }) => {
  const { html } = data.markdownRemark

  return (
    <Layout>
      <ContactWrapper>
        <ContactCopy dangerouslySetInnerHTML={{ __html: html }} />

        <ContactCard>
          <CardTitle>Email us</CardTitle>
          <Email />
          <CardNote>We read every message.</CardNote>
        </ContactCard>
      </ContactWrapper>
    </Layout>
  )
}

export default ContactTemplate

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
  query ContactPage($id: String!) {
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

const ContactWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: var(--size-700);
  padding-top: var(--size-900);
  padding-bottom: var(--size-900);

  & > * {
    flex: 1;
  }

  @media screen and (max-width: 1000px) {
    & {
      flex-direction: column;
      align-items: stretch;
    }

    & > * {
      flex: 0;
      width: 100%;
    }
  }
`

const ContactCopy = styled(Prose)`
  max-width: 45ch;

  & a {
    color: var(--color-accent-text);
  }
`

const ContactCard = styled.div`
  ${glass}
  max-width: 45ch;
  padding: var(--size-600);
  border-radius: 8px;
  border-color: var(--glass-border-strong);
  background-color: var(--glass-bg-hover);
`

const CardTitle = styled.h2`
  font-size: var(--size-500);
  margin-bottom: var(--size-400);
`

const Email = styled(EmailLink)`
  display: inline-block;
  font-size: var(--size-500);
  font-weight: 700;
  color: var(--color-accent-text);
  overflow-wrap: anywhere;

  @media screen and (max-width: 500px) {
    & {
      font-size: var(--size-400);
    }
  }
`

const CardNote = styled.p`
  margin-top: var(--size-400);
  font-size: var(--size-300);
  color: var(--color-text-muted);
`
