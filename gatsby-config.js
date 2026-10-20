const siteUrl = `https://www.makenomistakesai.com`

module.exports = {
  siteMetadata: {
    title: `Make No Mistakes AI`,
    // Used for search results, link previews and the RSS feed.
    description: `Any AI, anywhere: build your own AI clusters and workflows on your own hardware. Open source, private and secure by design.`,
    siteUrl,
  },
  trailingSlash: `always`,
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/content/pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/blog`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 720,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          {
            resolve: `gatsby-remark-copy-linked-files`,
            options: {
              destinationDir: `static`,
            },
          },
          `gatsby-remark-smartypants`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              const base = site.siteMetadata.siteUrl
              // Images and files in posts use root-relative URLs ("/static/...");
              // feed readers need absolute ones.
              const absolutize = html =>
                html
                  .replace(/(src|href)="\//g, `$1="${base}/`)
                  .replace(
                    /srcset="([^"]*)"/g,
                    (match, set) =>
                      `srcset="${set.replace(/(^|,\s*)\//g, `$1${base}/`)}"`,
                  )

              return allMarkdownRemark.nodes.map(node => {
                const url = `${base}${node.fields.slug}`
                return {
                  title: node.frontmatter.title,
                  description: node.frontmatter.description || node.excerpt,
                  date: node.frontmatter.date,
                  url,
                  guid: url,
                  categories: node.frontmatter.tags || [],
                  custom_elements: [
                    { "content:encoded": absolutize(node.html) },
                  ],
                }
              })
            },
            query: `
              {
                allMarkdownRemark(
                  filter: { fields: { contentType: { eq: "posts" } } }
                  sort: { frontmatter: { date: DESC } }
                  limit: 50
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      description
                      date
                      tags
                    }
                  }
                }
              }
            `,
            output: `/rss.xml`,
            title: `Make No Mistakes AI — Research & Notes`,
            feed_url: `${siteUrl}/rss.xml`,
          },
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Make No Mistakes AI`,
        short_name: `MNM AI`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#ffe4e6`,
        display: `minimal-ui`,
        icon: `src/images/icon.svg`, // This path is relative to the root of the site.
      },
    },
  ],
}
