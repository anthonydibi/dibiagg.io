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
} from '@chakra-ui/react'
import NextLink from 'next/link'
import DateFormatter from './DateFormatter'
import Image from 'next/image'
import BlogTag from './BlogTag'

export const BlogEntry = (props) => {
  return (
    <>
      <LinkBox
        my={'40px'}
        as={'article'}
        direction={'column'}
        w={'100%'}
        p={'8'}
        textAlign={'start'}
        mb={'8'}
        position={'relative'}
        borderRadius={'46px'}
        background={useColorModeValue('#f0f0f0', 'dark')}
        boxShadow={useColorModeValue(
          '20px 20px 30px #cccccc, -20px -20px 30px #ffffff',
          '20px 20px 30px #1b1b1b, -20px -20px 30px #252525',
        )}
      >
        <LinkOverlay as={NextLink} href={`/posts/${props.post.slug}`}>
          <Heading display={'block'}>{props.post.title}</Heading>
        </LinkOverlay>
        <HStack wrap={'wrap'} gap={'15px'} my={'15px'}>
          {props.post.tags &&
            props.post.tags.map((tag) => <BlogTag key={tag} label={tag} />)}
        </HStack>
        <Box mt={'1'}>
          <DateFormatter dateString={props.post.date} />
        </Box>
        <Image
          style={{ marginTop: 8 }}
          src={props.post.coverImage}
          alt={`Cover Image for ${props.post.title}`}
          width={1300}
          height={630}
        />
        <Text mt={'6'} fontSize={'xl'}>
          {props.post.excerpt}
        </Text>
      </LinkBox>
    </>
  )
}
