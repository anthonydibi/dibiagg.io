import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import BlogHeader from '../../../components/blog/BlogHeader';
import PostBody from '../../../components/blog/PostBody';
import { getPostBySlug, getAllPosts } from '../../../services/BlogApi';
import PostTitle from '../../../components/blog/PostTitle';
import markdownToHtml from '../../../services/MarkdownToHtml';
import { Box, Heading, Container, Stack, SimpleGrid } from '@chakra-ui/react';
import SEO from '../../../components/seo';
import BlogEntry from '../../../components/blog/BlogEntry';
import Head from 'next/head';
import { Post } from '../../../types/post';

export interface PostProps {
  post: Post;
}

const FullPost: React.FC<PostProps> = ({ post }) => {
  const router = useRouter();
  const title = `${post.title} | dibiagg.io`;
  if (!router.isFallback && post && !post.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <SEO siteTitle="dibiagg.io" title={title} description={post.excerpt} />
      <Head>
        <meta property="og:image" content={post.ogImage.url} />
      </Head>
      <Container maxW={'1200px'} m="auto" p="0 4px 16px 4px">
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <BlogHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                tags={post.tags}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
        <SimpleGrid templateColumns={['1fr', null, null, '1fr 1fr']} gap={4}>
          {post.olderPost && (
            <Box>
              <Heading size={'lg'} mb={'4'}>
                Older post
              </Heading>
              <BlogEntry post={post.olderPost} />
            </Box>
          )}
          {post.newerPost && (
            <Box>
              <Heading size={'lg'} mb={'4'}>
                Newer post
              </Heading>
              <BlogEntry post={post.newerPost} />
            </Box>
          )}
        </SimpleGrid>
      </Container>
    </>
  );
};

import { GetStaticPropsContext } from 'next';

export async function getStaticProps({ params }: GetStaticPropsContext) {
  const post = (await getPostBySlug(
    params?.slug,
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
  )) as Post;

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

export default FullPost;

export async function getStaticPaths() {
  const posts = (await getAllPosts(['slug'])) as Post[];

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
