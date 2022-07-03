import React, { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import { Flex, Text, Box, IconButton } from '@chakra-ui/react'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';


export default function PdfViewer(props){  
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

    const [numPages, setNumPages] = useState(null);
    const pageNumber = 1;

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <>
            <Flex direction={"column"}>
                <Box p={"1"} border={"solid"} borderRadius={"md"}>
                    <Document file={props.filename} onLoadSuccess={onDocumentLoadSuccess}>
                        <Page pageNumber={pageNumber} />
                    </Document>
                </Box>
                <Flex justify={"center"} align={"center"}>
                    <IconButton size="xs" isRound="true" m="2" value="previousPage" variant="solid" icon={<AiFillCaretLeft/>}>
                    </IconButton>
                    <Text textAlign={"center"}>
                        Page {pageNumber} of {numPages}
                    </Text>
                    <IconButton size="xs" isRound="true" m="2" value="nextPage" variant="solid" icon={<AiFillCaretRight/>}>
                    </IconButton>
                </Flex>
            </Flex>
        </>
    );
}