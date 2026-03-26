/* eslint-disable no-undef */
import fs from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");
const PUBLIC_DIR = path.join(process.cwd(), "public");
const SITE_URL = "https://googleclub.cu.edu"; // Replace with actual URL

function generateRss() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.log("No blog directory found, skipping RSS generation.");
    return;
  }

  const files = fs.readdirSync(BLOG_DIR).filter((file) => file.endsWith(".md"));

  const posts = files
    .map((file) => {
      const content = fs.readFileSync(path.join(BLOG_DIR, file), "utf-8");
      const { data } = matter(content);
      return {
        ...data,
        slug: file.replace(".md", ""),
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const items = posts
    .map(
      (post) => `
        <item>
            <title><![CDATA[${post.title}]]></title>
            <link>${SITE_URL}/blog/${post.slug}</link>
            <guid>${SITE_URL}/blog/${post.slug}</guid>
            <pubDate>${new Date(post.date).toUTCString()}</pubDate>
            <description><![CDATA[${post.description}]]></description>
            <author>${post.author}</author>
        </item>
    `,
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
    <channel>
        <title>Google Club CU Blog</title>
        <link>${SITE_URL}</link>
        <description>Updates, tutorials, and announcements from Google Club CU.</description>
        <language>en-us</language>
        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        ${items}
    </channel>
</rss>`;

  if (!fs.existsSync(PUBLIC_DIR)) {
    fs.mkdirSync(PUBLIC_DIR, { recursive: true });
  }

  fs.writeFileSync(path.join(PUBLIC_DIR, "feed.xml"), rss);
  console.log("RSS feed generated at public/feed.xml");
}

generateRss();
