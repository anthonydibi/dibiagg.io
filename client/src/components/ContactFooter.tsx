import ContactButtons from './ContactButtons';
import {
  Flex,
  Heading,
  Stack,
  Tooltip,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';

const ContactFooter = () => {
  return (
    <>
      <Stack
        borderTop="1px solid"
        px={8}
        direction="row"
        align="center"
        justify={'center'}
        h={'70px'}
      >
        <Heading size="md">
          <Tooltip
            label="Please don't actually call me, I'm Gen Z and hate talking on the phone. I love Zoom calls though"
            border="1px solid"
            px="2"
            borderRadius="0"
            bg={useColorModeValue('white', 'black')}
            textColor={useColorModeValue('black', 'white')}
            borderColor={useColorModeValue('black', 'white')}
            fontSize={{ base: 'md', md: 'lg' }}
          >
            <Text
              textDecorationColor={'accent'}
              decoration={'underline dotted'}
              textDecorationThickness={{ base: '2px', md: '4px' }}
              as="span"
            >
              CALL ME MAYBE?
            </Text>
          </Tooltip>
        </Heading>
        <Flex justify={'center'} gap={3}>
          <ContactButtons />
        </Flex>
      </Stack>
    </>
  );
};

export default ContactFooter;
