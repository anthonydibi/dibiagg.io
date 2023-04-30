import { Heading, Box } from '@chakra-ui/react'

export default function UnderlinedHeading(props) {
  return (
    <Box position={'relative'} width={'fit-content'} {...props}>
      <Heading display={'inline-block'} size={'2xl'}>
        {props.children}
      </Heading>
      <Box
        position={'absolute'}
        bottom={'0'}
        left={'-3%'}
        zIndex={'-1'}
        width={'130%'}
        height={'20%'}
        backgroundColor={'accent'}
      ></Box>
    </Box>
  )
}
