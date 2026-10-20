# Website content

Everything in this folder becomes a page on www.makenomistakesai.com. When you commit a change to the `main` branch, DigitalOcean rebuilds the site automatically and your change is live in a few minutes.

- **`blog/`**: one folder per blog post, each containing an `index.md` file plus any images for that post.
- **`pages/`**: the site's pages. `index.md` is the Home page; `about.md`, `products.md` and `contact.md` are the others.

## Add a blog post (from the GitHub website)

1. Open the `content/blog` folder on GitHub.
2. Click **Add file → Create new file**.
3. In the name box, type the post's web address followed by `/index.md`, for example `why-ai-gets-dates-wrong/index.md`. Typing `/` creates the folder. Use lowercase words separated by hyphens.
4. Paste this template and fill it in. The `title` and `date` lines are required; keep the `---` lines.

   ```markdown
   ---
   title: "Why AI gets dates wrong"
   date: 2026-11-03
   description: "One sentence that sums up the post."
   tags:
     - research
   ---

   Your introduction goes here.

   ## A section heading

   More text...
   ```

5. Click **Commit changes…** and commit to `main`.
6. Images (optional): open the new folder, click **Add file → Upload files**, and upload them. Use lowercase file names with no spaces, e.g. `eval-results.png`. Then edit `index.md` and add `![Description](./eval-results.png)` where the image should appear.

The post appears at `https://www.makenomistakesai.com/blog/why-ai-gets-dates-wrong/`.

## Edit a page

Open the page's file in `pages/`, click the pencil icon, edit the text, and commit. Leave the `template:` line at the top unchanged.

The main [README](../README.md) has the full guide: product cards, adding a photo, a Markdown cheat sheet, previewing locally, and what to do if a build fails.
