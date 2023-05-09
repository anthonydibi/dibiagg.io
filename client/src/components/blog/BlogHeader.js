import { Avatar, Box, Stack, Heading, HStack } from '@chakra-ui/react'
import BlogTag from './BlogTag'
import DateFormatter from './DateFormatter'
import CoverImage from './CoverImage'
import PostTitle from './PostTitle'
import UnderlinedHeading from '../UnderlinedHeading'

const PostHeader = ({ title, coverImage, date, tags }) => {
  const authorName = 'Anthony Di Biaggio'
  const authorPicture = '../me.png'

  return (
    <>
      <PostTitle>{title}</PostTitle>
      <Box display={{ base: 'block', md: 'none' }} mt={'6'}>
        <Stack direction={'row'} gap={'15px'} align={'center'}>
          {/**TODO: bring the avatars out into their own component - couldn't get a component to work for some reason?? */}
          <Avatar
            size="lg"
            bg="accent"
            name="Anthony Di Biaggio"
            src="/me.png"
          />
          <Heading size={'lg'}>Anthony Di Biaggio</Heading>
        </Stack>
      </Box>
      <CoverImage title={title} src={coverImage} />
      <Box maxW={'4xl'} mx={'auto'} mt={'6'}>
        <Box mb={'6'} display={{ base: 'none', md: 'block' }}>
          <Stack direction={'row'} gap={'15px'} align={'center'}>
            <Avatar
              size={'lg'}
              bg="accent"
              name="Anthony Di Biaggio"
              src="/me.png"
            />
            <UnderlinedHeading size={'md'}>
              Anthony Di Biaggio
            </UnderlinedHeading>
          </Stack>
        </Box>
        <HStack mb={'5'} gap={'4px'}>
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
