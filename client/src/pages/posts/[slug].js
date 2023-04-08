import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import BlogHeader from '../../components/blog/BlogHeader'
import PostBody from '../../components/blog/PostBody'
import { getPostBySlug, getAllPosts } from '../../services/BlogApi'
import PostTitle from '../../components/blog/PostTitle'
import markdownToHtml from '../../services/MarkdownToHtml'
import { Box, Button, Icon, Text } from '@chakra-ui/react'
import SEO from '../../components/seo'
import { Container } from '@chakra-ui/react'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'

export default function Post({ post, olderSlug, newerSlug }) {
  const router = useRouter()
  const title = `${post.title} | dibiagg.io`
  if (!router.isFallback && post && !post.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <>
        <SEO siteTitle="dibiagg.io" title={title}/>
        {olderSlug && <Button leftIcon={<AiFillCaretLeft />} rounded={"none"} display={{base: "none", md: "block"}} variant={"interact"} position={"fixed"} left={"2.25rem"} top={"50%"}>
            Older Post
        </Button>}
        {newerSlug && <Button rightIcon={<AiFillCaretRight />} rounded={"none"} display={{base: "none", md: "block"}} variant={"interact"} position={"fixed"} right={"2.25rem"} top={"50%"}>
            Newer Post
        </Button>}
        <Container size="lg" borderX="1px" maxW={"4xl"} py={"6"}>
            {router.isFallback ? (
                <PostTitle>Loading…</PostTitle>
            ) : (
                <>
                <article>
                    <BlogHeader
                    title={post.title}
                    coverImage={post.coverImage}
                    date={post.date}
                    author={post.author}
                    />
                    <PostBody content={post.content} />
                </article>
                </>
            )}
        </Container>
    </>
  )
}

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}