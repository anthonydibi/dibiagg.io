import { Box, Container, Flex, SimpleGrid } from '@chakra-ui/react';
import { getAllPosts } from '../services/BlogApi';
import SEO from '../components/seo';
import BlogEntry from '../components/blog/BlogEntry';

export default function Blog({ allPosts }) {
  return (
    <>
      <SEO
        title="Blog"
        siteTitle="dibiagg.io"
        description="Anthony Di Biaggio's blog posts"
      />
      <Flex
        minH="90vh"
        justify="center"
        align="center"
        px={[4, undefined, 8]}
        my="2em"
      >
        <SimpleGrid minChildWidth={{ base: '90vw', lg: '600px' }} spacing={12}>
          {allPosts.map((post) => (
            <BlogEntry key={post.slug} post={post} />
          ))}
        </SimpleGrid>
      </Flex>
    </>
  );
}

export const getStaticProps = async () => {
  const allPosts = await getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'tags',
    'coverImage',
    'excerpt',
  ]);

  return {
    props: { allPosts },
  };
};
