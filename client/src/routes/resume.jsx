import PdfViewer from '../components/PdfViewer'
import { Center, Box } from '@chakra-ui/react'

export default function Resume(){
    return (
        <>
        <Center>
            <Box border="1px solid">
                <PdfViewer filename={"Anthony Di Biaggio Resume.pdf"} />
            </Box>
        </Center>
        </>
    );
}