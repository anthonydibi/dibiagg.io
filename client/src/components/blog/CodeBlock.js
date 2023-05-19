import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { Box, useColorModeValue } from '@chakra-ui/react'
import theme from 'prism-react-renderer/themes/nightOwl'

const LineNumber = (props) => (
  <Box
    color={'accent'}
    paddingRight={'0.75rem'}
    userSelect={'none'}
    display={'table-cell'}
  >
    {props.number}
  </Box>
)

const CodeBlock = ({ children, className }) => {
  const language = className ? className.replace(/language-/, '') : 'javascript'
  const colorMode = useColorModeValue("light", "dark");

  return (
    <Highlight
      {...defaultProps}
      code={children}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box p={"10px 10px 10px 10px"} borderRadius={"2px"} boxShadow={
          colorMode === "light" ? '20px 20px 30px #cccccc, -20px -20px 30px #ffffff'
          : '20px 20px 30px #1b1b1b, -20px -20px 30px #252525'
        }>
        <Box p={"4"} borderRadius={"20px"} boxShadow={
          colorMode === "light" ? 'inset 20px 20px 30px #cccccc, inset -20px -20px 30px #ffffff'
          : 'inset 20px 20px 30px #1b1b1b, inset -20px -20px 30px #252525'
        }>
          <Box
            as={'pre'}
            className={className}
            style={{
              ...style,
              borderRadius: "10px",
              padding: '10px',
              overflow: 'scroll',
              textAlign: 'left',
              background: "var(--dark)",
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
                  <Box as={'span'} key={key} {...getTokenProps({ token, key })} />
                ))}
              </Box>
            ))}
          </Box>
        </Box>
        </Box>
      )}
    </Highlight>
  )
}

export default CodeBlock
