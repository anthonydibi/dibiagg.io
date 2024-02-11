import React from 'react';
import Highlight, { defaultProps } from 'prism-react-renderer';
import { Box, useColorModeValue, Text, HStack } from '@chakra-ui/react';
import theme from 'prism-react-renderer/themes/nightOwl';

const LineNumber = (props) => (
  <Box
    color={'accent'}
    paddingRight={'0.5rem'}
    userSelect={'none'}
    display={'table-cell'}
    borderRight={'1px solid var(--accent)'}
  >
    {props.number}
  </Box>
);

const CodeBlock = ({ children, className }) => {
  const language = className
    ? className.replace(/language-/, '')
    : 'javascript';
  const [title, setTitle] = React.useState('');
  const [code, setCode] = React.useState('');
  const colorMode = useColorModeValue('light', 'dark');

  React.useEffect(() => {
    const codeLines = children.split('\n');
    const title = codeLines[0];
    setTitle(title);
    setCode(codeLines.slice(1, -1).join('\n'));
  }, [children]);

  return (
    <Highlight {...defaultProps} code={code} language={language} theme={theme}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box>
          <HStack
            align={'center'}
            bg={'linear-gradient(145deg, #222222, #1d1d1d)'}
            borderRadius={'10px 10px 0px 0px'}
            boxShadow={
              colorMode === 'light'
                ? '15px 15px 10px #cccccc, -15px -15px 10px #ffffff'
                : 'inset 20px 20px 30px #1b1b1b, inset -20px -20px 30px #252525'
            }
            p={1}
          >
            <HStack flex={'1'}>
              <Box
                ml={'2'}
                bg={'red'}
                borderRadius={'100%'}
                w={'12px'}
                h={'12px'}
              ></Box>
              <Box
                bg={'yellow'}
                borderRadius={'100%'}
                w={'12px'}
                h={'12px'}
              ></Box>
              <Box
                bg={'green'}
                borderRadius={'100%'}
                w={'12px'}
                h={'12px'}
              ></Box>
            </HStack>
            <Text color={'white'} whiteSpace={'pre-line'} m="0 !important">
              {title}
            </Text>
            <Box flex={'1'} />
          </HStack>
          <Box>
            <Box
              as={'pre'}
              className={className}
              style={{
                ...style,
                padding: '10px',
                overflow: 'auto',
                textAlign: 'left',
                boxShadow:
                  'inset 10px 10px 15px #1b1b1b, inset -10px -10px 15px #252525',
                borderRadius: '0px 0px 10px 10px',
                background: 'var(--dark)',
                maxHeight: '500px',
              }}
              fontSize={'sm'}
            >
              {tokens.map((line, i) => (
                <Box
                  verticalAlign={'center'}
                  display={'table-row'}
                  key={i}
                  {...getLineProps({ line, key: i })}
                >
                  <LineNumber number={i + 1} />
                  {line.map((token, key) => (
                    <Box
                      as={'span'}
                      ml={key === 0 ? '10px' : '0px'}
                      key={key}
                      {...getTokenProps({ token, key })}
                    />
                  ))}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Highlight>
  );
};

export default CodeBlock;
