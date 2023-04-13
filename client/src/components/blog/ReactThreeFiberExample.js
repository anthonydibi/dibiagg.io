import React, { useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useColorMode, useToken } from '@chakra-ui/react';

function SpinnyCube(props){
    const mesh = useRef();
    const [hovered, setHovered] = useState(false);
    const [active, setActive] = useState(false);
    const [accentColor, setAccentColor] = useState("");
    const { colorMode, toggleColorMode } = useColorMode();

    useEffect(() => {
        setAccentColor(getComputedStyle(document.body).getPropertyValue('--accent'));
    }, [colorMode]);

    useFrame((state, delta) => {
        mesh.current.rotation.x += delta;
        mesh.current.rotation.z += delta;
    });

    return (
        <mesh
            {...props}
            ref={mesh}
            scale = {active ? 1 : 1.2}
            onClick={(event) => setActive(!active)}
            onPointerOver={(event) => setHovered(true)}
            onPointerOut={(event) => setHovered(false)}
            >
            <boxGeometry args={[2, 2, 2]} />
            <meshStandardMaterial color={hovered ? "green" : accentColor} />
        </mesh>
    )
}

export default function ReactThreeFiberExample(props){
    return (
        <Canvas>
            <ambientLight />
            <pointLight position={[10, 10, 10]} />
            <SpinnyCube position={[-3, 0.5, 0]} />
            <SpinnyCube position={[3, -0.7, 0]} />
        </Canvas>
    )
}