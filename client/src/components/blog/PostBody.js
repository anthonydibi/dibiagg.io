import markdownStyles from "../../styles/markdown-styles.module.css";
import { MDXRemote } from 'next-mdx-remote'
import { Box, Button } from "@chakra-ui/react";
import Image from 'next/image'
import CodeBlock from "./CodeBlock";

const NextImage = (props) => (
  <Image alt={props.alt} fill={"true"} {...props} />
)

const components = {
  img: NextImage,
  Button: Button,
  pre: ({children, className}) => { return (<pre>{children}</pre>) },
  code: ({children, className}) => {
    return className ? (
      <CodeBlock className={className}>{children}</CodeBlock>
    ) : <code className="language-text">{children}</code>
  }
}

const PostBody = ({ content }) => {
  return (
    <Box maxW={"2xl"} mx={"auto"}>
      <Box
        className={markdownStyles["markdown"]}>
          <MDXRemote {...content} components={components} lazy/>
        </Box>
    </Box>
  );
};

export default PostBody;
