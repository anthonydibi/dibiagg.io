import { Center } from "@chakra-ui/react"
import GraffitiModal from '../components/GraffitiModal'
import dynamic from "next/dynamic";
import { useEffect } from "react";

const GraffitiCanvas = dynamic(() => import("../components/GraffitiCanvas"), { //ssr has to be disabled for konva-react
  ssr: false,
});

export default function Graffiti(){

    let showModal = false;

    useEffect(() => {
        let hasVisitedGraffiti = localStorage.getItem("hasVisitedGraffiti")
        if (hasVisitedGraffiti !== "1") {
            localStorage.setItem("hasVisitedGraffiti", "1");
            showModal = true;
        }
    }, [])

    return (
        <>
            <Center>
                {showModal && <GraffitiModal />}
                <GraffitiCanvas/>
            </Center>
        </>
    );
}