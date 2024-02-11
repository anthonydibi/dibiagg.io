import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import BlogHeader from '../../components/blog/BlogHeader';
import PostBody from '../../components/blog/PostBody';
import { getPostBySlug, getAllPosts } from '../../services/BlogApi';
import PostTitle from '../../components/blog/PostTitle';
import markdownToHtml from '../../services/MarkdownToHtml';
import { Box, Heading, Container, Stack, SimpleGrid } from '@chakra-ui/react';
import SEO from '../../components/seo';
import { BlogEntry } from '../../components/blog/BlogEntry';
import Head from 'next/head';

export default function Post({ post }) {
  const router = useRouter();
  const title = `${post.title} | dibiagg.io`;
  if (!router.isFallback && post && !post.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      <SEO siteTitle="dibiagg.io" title={title} />
      <Head>
        <meta property="og:image" content={post.ogImage.url} />
      </Head>
      <Container maxW={'8xl'} py={'6'}>
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
                tags={post.tags}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
        <SimpleGrid justify={'center'} spacing={8} minChildWidth="550px">
          {post.olderPost && (
            <Box align={'start'}>
              <Heading size={'lg'} mb={'8'} pl="2">
                Older post
              </Heading>
              <BlogEntry post={post.olderPost} />
            </Box>
          )}
          {post.newerPost && (
            <Box align={'start'}>
              <Heading size={'lg'} mb={'8'} pl="2">
                Newer post
              </Heading>
              <BlogEntry post={post.newerPost} />
            </Box>
          )}
        </SimpleGrid>
      </Container>
    </>
  );
}

export async function getStaticProps({ params }) {
  const post = await getPostBySlug(
    params.slug,
    [
      'title',
      'date',
      'slug',
      'author',
      'content',
      'tags',
      'ogImage',
      'coverImage',
    ],
    true,
  );

  const content = post.content;

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = await getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
