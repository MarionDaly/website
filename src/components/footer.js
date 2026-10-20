import React from "react"
import styled from "styled-components"
import { Link, useStaticQuery, graphql } from "gatsby"
import Container from "./container"

const Footer = () => {
  // The build year (not the visitor's clock) keeps server and browser output identical.
  const { site } = useStaticQuery(graphql`
    query FooterQuery {
      site {
        buildYear: buildTime(formatString: "YYYY")
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <StyledFooter>
      <FooterWrapper>
        <FooterText>
          © {site.buildYear} {site.siteMetadata.title}
        </FooterText>

        <FooterLinks>
          <li>
            <Link to="/contact/">Contact</Link>
          </li>
          <li>
            {/* A plain <a>: the feed is a file, not a Gatsby page */}
            <a href="/rss.xml">RSS</a>
          </li>
          <li>
            <Link to="/credits/">Credits</Link>
          </li>
        </FooterLinks>
      </FooterWrapper>
    </StyledFooter>
  )
}

export default Footer

const StyledFooter = styled.footer`
  padding-top: var(--size-300);
  padding-bottom: var(--size-300);
`

const FooterWrapper = styled(Container)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: var(--size-300);
`

const FooterText = styled.p`
  font-size: var(--size-300);
`

const FooterLinks = styled.ul`
  display: flex;
  gap: var(--size-400);
  margin: 0;
  padding: 0;
  list-style: none;

  & a {
    display: inline-block;
    padding: 0.4rem 0;
    color: inherit;
    font-size: var(--size-300);
    text-transform: uppercase;
    letter-spacing: 0.1rem;
  }
`
