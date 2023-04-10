import React from "react";
import { Flex, useColorModeValue, Heading, Text, Icon } from "@chakra-ui/react";
//
export default function IconCard(props) {
  return (
    <Flex
      bg={useColorModeValue(props.color, "black")}
      border={"1px solid"}
      borderColor={useColorModeValue("black", "white")}
      width={"100%"}
      maxW={"450px"}
      height={"100%"}
      p={"5"}
      flexDirection={"column"}
      justify={"start"}
      align={"start"}
      gap={"15px"}
    >
      <Icon as={props.icon} boxSize={"60px"} color={"accent"} />
      <Heading size={"md"} align="start">
        {props.heading}
      </Heading>
      <Text w="80%" fontSize={{ base: "md", sm: "lg", md: "xl" }} align="start">
        {props.text}
      </Text>
    </Flex>
  );
}
