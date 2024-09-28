import {
  Avatar,
  Box,
  Stack,
  Heading,
  HStack,
  useColorModeValue,
  Text,
  Flex,
} from '@chakra-ui/react';
import BlogTag from './BlogTag/BlogTag';
import DateFormatter from './DateFormatter';
import CoverImage from './CoverImage';
import { TagKeys } from './BlogTag/types';

export interface PostHeaderProps {
  title: string;
  coverImage: string;
  date: string;
  tags: TagKeys[];
}

const PostHeader: React.FC<PostHeaderProps> = ({
  title,
  coverImage,
  date,
  tags,
}) => {
  const BlogAvatar = () => {
    return (
      <Avatar
        size="md"
        bg="accent"
        name="Anthony Di Biaggio"
        src="/me.png"
        border={useColorModeValue(
          '1px solid var(--light)',
          '1px solid var(--dark)',
        )}
        boxShadow={useColorModeValue(
          '5px 5px 10px #b6b6b6, -2px -2px 10px #ffffff',
          '5px 5px 10px #111111, -5px -5px 10px #2f2f2f',
        )}
      />
    );
  };

  return (
    <>
      <Flex direction="column" gap={4}>
        <CoverImage title={title} src={coverImage} />
        <Flex direction="column" gap={4} px={4}>
          <Stack direction={'row'} gap={2} align={'center'}>
          <BlogAvatar />
          <Flex direction="column" justifyContent="center">
            <Text size={'sm'}>Anthony Di Biaggio</Text>
            <Text size={'sm'}>
              <DateFormatter dateString={date} />
            </Text>
          </Flex>
        </Stack>
        <Heading size="lg">{title}</Heading>
        <HStack gap={'15px'} wrap={'wrap'}>
          {tags.map((tag) => (
            <BlogTag key={tag} tagConfigKey={tag} />
          ))}
        </HStack>
        </Flex>
      </Flex>
    </>
  );
};

export default PostHeader;
