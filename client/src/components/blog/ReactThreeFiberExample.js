import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useColorMode } from '@chakra-ui/react';
import { View } from '@react-three/drei';

export function SpinnyCube(props) {
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [accentColor, setAccentColor] = useState('');
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    setAccentColor(
      getComputedStyle(document.body).getPropertyValue('--accent2'),
    );
  }, [colorMode]);

  //tilt the cube a bit down and right initially for a more dynamic look
  useEffect(() => {
    mesh.current.rotation.x = 0.5;
    mesh.current.rotation.y = 0.5;
  }, []);

  useFrame((state, delta) => {
    mesh.current.rotation.y += delta * 3;
    mesh.current.rotation.x = 0.5;
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1 : 1.2}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHovered(true)}
      onPointerOut={(event) => setHovered(false)}
    >
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color={hovered ? 'green' : accentColor} />
    </mesh>
  );
}

export default function ReactThreeFiberExample(props) {
  return (
    <View style={{ width: '100%', height: '200px' }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <SpinnyCube position={[-3, 0.5, 0]} />
      <SpinnyCube position={[3, -0.7, 0]} />
    </View>
  );
}
