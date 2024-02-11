import {
  ChakraProvider,
  cookieStorageManagerSSR,
  localStorageManager,
  useConst,
} from '@chakra-ui/react';
import theme from '../styles/theme';

const Chakra = ({ cookies, children }) => {
  const colorModeManager = useConst(cookieStorageManagerSSR(cookies));

  return (
    <ChakraProvider colorModeManager={colorModeManager} theme={theme}>
      {children}
    </ChakraProvider>
  );
};

export default Chakra;

export const getServerSideProps = async ({ req }) => {
  debugger;
  return {
    props: {
      cookies: req.headers.cookie ?? '',
    },
  };
};
