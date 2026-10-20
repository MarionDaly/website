/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-node/
 */

const fs = require(`fs`)
const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)
const kebabCase = require(`lodash/kebabCase`)

const TEMPLATES_DIR = path.resolve(`src/templates`)
const DEFAULT_PAGE_TEMPLATE = `page-template`

const FILE_NAME_ADVICE = `Check that the file is in the same folder and that its name matches exactly, including capital letters (the live server treats "Chart.png" and "chart.png" as different files). Use only lowercase letters, numbers and hyphens in file names, e.g. my-chart.png.`

const relativeToRoot = file => path.relative(__dirname, file)

// True if `dir` contains a file named exactly `name` (case-sensitive,
// even on a Mac, whose disk usually isn't).
const hasExactFile = (dir, name) =>
  fs.existsSync(dir) && fs.readdirSync(dir).includes(name)

// The Markdown plugins rewrite every image or file they find next to the
// Markdown file to a "/static/..." address. A relative address left in the
// finished HTML means the file wasn't found: a typo, capital letters, or a
// space or special character in the name.
const fileProblems = html => {
  const problems = []
  const withoutComments = html.replace(/<!--[\s\S]*?-->/g, ``)
  const tags = withoutComments.matchAll(
    /<(img|a|source|video|audio)\b[^>]*?\s(?:src|href)="([^"]*)"[^>]*>/gi,
  )

  for (const [element, tag, url] of tags) {
    const address = url.split(/[?#]/)[0]
    const isLocal =
      address &&
      !/^[a-z][a-z0-9+.-]*:/i.test(address) && // https:, mailto:, data:
      !address.startsWith(`/`) &&
      !address.startsWith(`#`)
    const hasExtension = /\.[a-z0-9]+$/i.test(address)
    const isImage = tag.toLowerCase() === `img`

    if (isLocal && (!isImage ? hasExtension : true)) {
      problems.push(`can't find "${url}". ${FILE_NAME_ADVICE}`)
    } else if (
      // A photo that skipped gatsby-remark-images (which adds this class) is
      // served full size. Usually the file has an uppercase extension (.JPG).
      isImage &&
      address.startsWith(`/static/`) &&
      /\.(jpe?g|png|webp|tiff?|avif)$/i.test(address) &&
      !element.includes(`gatsby-resp-image-image`)
    ) {
      problems.push(
        `the image "${path.basename(address)}" wasn't resized, so it will load slowly. This happens when the file name has an uppercase extension like .JPG or .PNG. Rename the file with a lowercase extension (e.g. photo.jpg) and update the Markdown.`,
      )
    }
  }
  return problems
}

const reportFileProblems = (node, reporter) => {
  const problems = fileProblems(node.html)
  problems.forEach(problem =>
    reporter.panicOnBuild(
      `${relativeToRoot(node.fileAbsolutePath)}: ${problem}`,
    ),
  )
  return problems.length > 0
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  if (node.internal.type !== `MarkdownRemark`) return

  const { createNodeField } = actions
  // "posts" for content/blog, "pages" for content/pages
  const contentType = getNode(node.parent).sourceInstanceName
  // content/blog/my-post/index.md -> "/my-post/", content/pages/about.md -> "/about/"
  const filePath = createFilePath({ node, getNode })

  createNodeField({ node, name: `contentType`, value: contentType })
  createNodeField({
    node,
    name: `slug`,
    value: contentType === `posts` ? `/blog${filePath}` : filePath,
  })
}

exports.createPages = async ({ graphql, actions, reporter, getNode }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      posts: allMarkdownRemark(
        filter: { fields: { contentType: { eq: "posts" } } }
        sort: { frontmatter: { date: DESC } }
      ) {
        nodes {
          id
          fileAbsolutePath
          html
          fields {
            slug
          }
          frontmatter {
            title
            date
            dateCheck: date(formatString: "YYYY-MM-DD")
            tags
          }
        }
      }
      pages: allMarkdownRemark(
        filter: { fields: { contentType: { eq: "pages" } } }
      ) {
        nodes {
          id
          fileAbsolutePath
          html
          fields {
            slug
          }
          frontmatter {
            template
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading the site's Markdown content`,
      result.errors,
    )
    return
  }

  const posts = result.data.posts.nodes
  const pages = result.data.pages.nodes

  // Blog posts, newest first. "newer"/"older" power the cards under each post.
  posts.forEach((post, index) => {
    const file = relativeToRoot(post.fileAbsolutePath)
    const { title, date, dateCheck } = post.frontmatter

    if (!title || !date) {
      reporter.panicOnBuild(
        `The blog post ${file} needs both a "title" and a "date" (YYYY-MM-DD) at the top of the file.`,
      )
      return
    }

    // YAML quietly turns impossible dates like 2026-02-30 into 2026-03-02,
    // so compare what was written with what Gatsby understood.
    const raw = fs
      .readFileSync(post.fileAbsolutePath, `utf8`)
      .match(/^date:\s*["']?(\d{4}-\d{2}-\d{2})/m)
    if (dateCheck === `Invalid date` || !raw || raw[1] !== dateCheck) {
      reporter.panicOnBuild(
        `The blog post ${file} has date "${date}", which isn't a real date in YYYY-MM-DD form. Write it like 2026-11-03.`,
      )
      return
    }

    if (reportFileProblems(post, reporter)) return

    createPage({
      path: post.fields.slug,
      component: path.resolve(TEMPLATES_DIR, `post-template.js`),
      context: {
        id: post.id,
        newerId: index > 0 ? posts[index - 1].id : null,
        olderId: index < posts.length - 1 ? posts[index + 1].id : null,
      },
    })
  })

  // Site pages (Home, About, Products, Contact, ...) from content/pages.
  pages.forEach(page => {
    const file = relativeToRoot(page.fileAbsolutePath)
    const template = page.frontmatter.template || DEFAULT_PAGE_TEMPLATE
    const component = path.resolve(TEMPLATES_DIR, `${template}.js`)

    if (!fs.existsSync(component)) {
      reporter.panicOnBuild(
        `${file} uses template "${template}", but src/templates/${template}.js does not exist.`,
      )
      return
    }

    // e.g. the About page photo: profile_image: ./photo.jpg
    const photo = getNode(page.id).frontmatter.profile_image
    if (photo) {
      const photoPath = path.resolve(path.dirname(page.fileAbsolutePath), photo)
      if (!hasExactFile(path.dirname(photoPath), path.basename(photoPath))) {
        reporter.panicOnBuild(
          `${file}: can't find the photo "${photo}". ${FILE_NAME_ADVICE}`,
        )
        return
      }
    }

    if (reportFileProblems(page, reporter)) return

    createPage({
      path: page.fields.slug,
      component,
      context: { id: page.id },
    })
  })

  // Tag pages. Tags that turn into the same URL ("LLMs" and "llms") share a page.
  const tagsBySlug = new Map()
  posts.forEach(post => {
    ;(post.frontmatter.tags || []).forEach(tag => {
      const slug = kebabCase(tag)
      if (!slug) return
      if (!tagsBySlug.has(slug)) tagsBySlug.set(slug, new Set())
      tagsBySlug.get(slug).add(tag)
    })
  })

  tagsBySlug.forEach((variants, slug) => {
    const tags = [...variants]
    createPage({
      path: `/tags/${slug}/`,
      component: path.resolve(TEMPLATES_DIR, `tags-template.js`),
      context: { tag: tags[0], tags },
    })
  })
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Declaring these up front keeps queries working even when no Markdown file
  // uses a field yet (for example, an About page without a photo).
  createTypes(`
    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
      fields: MarkdownRemarkFields
    }

    type MarkdownRemarkFields {
      slug: String
      contentType: String
    }

    type MarkdownRemarkFrontmatter {
      title: String
      description: String
      date: Date @dateformat
      template: String
      tags: [String]
      profile_image: File @fileByRelativePath
      profile_image_alt: String
      products: [MarkdownRemarkFrontmatterProducts]
    }

    type MarkdownRemarkFrontmatterProducts {
      name: String
      status: String
      summary: String
      features: [String]
    }
  `)
}
