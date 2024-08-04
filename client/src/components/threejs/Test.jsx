import { useColorMode } from '@chakra-ui/react';
import { useThree } from '@react-three/fiber';
import React from 'react';
import { Color, DoubleSide } from 'three';
import HollowCylinderGeometry from './geometry/HollowCylinderGeometry';
import { Cylinder, Image, OrbitControls } from '@react-three/drei';

const Testtt = () => {
  const imageGroupRef = React.useRef();
  const camera = useThree((state) => state.camera);

  const { colorMode } = useColorMode();
  const accentColor = new Color(
    getComputedStyle(document.body).getPropertyValue('--accent'),
  );

  return (
    <>
      <OrbitControls enablePan={false} enableZoom={false} />
      <group scale={4.3}>
        <group ref={imageGroupRef}>
          <ambientLight />
          <pointLight position={[5, 5, 1]} />
          <Image
            side={DoubleSide}
            radius={0.5}
            transparent
            url="https://media.licdn.com/dms/image/D5603AQFleFyojVFiew/profile-displayphoto-shrink_200_200/0/1718408239666?e=1724889600&v=beta&t=Ul_7ZW8S7uEal03iGQLKLwUyPAHo9qpGTEo9JCGFxdw"
          />
          <mesh>
            <HollowCylinderGeometry
              innerRadius={0.69}
              outerRadius={0.7}
              height={0.03}
              radialSegments={64}
              heightSegments={64}
            />
            <meshPhongMaterial color={new Color(accentColor)} />
          </mesh>
          <mesh>
            <HollowCylinderGeometry
              innerRadius={0.491}
              outerRadius={0.51}
              height={0.03}
              radialSegments={64}
              heightSegments={64}
            />
            <meshPhongMaterial color={new Color(accentColor)} />
          </mesh>
          <Cylinder args={[0.001, 0.01, 1, 64]} position={[0, 1.2, 0]}>
            <meshPhongMaterial color={accentColor} />
          </Cylinder>
        </group>
      </group>
    </>
  );
};

export default Testtt;
