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
        p={'8'}
        textAlign={'start'}
        position={'relative'}
        borderRadius={'46px'}
        background={useColorModeValue('#f0f0f0', 'dark')}
        boxShadow={useColorModeValue(
          '20px 20px 30px #cccccc, -20px -20px 30px #ffffff',
          '20px 20px 40px #1b1b1b, -20px -20px 40px #252525',
        )}
      >
        <LinkOverlay as={NextLink} href={`/posts/${post.slug}`}>
          <Heading display={'block'}>{post.title}</Heading>
        </LinkOverlay>
        <HStack wrap={'wrap'} gap={'15px'} my={'15px'}>
          {post.tags &&
            post.tags.map((tag) => <BlogTag key={tag} tagConfigKey={tag} />)}
        </HStack>
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
        <Text mt={'6'} fontSize={'xl'} display={['none', null, 'inherit']}>
          {post.excerpt}
        </Text>
      </LinkBox>
    </>
  );
};

export default BlogEntry;
