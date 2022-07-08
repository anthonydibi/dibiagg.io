import ContactButtons from "./ContactButtons";
import { Flex, Heading, Stack } from "@chakra-ui/react";

export default function ContactFooter(){
    return (
        <>
            <Stack py={10} w={"100%"}>
                <Heading w={"100%"} align={"center"} justify={"center"}>
                    Get in touch
                </Heading>
                <Flex w={"100%"} justify={'center'}>
                    <ContactButtons />
                </Flex>
            </Stack>
        </>
    );
}