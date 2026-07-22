import { OrthographicCamera, useGLTF, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Box, useColorMode, usePrefersReducedMotion } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
  NearestFilter,
  Object3D,
  SRGBColorSpace,
  Texture,
} from 'three';
import View from './helpers/View';

interface RecipesPotProps {
  isOpen: boolean;
  onReady: () => void;
  textureUrl: string;
}

const cloneWithTexture = (scene: Object3D, texture: Texture) => {
  const clone = scene.clone();

  clone.traverse((child) => {
    if (!(child instanceof Mesh)) return;

    const hasMultipleMaterials = Array.isArray(child.material);
    const materials = hasMultipleMaterials ? child.material : [child.material];

    child.material = materials.map((material) => {
      const clone = material.clone();

      if (clone instanceof MeshStandardMaterial && clone.name === 'colormap') {
        clone.map = texture;
        clone.needsUpdate = true;
      }

      return clone;
    });

    if (!hasMultipleMaterials) child.material = child.material[0];
  });

  return clone;
};

const RecipesPot = ({ isOpen, onReady, textureUrl }: RecipesPotProps) => {
  const reduceMotion = usePrefersReducedMotion();
  const pot = useGLTF('/recipe-pot-stew.glb');
  const lid = useGLTF('/recipe-pot-stew-lid.glb');
  const loadedTexture = useTexture(textureUrl);
  const texture = useMemo(() => {
    loadedTexture.flipY = false;
    loadedTexture.colorSpace = SRGBColorSpace;
    loadedTexture.generateMipmaps = false;
    loadedTexture.minFilter = NearestFilter;
    loadedTexture.magFilter = NearestFilter;
    loadedTexture.needsUpdate = true;
    return loadedTexture;
  }, [loadedTexture]);
  const potScene = useMemo(
    () => cloneWithTexture(pot.scene, texture),
    [pot.scene, texture],
  );
  const lidScene = useMemo(
    () => cloneWithTexture(lid.scene, texture),
    [lid.scene, texture],
  );
  const spinningPotRef = useRef<Group>(null);
  const lidRef = useRef<Group>(null);
  const spinningLidRef = useRef<Group>(null);
  const angularVelocityRef = useRef(0.45);
  const spinCycleDistanceRef = useRef(0);

  useEffect(() => {
    onReady();
  }, [onReady]);

  useFrame((_, delta) => {
    if (!spinningPotRef.current || !lidRef.current || !spinningLidRef.current) {
      return;
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

    if (!reduceMotion) {
      const lidProgress = MathUtils.clamp(
        (lidRef.current.position.y - 0.37) / (0.74 - 0.37),
        0,
        1,
      );
      const fastArc = Math.PI * 2.5;
      const slowArc = Math.PI * 0.5;
      const cycleArc = fastArc + slowArc;
      const isFlourishing = spinCycleDistanceRef.current < fastArc;
      const phaseDistance = isFlourishing
        ? spinCycleDistanceRef.current
        : spinCycleDistanceRef.current - fastArc;
      const phaseProgress = phaseDistance / (isFlourishing ? fastArc : slowArc);

      // A quick anticipation leads into a sustained 1.25-turn flourish, then
      // gives the pot a quick quarter-turn to settle and present itself.
      const accelerate = MathUtils.smoothstep(phaseProgress, 0, 0.2);
      const decelerate = 1 - MathUtils.smoothstep(phaseProgress, 0.62, 1);
      const flourishWeight = accelerate * decelerate;
      const idleAngularVelocity = isFlourishing
        ? MathUtils.lerp(0.65, 3.4, flourishWeight)
        : MathUtils.lerp(0.65, 0.92, Math.sin(phaseProgress * Math.PI) ** 2);
      const targetAngularVelocity = MathUtils.lerp(
        idleAngularVelocity,
        0.08,
        lidProgress ** 2,
      );

      angularVelocityRef.current = MathUtils.damp(
        angularVelocityRef.current,
        targetAngularVelocity,
        8,
        delta,
      );
      const rotationDelta = delta * angularVelocityRef.current;
      spinningPotRef.current.rotation.y += rotationDelta;
      spinningLidRef.current.rotation.y = spinningPotRef.current.rotation.y;
      spinCycleDistanceRef.current =
        (spinCycleDistanceRef.current + rotationDelta) % cycleArc;
    }
  });

  return (
    <group scale={3.4} position={[0, -0.5, 0]} rotation={[0.2, 0, 0]}>
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

interface RecipesPotViewProps {
  onReady: () => void;
}

const RecipesPotView = ({ onReady }: RecipesPotViewProps) => {
  const router = useRouter();
  const { colorMode } = useColorMode();
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const textureUrl = `/Textures/stew-colormap-${colorMode}.png`;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      <View style={{ width: '100%', height: '100%' }}>
        <OrthographicCamera
          makeDefault
          position={[0, 1.25, 3.8]}
          rotation={[-0.25, 0, 0]}
          zoom={44}
        />
        <ambientLight intensity={1.6} />
        <directionalLight position={[3, 5, 4]} intensity={2.2} />
        <directionalLight position={[-3, 1, 2]} intensity={0.7} />
        <RecipesPot
          isOpen={isHovered || isFocused}
          onReady={onReady}
          textureUrl={textureUrl}
        />
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
useTexture.preload('/Textures/stew-colormap-light.png');
useTexture.preload('/Textures/stew-colormap-dark.png');

export default RecipesPotView;
