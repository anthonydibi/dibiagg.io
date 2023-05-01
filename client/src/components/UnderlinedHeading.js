import { Heading, Box } from '@chakra-ui/react'

export default function UnderlinedHeading(props) {
  return (
    <Box position={'relative'} width={'fit-content'} {...props}>
      <Heading display={'inline-block'} size={props.size || '2xl'}>
        {props.children}
      </Heading>
      <Box
        position={'absolute'}
        bottom={'-10px'}
        left={'-3%'}
        zIndex={'-1'}
        width={'130%'}
        height={'20%'}
        backgroundColor={'accent'}
      ></Box>
    </Box>
  )
}
