import fs from 'fs'
import { join } from 'path'
import { serialize } from 'next-mdx-remote/serialize'

const postsDirectory = join(process.cwd(), '_posts')

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export async function getPostBySlug(slug, fields = [], nav = false) {
  const realSlug = slug.replace(/\.mdx$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.mdx`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const content = await serialize(fileContents, { parseFrontmatter: true })
  const data = content.frontmatter

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    if (typeof data[field] !== 'undefined') {
      items[field] = data[field]
    }
  })
  if (nav) {
    //if we care about navigating to older/newer posts
    const allPosts = await getAllPosts([
      'slug',
      'title',
      'date',
      'excerpt',
      'tags',
      'coverImage',
    ])
    for (let i = 0; i < allPosts.length; i++) {
      let curPost = allPosts[i]
      if (curPost.slug == realSlug) {
        if (i < allPosts.length - 1) {
          let olderPost = allPosts.at(i + 1)
          items.olderPost = {
            slug: olderPost.slug,
            title: olderPost.title,
            date: olderPost.date,
            excerpt: olderPost.excerpt,
            tags: olderPost.tags,
            coverImage: olderPost.coverImage,
          }
        }
        if (i > 0) {
          let newerPost = allPosts.at(i - 1)
          items.newerPost = {
            slug: newerPost.slug,
            title: newerPost.title,
            date: newerPost.date,
            excerpt: newerPost.excerpt,
            tags: newerPost.tags,
            coverImage: newerPost.coverImage,
          }
        }
        break
      }
    }
  }

  return items
}

export async function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
  let posts = []
  for (let slug of slugs) {
    let post = await getPostBySlug(slug, fields)
    posts.push(post)
  }
  // sort posts by date in descending order
  posts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1))
  return posts
}
