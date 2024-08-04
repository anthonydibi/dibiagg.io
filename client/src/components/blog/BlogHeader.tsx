import {
  Avatar,
  Box,
  Stack,
  Heading,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';
import BlogTag from './BlogTag/BlogTag';
import DateFormatter from './DateFormatter';
import CoverImage from './CoverImage';
import PostTitle from './PostTitle';
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
        size={'lg'}
        bg="accent2"
        name="Anthony Di Biaggio"
        src="/me.png"
        border={useColorModeValue(
          '3px solid var(--light)',
          '3px solid var(--dark)',
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
      <Box mx={'auto'} mt={'6'}>
        <PostTitle>{title}</PostTitle>
        <Box display={{ base: 'block', md: 'none' }} mt={'6'}>
          <Stack direction={'row'} gap={'15px'} align={'center'}>
            <BlogAvatar />
            <Heading size={'md'} ml={'0 !important'}>
              Anthony Di Biaggio
            </Heading>
          </Stack>
        </Box>
        <CoverImage title={title} src={coverImage} />
      </Box>
      <Box mx={'auto'} mt={'6'}>
        <Box mb={'6'} display={{ base: 'none', md: 'block' }}>
          <Stack direction={'row'} gap={'15px'} align={'center'}>
            <BlogAvatar />
            <Heading size={'md'} ml={'0 !important'}>
              Anthony Di Biaggio
            </Heading>
          </Stack>
        </Box>
        <HStack mb={'5'} gap={'15px'} wrap={'wrap'}>
          {tags.map((tag) => (
            <BlogTag key={tag} tagConfigKey={tag} />
          ))}
        </HStack>
        <Box mb={'6'}>
          <DateFormatter dateString={date} />
        </Box>
      </Box>
    </>
  );
};

export default PostHeader;
