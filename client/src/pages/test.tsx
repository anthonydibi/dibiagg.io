import { Box } from '@chakra-ui/react';
import SEO from '../components/seo';
import Skills from '../components/threejs/Skills';
import ThreeSharpShowcase from '../components/threejs/ThreeSharpShowcase';

const LoadingComponent = <div>loading...</div>;

export default function ThreeSharp() {
  return (
    <>
      <SEO
        description="ThreeSharp - a virtual reality code visualization tool"
        title="ThreeSharp"
        siteTitle="dibiagg.io"
      />
      <Box width="400px" height="400px" position="relative">
        <Skills containerHeight={400} containerWidth={400} />
      </Box>
    </>
  );
}
