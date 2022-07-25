import PdfViewer from '../components/PdfViewer'
import { Center, Box } from '@chakra-ui/react'

export default function Resume(){
    return (
        <>
        <Center>
            <Box border="1px solid" borderBottom="0px none">
                <PdfViewer filename={"Anthony Di Biaggio Resume.pdf"} />
            </Box>
        </Center>
        </>
    );
}