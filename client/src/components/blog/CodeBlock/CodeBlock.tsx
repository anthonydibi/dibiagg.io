import React, { useMemo } from 'react';
import Highlight, { defaultProps, Language } from 'prism-react-renderer';
import { Box, useColorModeValue, Text, HStack } from '@chakra-ui/react';
import theme from 'prism-react-renderer/themes/nightOwl';
import CodeLineNumber from './CodeLineNumber';

export interface CodeBlockProps {
  children: string;
  className: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ children, className }) => {
  const language: Language = className
    ? (className.replace(/language-/, '') as Language)
    : 'javascript';
  const colorMode = useColorModeValue('light', 'dark');

  const codeLines = useMemo(() => children.split('\n'), [children]);
  const title = codeLines[0];
  const code = codeLines.slice(1, -1).join('\n');

  return (
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
        <Box flex={'1'} />
        <Text color={'white'} whiteSpace={'pre-line'} m="0 !important">
          {title}
        </Text>
        <HStack flex={'1'} justifyContent="end">
          <Box bg={'red'} borderRadius={'100%'} w={'12px'} h={'12px'}></Box>
          <Box bg={'yellow'} borderRadius={'100%'} w={'12px'} h={'12px'}></Box>
          <Box
            bg={'green'}
            borderRadius={'100%'}
            w={'12px'}
            h={'12px'}
            mr=".625rem"
          ></Box>
        </HStack>
      </HStack>
      <Highlight
        {...defaultProps}
        code={code}
        language={language}
        theme={theme}
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
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
                <CodeLineNumber number={i + 1} />
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
        )}
      </Highlight>
    </Box>
  );
};

export default CodeBlock;