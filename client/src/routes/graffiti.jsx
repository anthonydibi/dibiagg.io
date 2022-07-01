import { Center, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from "@chakra-ui/react"
import GraffitiCanvas from '../components/GraffitiCanvas'
import { useDisclosure, useEffect } from 'react';
import GraffitiModal from '../components/GraffitiModal'

export default function Graffiti(){

    const showModal = false;

    useEffect(() => {
        const hasVisitedGraffiti = localStorage.getItem("hasVisitedGraffiti")
        if (!hasVisitedGraffiti) {
            localStorage.setItem("hasVisitedGraffiti", "1");
            showModal = true;
        }
      }, []);

    return (
        <Center>
            {showModal && <GraffitiModal />}
            <GraffitiCanvas/>
        </Center>
    );
}