import { MeshProps, useFrame, useLoader, Vector3 } from '@react-three/fiber';
import React, {
  ReactElement,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';
import { SVGLoader } from 'three/examples/jsm/loaders/SVGLoader';
import { useComponentMarkup } from '../../../utils/react';
import { getSvgDataURI } from '../../../utils/uri';
import * as THREE from 'three';
import { useColorMode } from '@chakra-ui/react';
import { Center, MeshRefractionMaterial, Sphere } from '@react-three/drei';

export type ExtrudedSvgProps = {
  id: string;
  svg: ReactElement;
  extrusionDepth?: number;
  position?: Vector3;
  onClick?: (id: string) => void;
  scale?: number;
} & MeshProps;

const ExtrudedSvg = ({
  id,
  svg,
  extrusionDepth = 1.5,
  position,
  onClick,
  scale = 0.04,
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

  const [accentColor, setAccentColor] = React.useState<string | null>(
    typeof window !== 'undefined'
      ? getComputedStyle(document.body).getPropertyValue('--accent')
      : null,
  );
  const { colorMode } = useColorMode();

  const [hovered, setHovered] = React.useState<boolean>(false);

  const handlePointerEnter = (e) => {
    setHovered(true);
  };

  const handlePointerLeave = (e) => {
    setHovered(false);
  };

  useLayoutEffect(() => {
    setAccentColor(
      getComputedStyle(document.body).getPropertyValue('--accent'),
    );
  }, [colorMode]);

  return (
    <group scale={scale} onClick={() => onClick(id)}>
      <Center cacheKey={svg}>
        {/* sphere */}
        <mesh
          key={'-1'}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
        >
          <sphereGeometry args={[18, 32, 32]} />
          <meshStandardMaterial color={accentColor} opacity={0.2} transparent />
        </mesh>
      </Center>
      <Center cacheKey={svg}>
        {extrudedGeometries.map((geometry, index) => (
          <>
            <mesh key={index} geometry={geometry} {...props}>
              <meshStandardMaterial
                color={hovered ? 'lightgreen' : accentColor}
              />
            </mesh>
          </>
        ))}
      </Center>
    </group>
  );
};

export default ExtrudedSvg;
