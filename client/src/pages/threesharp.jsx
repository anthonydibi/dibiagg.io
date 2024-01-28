import SEO from '../components/seo';
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
      <ThreeSharpShowcase />
    </>
  );
}
