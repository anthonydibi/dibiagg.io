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
  Flex,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import DateFormatter from './DateFormatter';
import Image from 'next/image';
import BlogTag from './BlogTag/BlogTag';
import { Post } from '../../types/post';

export interface BlogEntryProps {
  post: Post;
  tags?: boolean;
}

const BlogEntry: React.FC<BlogEntryProps> = ({ post, tags = true }) => {
  return (
    <>
      <LinkBox
        as={'article'}
        flexDirection={'column'}
        w={'100%'}
        textAlign={'start'}
        position={'relative'}
        borderRadius={'16px'}
        background={useColorModeValue('#f0f0f0', 'dark')}
        boxShadow={useColorModeValue(
          '5px 5px 8px #cccccc, -5px -5px 8px #fafafa',
          '5px 5px 8px #1b1b1b, -5px -5px 8px #252525',
        )}
      >
        <Flex direction="column" gap={3.5}>
          <AspectRatio ratio={16 / 9}>
            <Image
              style={{ borderRadius: '16px 16px 0 0' }}
              src={post.coverImage}
              alt={`Cover Image for ${post.title}`}
              objectFit="cover"
              fill
            />
          </AspectRatio>
          <Flex direction="column" gap={3.5} p="0 16px 16px 16px">
          <LinkOverlay as={NextLink} href={`/blog/posts/${post.slug}`}>
            <Heading size="md" display={'block'}>
              {post.title}
            </Heading>
          </LinkOverlay>
          {tags && (
            <HStack wrap={'wrap'} gap={'8px'}>
              {post.tags &&
                post.tags.map((tag) => (
                  <BlogTag key={tag} tagConfigKey={tag} />
                ))}
            </HStack>
          )}
          <Text size={'sm'}>
            <DateFormatter dateString={post.date} />
          </Text>
          <Text fontSize={'md'} display={['none', null, 'inherit']}>
            {post.excerpt}
          </Text>
          </Flex>
        </Flex>
      </LinkBox>
    </>
  );
};

export default BlogEntry;
