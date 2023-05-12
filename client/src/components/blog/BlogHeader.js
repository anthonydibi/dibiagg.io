import {
  Avatar,
  Box,
  Stack,
  Heading,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import BlogTag from './BlogTag'
import DateFormatter from './DateFormatter'
import CoverImage from './CoverImage'
import PostTitle from './PostTitle'
import UnderlinedHeading from '../UnderlinedHeading'

const PostHeader = ({ title, coverImage, date, tags }) => {
  const BlogAvatar = () => {
    return (
      <Avatar
        size={'lg'}
        bg="accent"
        name="Anthony Di Biaggio"
        src="/me.png"
        border={useColorModeValue(
          '6px solid var(--light)',
          '6px solid var(--dark)',
        )}
        boxShadow={useColorModeValue(
          '10px 10px 15px #b6b6b6, -10px -10px 15px #ffffff',
          '11px 11px 22px #111111, -11px -11px 22px #2f2f2f',
        )}
      />
    )
  }

  return (
    <>
      <PostTitle>{title}</PostTitle>
      <Box display={{ base: 'block', md: 'none' }} mt={'6'}>
        <Stack direction={'row'} gap={'15px'} align={'center'}>
          <BlogAvatar />
          <UnderlinedHeading size={'md'}>Anthony Di Biaggio</UnderlinedHeading>
        </Stack>
      </Box>
      <CoverImage title={title} src={coverImage} />
      <Box maxW={'4xl'} mx={'auto'} mt={'6'}>
        <Box mb={'6'} display={{ base: 'none', md: 'block' }}>
          <Stack direction={'row'} gap={'15px'} align={'center'}>
            <BlogAvatar />
            <UnderlinedHeading size={'md'}>
              Anthony Di Biaggio
            </UnderlinedHeading>
          </Stack>
        </Box>
        <HStack mb={'5'} gap={'15px'}>
          {tags.map((tag) => (
            <BlogTag key={tag} label={tag} />
          ))}
        </HStack>
        <Box mb={'6'}>
          <DateFormatter dateString={date} />
        </Box>
      </Box>
    </>
  )
}

export default PostHeader
