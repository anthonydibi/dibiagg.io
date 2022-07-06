import ContactButtons from "./ContactButtons";
import { Flex } from "@chakra-ui/react";

export default function ContactFooter(){
    return (
        <>
            <Flex py={10} w={"100%"} justify={'center'}>
                <ContactButtons />
            </Flex>
        </>
    );
}