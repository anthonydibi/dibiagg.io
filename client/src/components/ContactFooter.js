import ContactButtons from "./ContactButtons";
import { Flex, Heading, Stack} from "@chakra-ui/react";

export default function ContactFooter(){
    return (
        <>
            <Stack borderTop="1px solid" px={8} direction="row" align="center" justify={"center"} h={"60px"}>
                <Heading mr={{base: 5, md: 10}} fontWeight="bold" size="md" align={"center"} justify={"center"} whiteSpace="nowrap">
                    GET IN TOUCH
                </Heading>
                <Flex justify={'center'} gap={3}>
                    <ContactButtons />
                </Flex>
            </Stack>
        </>
    );
}