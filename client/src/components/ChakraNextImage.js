import Image from 'next/image'
import { Box } from '@chakra-ui/react'

export const ChakraNextImage = (props) => {
  const { src, alt, ...rest } = props
  return (
    <Box position="relative" rounded="true" {...rest}>
      <Image
        width="70"
        height="70"
        src={src}
        alt={alt}
        style={{ borderRadius: '50%' }}
      />
    </Box>
  )
}
