import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { Box } from '@chakra-ui/react'
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

  return (
    <Highlight
      {...defaultProps}
      code={children}
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
            marginBottom: '32px',
            overflow: 'scroll',
            textAlign: 'left',
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
      )}
    </Highlight>
  )
}

export default CodeBlock
