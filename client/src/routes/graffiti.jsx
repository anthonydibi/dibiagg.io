import { Center, Box } from "@chakra-ui/react"
import GraffitiCanvas from '../components/GraffitiCanvas'
import GraffitiModal from '../components/GraffitiModal'

export default function Graffiti(){

    let showModal = false;

    let hasVisitedGraffiti = localStorage.getItem("hasVisitedGraffiti")
    if (hasVisitedGraffiti !== "1") {
        localStorage.setItem("hasVisitedGraffiti", "1");
        showModal = true;
    }

    return (
        <>
            <Box h="70px" w="100%"></Box> {/*spacer for sticky nav*/}
            <Center>
                {console.log(showModal)}
                {showModal && <GraffitiModal />}
                <GraffitiCanvas/>
            </Center>
        </>
    );
}