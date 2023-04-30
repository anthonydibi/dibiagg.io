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
      bg={useColorModeValue(props.color, 'black')}
      border={'2px solid'}
      borderColor={useColorModeValue('black', 'white')}
      width={'100%'}
      maxW={'450px'}
      height={'100%'}
      p={{ base: '8', md: '10' }}
      flexDirection={'column'}
      justify={'start'}
      align={'start'}
      gap={'15px'}
    >
      <Icon as={props.icon} boxSize={'60px'} color={'accent'} />
      <Heading size={'md'} align="start">
        {props.heading}
      </Heading>
      <Text w="80%" fontSize={{ base: 'md', sm: 'lg', md: 'xl' }} align="start">
        {props.text}
      </Text>
      <Box
        zIndex={'-1'}
        bg={useColorModeValue(props.color, 'black')}
        position={'absolute'}
        left={'-11.5px'}
        top={'-11.5px'}
        width={'100%'}
        height={'100%'}
        border={'3px solid'}
        borderColor={'accent'}
        pointerEvents={'none'}
      />
      <Box
        zIndex={'-2'}
        position={'absolute'}
        left={'-20px'}
        top={'-20px'}
        width={'100%'}
        height={'100%'}
        border={'3px solid'}
        borderColor={'accent'}
        pointerEvents={'none'}
      />
    </Flex>
  )
}
