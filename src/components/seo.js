/**
 * SEO component for Gatsby's Head API.
 * Every page and template exports `Head` and returns <Seo /> from it.
 *
 * See: https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-head/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Seo = ({
  title,
  description,
  pathname = `/`,
  type = `website`,
  noindex = false,
  children,
}) => {
  const { site } = useStaticQuery(graphql`
    query SeoQuery {
      site {
        siteMetadata {
          title
          description
          siteUrl
        }
      }
    }
  `)

  const {
    title: siteTitle,
    description: siteDescription,
    siteUrl,
  } = site.siteMetadata
  // <title> must be a single string
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle
  const metaDescription = description || siteDescription
  const path = pathname.endsWith(`/`) ? pathname : `${pathname}/`
  const url = `${siteUrl}${path}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      {noindex ? (
        <meta name="robots" content="noindex" />
      ) : (
        <link rel="canonical" href={url} />
      )}
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:type" content={type} />
      {!noindex && <meta property="og:url" content={url} />}
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      {children}
    </>
  )
}

export default Seo
