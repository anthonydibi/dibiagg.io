import ContactButtons from "./ContactButtons";
import { Flex, Heading, Stack, Center } from "@chakra-ui/react";

export default function ContactFooter(){
    return (
        <>
            <Center borderTop="1px solid">
            <Stack p={10} w={"auto"}>
                <Heading w={"100%"} align={"center"} justify={"center"}>
                    GET IN TOUCH
                </Heading>
                <Flex w={"100%"} justify={'center'}>
                    <ContactButtons />
                </Flex>
            </Stack>
            </Center>
        </>
    );
}