import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, useDisclosure } from "@chakra-ui/react"
import React from 'react'

export default function GraffitiModal(props){

    const { isOpen, onOpen, onClose } = useDisclosure()
    
    React.useEffect(()=>{
        onOpen();
    }, [onOpen]);

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Welcome to Graffiti!</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Text fontSize={"lg"}>This is a canvas where whatever you draw will be visible to others who
                    visit this page. The wall is reset each day, and you can travel back in time using the arrow buttons above the canvas.</Text>
                    <br />
                    <Text textColor={"red"} fontSize = {"md"}><b>Be warned:</b> this is just a prototype, so the user experience is buggy. Whatever is currently on your screen is accepted as the true state of the canvas,
                    so drawings may be overwritten and things will definitely go wrong. There also isn't support for multiple people drawing simultaneously so your masterpiece will be overwritten if someone else
                    is currently drawing. This is something I'm working on!</Text>
                </ModalBody>

                <ModalFooter>
                    <Button mr={3} onClick={onClose}>
                    Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}