import markdownStyles from "../../styles/markdown-styles.module.css";
import { Box } from "@chakra-ui/react";

const PostBody = ({ content }) => {
  return (
    <Box maxW={"2xl"} mx={"auto"}>
      <Box
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Box>
  );
};

export default PostBody;
