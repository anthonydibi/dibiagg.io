import { FC } from 'react';
import ErrorPage from '../components/ErrorPage';

const Custom404Page: FC = () => {
  return (
    <ErrorPage
      statusCode={404}
      flavorText={"Sorry, couldn't find that page."}
    />
  );
};

export default Custom404Page;
