import React, { useState } from 'react'
import dynamic from 'next/dynamic'
const Document = dynamic(() =>
  import('react-pdf').then((module) => module.Document),
)
const Page = dynamic(() => import('react-pdf').then((module) => module.Page))
const pdfjs = await import('react-pdf').then((module) => module.pdfjs)
import { Flex, Text, Box, IconButton } from '@chakra-ui/react'
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai'

export default function PdfViewer(props) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`

  const [numPages, setNumPages] = useState(null)
  const pageNumber = 1

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  return (
    <>
      <Flex direction={'column'}>
        <Box p={1} id={'ResumeContainer'}>
          <Document file={props.filename} onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </Box>
        <Flex justify={'center'} align={'center'} my="2">
          <IconButton
            size="xs"
            isRound="true"
            m="2"
            value="previousPage"
            variant="solid"
            icon={<AiFillCaretLeft />}
          ></IconButton>
          <Text textAlign={'center'}>
            PAGE {pageNumber} OF {numPages}
          </Text>
          <IconButton
            size="xs"
            isRound="true"
            m="2"
            value="nextPage"
            variant="solid"
            icon={<AiFillCaretRight />}
          ></IconButton>
        </Flex>
      </Flex>
    </>
  )
}
