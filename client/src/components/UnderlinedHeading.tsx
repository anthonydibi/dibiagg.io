import { Heading, Box, BoxProps } from '@chakra-ui/react'
import { FC, PropsWithChildren } from 'react'

interface UnderlinedHeadingProps extends PropsWithChildren {
  containerProps?: BoxProps
  size?: string
}

export const UnderlinedHeading: FC<UnderlinedHeadingProps> = ({ children, containerProps = {}, size = '2xl'}) => {
  return (
    <Box position={'relative'} width={'fit-content'} {...containerProps}>
      <Heading display={'inline-block'} size={size}>
        {children}
      </Heading>
      <Box
        position={'absolute'}
        bottom={'-10px'}
        left={'-3%'}
        zIndex={'-1'}
        width={'118%'}
        height={'20%'}
        backgroundColor={'accent'}
      ></Box>
    </Box>
  )
}
