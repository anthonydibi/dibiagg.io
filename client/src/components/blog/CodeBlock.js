import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { Box, useColorModeValue, Text } from '@chakra-ui/react'
import theme from 'prism-react-renderer/themes/nightOwl'

const LineNumber = (props) => (
  <Box
    color={'accent'}
    paddingRight={'0.5rem'}
    userSelect={'none'}
    display={'table-cell'}
    borderRight={"1px solid var(--accent)"}
  >
    {props.number}
  </Box>
)

const CodeBlock = ({ children, className }) => {
  const language = className ? className.replace(/language-/, '') : 'javascript'
  const [title, setTitle] = React.useState("");
  const [code, setCode] = React.useState("");
  const colorMode = useColorModeValue("light", "dark");

  React.useEffect(() => {
    const codeLines = children.split('\n');
    const title = codeLines[0];
    setTitle(title);
    setCode(codeLines.slice(1, -1).join('\n'));
  })

  return (
    <Highlight
      {...defaultProps}
      code={code}
      language={language}
      theme={theme}
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Box p={"10px"} borderRadius={"2px"} boxShadow={
          colorMode === "light" ? '20px 20px 30px #cccccc, -20px -20px 30px #ffffff'
          : '20px 20px 30px #1b1b1b, -20px -20px 30px #252525'
        }>
           <Text align={"center"} whiteSpace={"pre-line"} mb={"3 !important"} mt={"3 !important"}>
            {title}
          </Text>
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
              boxShadow: 'inset 10px 10px 15px #1b1b1b, inset -10px -10px 15px #252525',
              background: "var(--dark)",}}
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
                  <Box as={'span'} ml={key === 0 ? "10px" : "0px"} key={key} {...getTokenProps({ token, key })} />
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
