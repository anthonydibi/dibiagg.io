import ContactButtons from "./ContactButtons";
import { Flex, Heading, Stack, Center } from "@chakra-ui/react";

export default function ContactFooter(){
    return (
        <>
            <Center>
            <Stack p={10} w={"auto"} borderLeft={{base: "none", md: "1px solid"}} borderBottom={{base: "none", md: "1px solid"}} borderRight={{base: "none", md: "1px solid"}}>
                <Heading w={"100%"} align={"center"} justify={"center"}>
                    CALL ME, MAYBE?
                </Heading>
                <Flex w={"100%"} justify={'center'}>
                    <ContactButtons />
                </Flex>
            </Stack>
            </Center>
        </>
    );
}