import Link from 'next/link'
import Image from 'next/image'
import { Box } from '@chakra-ui/react'

const CoverImage = ({ title, src, slug }) => {
  const image = (
    <Image
      src={src}
      alt={`Cover Image for ${title}`}
      width={1300}
      height={630}
    />
  )
  return (
    <Box mt={'6'} align={'center'}>
      {slug ? (
        <Link as={`/posts/${slug}`} href="/posts/[slug]" aria-label={title}>
          {image}
        </Link>
      ) : (
        image
      )}
    </Box>
  )
}

export default CoverImage
