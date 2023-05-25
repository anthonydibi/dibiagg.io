import React from 'react'
import {
  Flex,
  useColorModeValue,
  Heading,
  Text,
  Icon,
  Box,
} from '@chakra-ui/react'
//
export default function IconCard(props) {
  return (
    <Flex
      position={'relative'}
      borderRadius={'46px'}
      background={useColorModeValue('light', 'dark')}
      boxShadow={useColorModeValue(
        '20px 20px 30px #cccccc, -20px -20px 30px #ffffff',
        '20px 20px 30px #1b1b1b, -20px -20px 30px #252525',
      )}
      width={'100%'}
      maxW={'450px'}
      height={'100%'}
      p={{ base: '8', md: '10' }}
      flexDirection={'column'}
      justify={'start'}
      align={'start'}
      gap={'15px'}
    >
      <Box
        p={'5'}
        borderRadius={'50%'}
        boxShadow={useColorModeValue(
          'inset 20px 20px 30px #cccccc, inset -20px -20px 30px #ffffff',
          'inset 20px 20px 30px #1b1b1b, inset -20px -20px 30px #252525',
        )}
      >
        <Icon
          verticalAlign={'middle'}
          as={props.icon}
          boxSize={'60px'}
          color={'accent2'}
        />
      </Box>
      <Heading size={'md'} align="start" mt={'2'}>
        {props.heading}
      </Heading>
      <Text w="80%" fontSize={{ base: 'md', sm: 'lg', md: 'xl' }} align="start">
        {props.text}
      </Text>
    </Flex>
  )
}
