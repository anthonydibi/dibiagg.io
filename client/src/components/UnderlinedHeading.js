import { Heading, Box } from "@chakra-ui/react";

export default function UnderlinedHeading(props){
    return (
        <Box position={"relative"} width={"fit-content"} {...props}>
            <Heading display={"inline-block"} size={"2xl"} >
                {props.children}
            </Heading>
            <Box position={"absolute"} bottom={"-10%"} left={"-3%"} zIndex={"-1"} width={"125%"} height={"45%"} backgroundColor={"accent"}></Box>
        </Box>
    )
}