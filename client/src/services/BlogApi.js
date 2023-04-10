import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "_posts");

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory);
}

export function getPostBySlug(slug, fields = [], nav = false) {
  const realSlug = slug.replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (typeof data[field] !== "undefined") {
      items[field] = data[field];
    }
  });
  if (nav) {
    //if we care about navigating to older/newer posts
    const allPosts = getAllPosts(["slug", "title", "date", "excerpt"]);
    for (let i = 0; i < allPosts.length; i++) {
      let curPost = allPosts[i];
      if (curPost.slug == realSlug) {
        if (i < allPosts.length - 1) {
          let olderPost = allPosts.at(i + 1);
          items.olderPost = {
            slug: olderPost.slug,
            title: olderPost.title,
            date: olderPost.date,
            excerpt: olderPost.excerpt,
          };
        }
        if (i > 0) {
          let newerPost = allPosts.at(i - 1);
          items.newerPost = {
            slug: newerPost.slug,
            title: newerPost.title,
            date: newerPost.date,
            excerpt: newerPost.excerpt,
          };
        }
        break;
      }
    }
  }

  return items;
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}
