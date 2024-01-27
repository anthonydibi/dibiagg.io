import { Container, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { UnderlinedHeading } from './UnderlinedHeading';
import DecoratedLink from './DecoratedLink';

interface ErrorPageProps {
  statusCode: number;
  flavorText: string;
}

const ErrorPage: FC<ErrorPageProps> = ({ statusCode, flavorText }) => {
  return (
    <Container
      display="flex"
      minH="80vh"
      justifyContent="center"
      alignItems="center"
    >
      <Flex direction="column" height="min-content" gap={['4', null, '6']}>
        <UnderlinedHeading>{statusCode}</UnderlinedHeading>
        <Text>
          {flavorText} Try going back{' '}
          <DecoratedLink href="/">home</DecoratedLink>!
        </Text>
      </Flex>
    </Container>
  );
};

export default ErrorPage;
