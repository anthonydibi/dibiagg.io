import markdownStyles from '../../styles/markdown-styles.module.css';
import { MDXRemote } from 'next-mdx-remote';
import { Box, Button } from '@chakra-ui/react';
import Image from 'next/image';
import ReactThreeFiberExample from './ReactThreeFiberExample';
import FrequentlyUsedEmojiExample from './FrequentlyUsedEmojiExample';
import { CodeBlock } from './CodeBlock';

const NextImage = (props) => <Image alt={props.alt} fill={'true'} {...props} />;

const components = {
  img: (props) => (
    <NextImage width={1200} height={800} {...props} fill={false} />
  ),
  Button: Button,
  pre: ({ children, className }) => {
    return <pre>{children}</pre>;
  },
  code: ({ children, className }) => {
    return className ? (
      <CodeBlock className={className}>{children}</CodeBlock>
    ) : (
      <code className="language-text">{children}</code>
    );
  },
  FrequentlyUsedEmojiExample: FrequentlyUsedEmojiExample,
};

const PostBody = ({ content }) => {
  return (
    <Box mx={'auto'}>
      <Box className={markdownStyles['markdown']}>
        <MDXRemote {...content} components={components} />
      </Box>
    </Box>
  );
};

export default PostBody;
