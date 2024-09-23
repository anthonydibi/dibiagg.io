import {
  Heading,
  Text,
  Box,
  LinkOverlay,
  LinkBox,
  HStack,
  Tag,
  TagLeftIcon,
  TagLabel,
  useColorModeValue,
  AspectRatio,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import DateFormatter from './DateFormatter';
import Image from 'next/image';
import BlogTag from './BlogTag/BlogTag';
import { Post } from '../../types/post';

export interface BlogEntryProps {
  post: Post;
}

const BlogEntry: React.FC<BlogEntryProps> = ({ post }) => {
  return (
    <>
      <LinkBox
        as={'article'}
        flexDirection={'column'}
        w={'100%'}
        p={'4'}
        textAlign={'start'}
        position={'relative'}
        borderRadius={'16px'}
        background={useColorModeValue('#f0f0f0', 'dark')}
        boxShadow={useColorModeValue(
          '10px 10px 15px #cccccc, -10px -10px 15px #ffffff',
          '10px 10px 20px #1b1b1b, -10px -10px 20px #252525',
        )}
      >
        <LinkOverlay as={NextLink} href={`/blog/posts/${post.slug}`}>
          <Heading size="md" display={'block'}>
            {post.title}
          </Heading>
        </LinkOverlay>
        {/* <HStack wrap={'wrap'} gap={'8px'} my={'8px'}>
          {post.tags &&
            post.tags.map((tag) => <BlogTag key={tag} tagConfigKey={tag} />)}
        </HStack> */}
        <Box mt={'1'}>
          <DateFormatter dateString={post.date} />
        </Box>
        <AspectRatio ratio={16 / 9}>
          <Image
            style={{ marginTop: 8, borderRadius: '10px' }}
            src={post.coverImage}
            alt={`Cover Image for ${post.title}`}
            objectFit="cover"
            fill
          />
        </AspectRatio>
        <Text mt={'6'} fontSize={'md'} display={['none', null, 'inherit']}>
          {post.excerpt}
        </Text>
      </LinkBox>
    </>
  );
};

export default BlogEntry;
