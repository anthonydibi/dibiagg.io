import PdfViewer from '../components/PdfViewer'
import { Center, Box } from '@chakra-ui/react'

export default function Resume(){
    return (
        <>
        <Box h="100px"></Box>
            <Center>
                <PdfViewer filename={"Anthony Di Biaggio Resume.pdf"} />
            </Center>
        </>
    );
}