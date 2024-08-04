import React, { FC } from 'react';
import {
  Flex,
  useColorModeValue,
  Heading,
  Text,
  Icon,
  Box,
} from '@chakra-ui/react';

interface IconCardProps {
  icon: any;
  heading: string;
  text: string;
}

const IconCard: FC<IconCardProps> = ({ icon, heading, text }) => {
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
          as={icon}
          boxSize={'60px'}
          color={'accent2'}
        />
      </Box>
      <Heading size={'md'} mt={'2'} as="h3">
        {heading}
      </Heading>
      <Text w="80%" fontSize={{ base: 'md', sm: 'lg', md: 'xl' }} align="start">
        {text}
      </Text>
    </Flex>
  );
};

export default IconCard;
