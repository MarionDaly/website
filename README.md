# Make No Mistakes AI website

The source for [www.makenomistakesai.com](https://www.makenomistakesai.com): a [Gatsby](https://www.gatsbyjs.com/) static site with a frosted-glass design based on [Gatsby Starter Glass](https://github.com/yinkakun/gatsby-starter-glass), hosted on DigitalOcean App Platform.

**Contents**

1. [How the site works](#1-how-the-site-works)
2. [Add a blog post on the GitHub website (no tools needed)](#2-add-a-blog-post-on-the-github-website-no-tools-needed)
3. [Add a blog post on your computer (with preview)](#3-add-a-blog-post-on-your-computer-with-preview)
4. [Edit page content](#4-edit-page-content)
5. [Markdown cheat sheet](#5-markdown-cheat-sheet)
6. [Regenerate the static HTML yourself](#6-regenerate-the-static-html-yourself)
7. [Publish (deploy)](#7-publish-deploy)
8. [If a build fails](#8-if-a-build-fails)
9. [Unfinished posts (drafts)](#9-unfinished-posts-drafts)
10. [Developer notes](#10-developer-notes)

---

## 1. How the site works

You never edit HTML directly. The site is generated from two kinds of files:

| Folder     | What's in it                                                     | Who edits it |
| ---------- | ---------------------------------------------------------------- | ------------ |
| `content/` | The words: page text and blog posts, written in Markdown (`.md`) | Anyone       |
| `src/`     | The design and code: layout, colours, page templates             | Developers   |

The build step (`gatsby build`) combines the two and writes a complete static website (plain HTML, CSS and images) into the `public/` folder.

**You don't need to run the build yourself.** When a change is committed to the `main` branch on GitHub, DigitalOcean automatically:

1. downloads the latest code,
2. runs `npm ci` and `npm run build` (which produces `public/`), and
3. publishes `public/` to www.makenomistakesai.com.

This usually takes **2–5 minutes**. The `public/` folder is never committed to Git; it is always regenerated.

---

## 2. Add a blog post on the GitHub website (no tools needed)

Each post is a folder inside `content/blog/` containing an `index.md` file (plus any images for that post). The folder name becomes the web address.

1. On GitHub, open the repository and go to the **`content/blog`** folder.
2. Click **Add file → Create new file**.
3. In the file-name box, type the folder name, a slash, and `index.md`. For example: `why-ai-gets-dates-wrong/index.md`
   - Typing `/` turns the first part into a folder.
   - Use lowercase words separated by hyphens. No spaces.
4. Paste this template and fill it in (also in [`docs/blog-post-template.md`](docs/blog-post-template.md)):

   ```markdown
   ---
   title: "Why AI gets dates wrong"
   date: 2026-11-03
   description: "One sentence that sums up the post. Shown on the blog cards, in search results and in the RSS feed."
   tags:
     - research
     - ai-reliability
   ---

   Your introduction goes here.

   ## A section heading

   More text...
   ```

   - `title` and `date` are **required**. Always put the title in double quotes.
   - `date` must be `YYYY-MM-DD`. Posts are listed newest first by this date.
   - `description` is optional but recommended; without it, the first lines of the post are used.
   - `tags` are optional. Each tag gets its own page listing all posts with that tag.

5. Click **Commit changes…**, keep **Commit directly to the `main` branch**, and confirm.
6. **Images (optional):** once the post exists, open its folder on GitHub, click **Add file → Upload files**, upload the image(s) and commit. Then edit `index.md` and add a line where each image should appear:

   ```markdown
   ![A short description of the image](./my-chart.png)
   ```

   - **Rename image files before uploading** to lowercase letters, numbers and hyphens only, e.g. `eval-results.png`. Names with spaces or capitals (like `IMG_1234.JPG` or `Screenshot 2026-11-03 at 10.15.png`) won't work: the build stops with a "can't find" or "uppercase file extension" message.
   - `.jpg`, `.png` and `.webp` images are automatically resized and optimised. SVG diagrams work too. You can also link to a PDF in the same folder: `[Download the paper](./paper.pdf)`.
   - If you add the image line before uploading the image, that build stops with a "can't find" message and the site keeps its previous version. Uploading the image fixes it.

In a few minutes the post is live at `https://www.makenomistakesai.com/blog/why-ai-gets-dates-wrong/`, on the [Blog page](https://www.makenomistakesai.com/blog/), on the home page (latest 3 posts), and in the [RSS feed](https://www.makenomistakesai.com/rss.xml).

**To edit or delete a post later:** open its `index.md` on GitHub and use the pencil icon (edit) or the **…** menu → **Delete file**. To remove a post completely, delete every file in its folder.

---

## 3. Add a blog post on your computer (with preview)

This lets you see exactly how a post will look before anyone else does. First-time setup is in [section 6](#6-regenerate-the-static-html-yourself).

1. Create a folder in `content/blog/`, for example `content/blog/why-ai-gets-dates-wrong/`.
2. Inside it, create `index.md` using the template from step 4 above. Put any images in the same folder.
3. Start the preview server:

   ```bash
   npm run develop
   ```

4. Open http://localhost:8000. The page reloads automatically every time you save a file. Press `Ctrl+C` in the terminal to stop it.
5. When you're happy, commit the new folder and push it to `main` (for example with GitHub Desktop, or `git add`, `git commit` and `git push`).

---

## 4. Edit page content

Each page has its own Markdown file in `content/pages/`. Edit the text below the `---` block freely. In the block at the top (the "front matter"), you can change `title` and `description`, but **don't change the `template:` line**; it tells the site which layout to use.

| Page     | Web address  | File                        |
| -------- | ------------ | --------------------------- |
| Home     | `/`          | `content/pages/index.md`    |
| About    | `/about/`    | `content/pages/about.md`    |
| Products | `/products/` | `content/pages/products.md` |
| Contact  | `/contact/`  | `content/pages/contact.md`  |
| Credits  | `/credits/`  | `content/pages/credits.md`  |

On GitHub: open the file, click the **pencil icon**, edit, then **Commit changes…** to `main`.

### Home page

The big heading and the sentence under it come from `index.md`. The "Our products" and "Get in touch" buttons and the "Latest from the blog" cards are added automatically.

### About page: adding a photo

1. Open `content/pages` on GitHub, click **Add file → Upload files**, upload the photo (for example `photo.jpg`) and commit.
2. In `about.md`, delete the `#` at the start of these two lines in the front matter (so each line starts at the left edge, with no space) and adjust them:

   ```yaml
   profile_image: ./photo.jpg
   profile_image_alt: "Portrait of our founder"
   ```

The photo is shown as a circle next to the text. A square photo works best. Without a photo, the circle shows the logo. The file name rules for blog images apply here too (lowercase, no spaces), and the build stops with a "can't find the photo" message if the name in `about.md` doesn't match the uploaded file exactly.

### Products page: product cards

Each card on the Products page comes from the `products:` list at the top of `products.md`. To add a product, copy one block (from `- name:` to the end of its `features`) and paste it below the others, keeping exactly the same indentation (spaces, not tabs):

```yaml
products:
  - name: "Output Checker"
    status: "Available"
    summary: "One or two sentences about what it does."
    features:
      - "First feature"
      - "Second feature"
```

- `status` is optional and appears as a small badge (for example `"Available"`, `"Beta"`, `"Coming soon"`).
- Each card automatically gets an "Ask about …" link to the Contact page.
- To remove a product, delete its whole block. The order in the file is the order on the page.
- The text under the `---` block is the introduction shown above the cards.

### Contact page and the email address

The text comes from `contact.md`. **Don't type the email address into any Markdown file.** It is shown automatically by `src/components/email-link.js`, which hides it from spam robots: the page's HTML only contains "name [at] domain [dot] com", and the real clickable link is created in the visitor's browser.

To change the address, encode the new one and paste the result into `ENCODED_ADDRESS` in `src/components/email-link.js`:

```bash
node -e "console.log(Buffer.from('name@example.com').toString('base64'))"
```

### Adding a new page

Create a new file in `content/pages/`, for example `careers.md`, with a title at the top and no `template:` line:

```markdown
---
title: Careers
description: "Work with us."
---

# Careers

Your text here...
```

It becomes a simple text page at `/careers/` (like the Credits page). To add it to the menu at the top, a developer adds it to `HEADER_NAV_ITEMS` in `src/components/header.js`.

### Before publishing: replace the example content

Example text is marked so it can't be mistaken for real claims. To find every place that still has it:

```bash
grep -rn "EXAMPLE CONTENT" content gatsby-config.js
```

On GitHub, you can instead search the repository for `EXAMPLE CONTENT`. Also remove the visible "(Example)" labels as you go.

---

## 5. Markdown cheat sheet

| You write                                                | You get                                                                                  |
| -------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| `## Heading` / `### Smaller heading`                     | Section headings (don't use `#` inside posts; the title is already the main heading)     |
| `**bold**` and `_italic_`                                | **bold** and _italic_                                                                    |
| `[link text](https://example.com)`                       | A link                                                                                   |
| `[another page](/products/)`                             | A link to a page on this site                                                            |
| `- item` (one per line)                                  | A bullet list                                                                            |
| `1. item` (one per line)                                 | A numbered list                                                                          |
| `> quoted text`                                          | A highlighted quote                                                                      |
| `![description](./image.png)`                            | An image from the post's folder                                                          |
| A blank line between paragraphs                          | Separate paragraphs                                                                      |
| `` `code` ``                                             | Inline code                                                                              |
| `---` on its own line, with a blank line above and below | A horizontal divider (without the blank line above, the text above turns into a heading) |

**Code block with syntax highlighting.** Put three backticks and the language name on the line before the code, and three backticks on the line after:

````markdown
```python
print("hello")
```
````

**Embedded video** (YouTube, Vimeo, …). Paste the provider's embed code. Keep its `width` and `height`; they are used to scale the video to fit the page:

```html
<iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/VIDEO_ID"
  title="Video title"
  allowfullscreen
></iframe>
```

**Front-matter (the `---` block) gotchas:**

- Put titles and descriptions in double quotes, especially if they contain `:` or `#`. If the text itself contains a double quote, use curly quotes (“ ”) or single quotes around the whole value.
- Dates are `YYYY-MM-DD`, for example `2026-11-03`.
- Indent list items with two spaces, never tabs.

---

## 6. Regenerate the static HTML yourself

Only needed if you want to preview locally or check a build before pushing.

### One-time setup (Mac)

1. Install [Homebrew](https://brew.sh/) if you don't have it.
2. Install Node.js 22 (the version the site and DigitalOcean use) without replacing any other Node version:

   ```bash
   brew install node@22
   ```

3. Each time you open a new terminal for this project, put Node 22 first in your path:

   ```bash
   export PATH="$(brew --prefix node@22)/bin:$PATH"
   ```

   Check with `node -v`; it should print `v22.x.x`.

4. In the project folder, install the dependencies (needed once, and again whenever `package-lock.json` changes):

   ```bash
   npm ci
   ```

### Commands

| Command           | What it does                                                                    |
| ----------------- | ------------------------------------------------------------------------------- |
| `npm run develop` | Live preview at http://localhost:8000 that updates as you edit                  |
| `npm run build`   | Generates the real static site into `public/`, exactly as DigitalOcean does     |
| `npm run serve`   | Serves the `public/` folder at http://localhost:8080 (run `build` first)        |
| `npm run clean`   | Deletes Gatsby's cache and `public/`; run this if the preview looks out of date |
| `npm run format`  | Tidies the formatting of code and Markdown files                                |

---

## 7. Publish (deploy)

1. Commit your changes and push them to the `main` branch (or commit directly on the GitHub website).
2. In the [DigitalOcean control panel](https://cloud.digitalocean.com/apps), open the app and watch the **Activity** tab. A new deployment appears within a minute and turns **Live** when it's done.
3. Visit the site. If you don't see your change, do a hard refresh (**Cmd+Shift+R**); pages can be cached for a short time.

**Undo a bad deploy:** in DigitalOcean, open the app's **Activity** (or **Deployments**) tab, pick the last good deployment and choose **Rollback**. Then fix or revert the change in Git so the next push doesn't bring it back.

**Safer option for bigger changes:** push to a new branch and open a pull request. GitHub automatically builds the site to check it (see `.github/workflows/pr-build.yml`); merge the pull request into `main` when it passes.

---

## 8. If a build fails

If something is wrong with a file, the build stops and **the previous version of the site stays live**. Nothing breaks for visitors; your change just doesn't appear.

1. In DigitalOcean, open the app's **Activity** tab and click the failed deployment to see the **build logs**.
2. Look for the error near the end. Common causes:

| Error message says                                              | Fix                                                                                                                                               |
| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `needs both a "title" and a "date"`                             | Add the missing line to the top of that post                                                                                                      |
| `has date "…". Write dates as YYYY-MM-DD`                       | Change the date to the `2026-11-03` format                                                                                                        |
| `Error processing Markdown file …` followed by a line and a `^` | A problem in the `---` block at the line shown. Usually a title or description with a `:` that isn't in double quotes, or a missing closing quote |
| `links to ./…, but there is no file with exactly that name`     | An image or file name doesn't match. Check spelling **and capital letters** (`Chart.png` and `chart.png` are different on the live server)        |
| `uses template "…", but … does not exist`                       | Restore the original `template:` line in that page file                                                                                           |

The error always names the file to fix. You can see the same messages on your own computer by running `npm run build` (see [section 6](#6-regenerate-the-static-html-yourself)).

3. Fix the file, commit again, and a new build starts automatically.

---

## 9. Unfinished posts (drafts)

This repository is **public**, so anything committed can be read on GitHub even before it appears on the site. Keep drafts on your computer (or in a private document) until they're ready, or commit them to a separate branch and merge it into `main` when you want to publish.

---

## 10. Developer notes

### Project structure

```
content/
  blog/<slug>/index.md        Blog posts (+ images next to them)
  pages/*.md                  Page text; "template:" picks the layout
docs/blog-post-template.md    Copy-paste template for new posts
src/
  components/                 Layout, header, footer, cards, SEO, theme toggle, email link
    global-styles.js          Design tokens: colours, sizes, fonts (light and dark)
  pages/                      Code-only pages: /blog/, /tags/, 404
  templates/                  Layouts for Markdown pages and posts
  images/icon.svg             Site icon (placeholder; used for favicon and app icons)
  styles/                     Code-highlighting theme
static/                       Copied as-is to the site root (robots.txt)
gatsby-config.js              Site title, description, URL and plugins
gatsby-node.js                Creates pages from Markdown; tag pages
gatsby-ssr.js                 Sets the light/dark theme before the page paints
```

### Design

- Colours, the background gradient and the glass effect are CSS variables in `src/components/global-styles.js` (light values on `:root`, dark values on `:root.dark-mode`). Change them there to rebrand.
- Styling uses [styled-components](https://styled-components.com/) v6. It no longer adds browser prefixes, so write `-webkit-backdrop-filter` next to `backdrop-filter` (see `src/components/glass.js`).
- Replace `src/images/icon.svg` with the real logo: square, shapes only (no text), solid background.
- Menu links are in `HEADER_NAV_ITEMS` in `src/components/header.js`. Keep the trailing `/` on internal links.

### SEO and feeds

- Each page/template exports a `Head` that renders `src/components/seo.js` (title, description, canonical URL, Open Graph tags).
- `gatsby-plugin-sitemap` writes `/sitemap-index.xml`; `gatsby-plugin-feed` writes `/rss.xml` (blog posts only). Both are generated only by `npm run build`.

### Dependencies and Node

- Node 22 is pinned in `.nvmrc` and in `package.json` (`"engines": { "node": "22.x" }`), which DigitalOcean reads. Node 22 reaches end of life in **April 2027**: before then, move to Node 24 (update both places, run `npm install`, build and test).
- Use npm only. Don't add a `yarn.lock`: if both lockfiles exist, DigitalOcean uses yarn.
- After changing `package.json`, run `npm install` and commit the updated `package-lock.json`. DigitalOcean runs `npm ci`, which fails if the two don't match.
- `npm install` prints deprecation warnings and `npm audit` findings from Gatsby's own dependencies. These are expected. **Never run `npm audit fix --force`**: it installs breaking versions. Dependabot opens grouped update pull requests monthly.

### Deployment configuration

- The live DigitalOcean settings (domain, build settings) are managed in the DigitalOcean dashboard under **Settings → App Spec**. `.do/app.yaml` is only a reference copy for local tools and is not read on deploy.
- Expected DigitalOcean settings: build command empty or `npm run build`, output directory `public`, no `NODE_ENV` override. Gatsby's `404.html` is used automatically for missing pages.

### Licenses

Third-party code and font licenses are in [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) and on the site's Credits page.
