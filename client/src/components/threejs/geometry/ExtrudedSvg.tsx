import { MeshProps, useFrame, useLoader, Vector3 } from '@react-three/fiber';
import React, { ReactElement, useEffect, useMemo, useRef } from 'react';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { useComponentMarkup } from '../../../utils/react';
import { getSvgDataURI } from '../../../utils/uri';
import * as THREE from 'three';
import { useColorMode } from '@chakra-ui/react';
import { Center } from '@react-three/drei';

export type ExtrudedSvgProps = {
  svg: ReactElement;
  extrusionDepth?: number;
  position?: Vector3;
} & MeshProps;

const ExtrudedSvg = ({
  svg,
  extrusionDepth = 1.5,
  position,
  ...props
}: ExtrudedSvgProps) => {
  const svgMarkup = useComponentMarkup(svg);
  const svgResult = useLoader(SVGLoader, getSvgDataURI(svgMarkup));
  const extrudedGeometries = useMemo(() => {
    const shapes = svgResult.paths.map(SVGLoader.createShapes);
    const extrudedGeometries = shapes.map(
      (shape) =>
        new THREE.ExtrudeGeometry(shape, {
          depth: extrusionDepth,
          bevelEnabled: true,
        }),
    );
    return extrudedGeometries;
  }, [svg]);

  const [accentColor, setAccentColor] = React.useState<string>();
  const { colorMode } = useColorMode();

  useEffect(() => {
    setAccentColor(
      getComputedStyle(document.body).getPropertyValue('--accent'),
    );
  }, [colorMode]);

  return (
    <group position={position} scale={0.12} rotation={[-Math.PI, 0, 0]}>
      <Center cacheKey={svg}>
        {extrudedGeometries.map((geometry, index) => (
          <>
            <mesh key={index} geometry={geometry} {...props}>
              <meshStandardMaterial color="white" />
            </mesh>
          </>
        ))}
      </Center>
    </group>
  );
};

export default ExtrudedSvg;
