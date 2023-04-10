import PdfViewer from "../components/PdfViewer";
import { Center, Box } from "@chakra-ui/react";
import SEO from "../components/seo";

export default function Resume() {
  return (
    <>
      <SEO
        description="Anthony Di Biaggio's resume"
        title="Resume"
        siteTitle="dibiagg.io"
      />
      <Center>
        <Box border="1px solid" borderTop="0px none" borderBottom="0px none">
          <PdfViewer filename={"Anthony Di Biaggio Resume.pdf"} />
        </Box>
      </Center>
    </>
  );
}
