import { OrthographicCamera, useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Box, usePrefersReducedMotion } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useMemo, useRef, useState } from 'react';
import { Group, MathUtils } from 'three';
import View from './helpers/View';

interface RecipesPotProps {
  isOpen: boolean;
}

const RecipesPot = ({ isOpen }: RecipesPotProps) => {
  const reduceMotion = usePrefersReducedMotion();
  const pot = useGLTF('/recipe-pot-stew.glb');
  const lid = useGLTF('/recipe-pot-stew-lid.glb');
  const potScene = useMemo(() => pot.scene.clone(), [pot.scene]);
  const lidScene = useMemo(() => lid.scene.clone(), [lid.scene]);
  const spinningPotRef = useRef<Group>(null);
  const lidRef = useRef<Group>(null);
  const spinningLidRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!spinningPotRef.current || !lidRef.current || !spinningLidRef.current) {
      return;
    }

    if (!reduceMotion) {
      spinningPotRef.current.rotation.y += delta * 0.45;
      spinningLidRef.current.rotation.y = spinningPotRef.current.rotation.y;
    }

    const ease = 8;
    lidRef.current.position.y = MathUtils.damp(
      lidRef.current.position.y,
      isOpen ? 0.74 : 0.37,
      ease,
      delta,
    );
    lidRef.current.position.z = MathUtils.damp(
      lidRef.current.position.z,
      isOpen ? -0.16 : 0,
      ease,
      delta,
    );
    lidRef.current.rotation.x = MathUtils.damp(
      lidRef.current.rotation.x,
      isOpen ? -1.05 : 0,
      ease,
      delta,
    );
  });

  return (
    <group
      scale={3.4}
      position={[0, -0.5, 0]}
      rotation={[0.2, 0, 0]}
    >
      <group ref={spinningPotRef}>
        <primitive object={potScene} />
      </group>
      <group ref={lidRef} position={[0, 0.37, 0]}>
        <group ref={spinningLidRef}>
          <primitive object={lidScene} />
        </group>
      </group>
    </group>
  );
};

const RecipesPotView = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: '150px',
      }}
    >
      <View style={{ width: '100%', height: '100%', minHeight: '150px' }}>
        <OrthographicCamera
          makeDefault
          position={[0, 1.25, 3.8]}
          rotation={[-0.25, 0, 0]}
          zoom={44}
        />
        <ambientLight intensity={1.6} />
        <directionalLight position={[3, 5, 4]} intensity={2.2} />
        <directionalLight position={[-3, 1, 2]} intensity={0.7} />
        <RecipesPot isOpen={isHovered || isFocused} />
      </View>
      <Box
        as="button"
        type="button"
        aria-label="View recipes"
        aria-describedby="recipes-description"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
        onClick={() => router.push('/recipes')}
        position="absolute"
        inset="0"
        width="100%"
        height="100%"
        border="0"
        background="transparent"
        cursor="pointer"
        _focusVisible={{
          outline: '2px solid var(--accent)',
          outlineOffset: '-2px',
        }}
      />
    </div>
  );
};

useGLTF.preload('/recipe-pot-stew.glb');
useGLTF.preload('/recipe-pot-stew-lid.glb');

export default RecipesPotView;
