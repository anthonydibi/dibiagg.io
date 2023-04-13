import { Avatar, Box, Stack, Heading } from "@chakra-ui/react";
import DateFormatter from "./DateFormatter";
import CoverImage from "./CoverImage";
import PostTitle from "./PostTitle";

const PostHeader = ({ title, coverImage, date }) => {
  const authorName = "Anthony Di Biaggio";
  const authorPicture = "../me.png";

  return (
    <>
      <PostTitle>{title}</PostTitle>
      <Box display={{ base: "block", md: "none" }} mt={"6"}>
        <Stack direction={"row"} gap={"15px"} align={"center"}>
          {" "}
          {/**TODO: bring the avatars out into their own component - couldn't get a component to work for some reason?? */}
          <Avatar bg="accent" name="Anthony Di Biaggio" src="/me.png" />
          <Heading size={"sm"}>Anthony Di Biaggio</Heading>
        </Stack>
      </Box>
      <CoverImage title={title} src={coverImage} />
      <Box maxW={"2xl"} mx={"auto"} mt={"6"}>
        <Box mb={"6"} display={{ base: "none", md: "block" }}>
          <Stack direction={"row"} gap={"15px"} align={"center"}>
            <Avatar bg="accent" name="Anthony Di Biaggio" src="/me.png" />
            <Heading size={"sm"}>Anthony Di Biaggio</Heading>
          </Stack>
        </Box>
        <Box mb={"6"}>
          <DateFormatter dateString={date} />
        </Box>
      </Box>
    </>
  );
};

export default PostHeader;