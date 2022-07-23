import PdfViewer from '../components/PdfViewer'
import { Center } from '@chakra-ui/react'

export default function Resume(){
    return (
        <>
            <Center>
                <PdfViewer filename={"Anthony Di Biaggio Resume.pdf"} />
            </Center>
        </>
    );
}