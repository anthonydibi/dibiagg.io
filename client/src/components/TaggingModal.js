import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text } from "@chakra-ui/react"
import React from 'react'

export default function GraffitiModal(props){

    return (
        <>
            <Modal isOpen={props.isOpen} onClose={props.onClose}>
                <ModalOverlay />
                <ModalContent p={{base: 2, md: 4}}>
                <ModalHeader>What is tagging?</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontSize={"lg"}>Tagging is a way to attach your name to your drawings. Just enter your name, and when someone
                    hovers over any of your future drawings your name will be shown.
                    </Text>
                    <br/>
                    <Text fontSize={"lg"}>
                    You may notice that no password is required. I think that everything requiring an account is a plague to the internet,
                    so cherish the fact that you don't have to think of a password and log in to your email to open a verification link.
                    Yes, this means that you could steal someone else's name and pass your drawings as theirs. But you wouldn't do that,
                    right? If you did, would the thought of what you've done haunt you at night? Would it consume you until there is nothing
                    left until the thought itself? Would you go to extreme measures to make it go away? But then what is left, besides your
                    very skin and bones?
                    </Text>
                    <br/>
                    <Text fontSize={"lg"}>
                    Just some food for thought. Have fun! ｡^‿^｡</Text>
                </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}