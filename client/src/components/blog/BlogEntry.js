import { Heading, Text, Box, LinkOverlay, LinkBox } from '@chakra-ui/react'
import NextLink from 'next/link'
import DateFormatter from './DateFormatter'
import Image from 'next/image'

export const BlogEntry = (props) => {
  return (
    <>
      <LinkBox
        as={'article'}
        direction={'column'}
        w={'100%'}
        p={'8'}
        textAlign={'start'}
        mb={'8'}
        position={"relative"}
      >
        <LinkOverlay as={NextLink} href={`/posts/${props.post.slug}`}>
          <Heading display={'block'}>{props.post.title}</Heading>
        </LinkOverlay>
        <Box mt={'1'}>
          <DateFormatter dateString={props.post.date} />
        </Box>
        <Image
          style={{marginTop: 8}}
          src={props.post.coverImage}
          alt={`Cover Image for ${props.post.title}`}
          width={1300}
          height={630}
        />
        <Text mt={'6'} fontSize={"xl"}>{props.post.excerpt}</Text>
        <Box position={"absolute"} left={"0"} top={"0"} width={"10px"} height={"100%"} background={"accent"}/>
      </LinkBox>
    </>
  )
}
