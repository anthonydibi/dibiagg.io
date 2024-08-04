import { useLayoutEffect, useMemo, useRef } from 'react';
import { Path, Shape } from 'three';

export interface HollowCylinderGeometryProps {
  innerRadius?: number;
  outerRadius?: number;
  radialSegments?: number;
  height?: number;
}

const HollowCylinderGeometry: React.FC<HollowCylinderGeometryProps> = ({
  innerRadius = 0.5,
  outerRadius = 1,
  radialSegments = 8,
  height = 1,
  ...props
}) => {
  const ref = useRef();
  const { arcShape, options } = useMemo(() => {
    const arcShape = new Shape();
    arcShape.moveTo(outerRadius * 2, outerRadius);
    arcShape.absarc(
      outerRadius,
      outerRadius,
      outerRadius,
      0,
      Math.PI * 2,
      false,
    );
    const holePath = new Path();
    holePath.moveTo(outerRadius + innerRadius, outerRadius);
    holePath.absarc(
      outerRadius,
      outerRadius,
      innerRadius,
      0,
      Math.PI * 2,
      true,
    );
    arcShape.holes.push(holePath);
    const options = {
      depth: height,
      bevelEnabled: false,
      steps: 1,
      curveSegments: radialSegments / 2,
    };
    return { arcShape, options };
  }, []);
  useLayoutEffect(() => {
    (ref.current as any)?.center();
  }, []);
  return (
    <extrudeBufferGeometry ref={ref} args={[arcShape, options]} {...props} />
  );
};

export default HollowCylinderGeometry;
