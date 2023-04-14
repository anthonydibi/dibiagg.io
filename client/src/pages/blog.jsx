import { Container } from '@chakra-ui/react'
import { getAllPosts } from '../services/BlogApi'
import SEO from '../components/seo'
import { BlogEntry } from '../components/blog/BlogEntry'

export default function Blog({ allPosts }) {
  return (
    <>
      <SEO
        title="Blog"
        siteTitle="dibiagg.io"
        description="Anthony Di Biaggio's blog posts"
      />
      <Container
        maxW={'2xl'}
        minH={'100vh'}
        align="center"
        borderX={'1px'}
        py={'4'}
      >
        {allPosts.map((post) => (
          <BlogEntry key={post.slug} post={post} />
        ))}
      </Container>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = await getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
