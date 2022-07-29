import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, Text, useDisclosure } from "@chakra-ui/react"
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
                    visit this page. Use the buttons on the right of the canvas to select the pen and eraser tools. The wall is reset each day, and you can travel back in time using the arrow buttons above the canvas.</Text>
                    <br />
                    <Text textColor={"accent"} fontSize = {"md"}><b>Be warned:</b> this is just a prototype, so the user experience is buggy, especially
                    when multiple users are drawing simultaneously. Your masterpiece may be overwritten or deleted. This is something I am working on!</Text>
                </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}