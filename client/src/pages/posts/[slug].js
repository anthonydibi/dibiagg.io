import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import BlogHeader from '../../components/blog/BlogHeader';
import PostBody from '../../components/blog/PostBody';
import { getPostBySlug, getAllPosts } from '../../services/BlogApi';
import PostTitle from '../../components/blog/PostTitle';
import markdownToHtml from '../../services/MarkdownToHtml';
import { Box, Heading, Container, Stack } from '@chakra-ui/react';
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
      <Container maxW={'6xl'} py={'6'}>
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
        <Stack
          direction={{ base: 'column', md: 'row' }}
          justify={'center'}
          gap={'80px'}
        >
          {post.olderPost && (
            <Box
              align={'center'}
              minW={'50%'}
              maxW={{ base: '100%', md: '70%' }}
            >
              <Heading size={'lg'} mb={'10'} textDecoration={'underline'}>
                Older post
              </Heading>
              <BlogEntry post={post.olderPost} />
            </Box>
          )}
          {post.newerPost && (
            <Box
              align={'center'}
              minW={'50%'}
              maxW={{ base: '100%', md: '70%' }}
            >
              <Heading size={'lg'} mb={'10'} textDecoration={'underline'}>
                Newer post
              </Heading>
              <BlogEntry post={post.newerPost} />
            </Box>
          )}
        </Stack>
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
