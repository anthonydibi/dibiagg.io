import ContactButtons from './ContactButtons';
import { Flex, Heading, Stack } from '@chakra-ui/react';

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
        <Heading
          mr={{ base: 5, md: 10 }}
          fontWeight="bold"
          size="md"
          whiteSpace="nowrap"
        >
          GET IN TOUCH
        </Heading>
        <Flex justify={'center'} gap={3}>
          <ContactButtons />
        </Flex>
      </Stack>
    </>
  );
};

export default ContactFooter;
