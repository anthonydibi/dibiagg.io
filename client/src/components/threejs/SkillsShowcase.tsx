import {
  Bounds,
  Float,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
  useBounds,
  View,
} from '@react-three/drei';
import * as React from 'react';
import {
  SiBlender,
  SiCsharp,
  SiJava,
  SiNextDotJs,
  SiNodeDotJs,
  SiPostgresql,
  SiReact,
  SiTypescript,
} from 'react-icons/si';
import ExtrudedSvg from './geometry/ExtrudedSvg';
import { Box } from '@chakra-ui/react';
import Nextjs from '../icons/Nextjs';
import Remix from '../icons/Remix';
import Blazor from '../icons/Blazor';
import { useFrame, useThree, Vector3 } from '@react-three/fiber';
import * as THREE from 'three';
import { FaJava } from 'react-icons/fa';
import { easing } from 'maath';

export interface ISkillsShowcaseProps {}

type Skill = {
  name: string;
  icon: React.ReactElement;
  position: Vector3;
};

const skills = [];

// const Skill: React.FC<{ skill: Skill }> = ({ skill }) => {
//     return (
//         <Float rotationIntensity={FLOAT_ROTATION_INTENSITY} floatIntensity={FLOAT_INTENSITY}>
//             <ExtrudedSvg svg={<SiReact />} position={[-7, 2.5, -2]}/>
//         </Float>
//     );
// }

const FLOAT_INTENSITY = 0;
const FLOAT_ROTATION_INTENSITY = 0;

const Skills = () => {
  const bounds = useBounds();
  useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [(state.pointer.x * state.viewport.width) / 4, state.pointer.y * 1.5, 10],
      0.5,
      delta,
    );
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group
      onPointerEnter={(e) =>
        e.object && (document.body.style.cursor = 'pointer')
      }
      onPointerLeave={(e) => e.object && (document.body.style.cursor = 'auto')}
      onClick={(e) => (
        e.stopPropagation(),
        e.delta <= 2 && bounds.refresh(e.object).fit(),
        console.log(e.object)
      )}
      onPointerMissed={(e) => {
        if (e.button === 0) bounds.refresh().fit();
        bounds.moveTo([0, 0, 10]).lookAt({ target: [0, 0, 0] });
      }}
    >
      <Float
        rotationIntensity={FLOAT_ROTATION_INTENSITY}
        floatIntensity={FLOAT_INTENSITY}
      >
        <ExtrudedSvg svg={<SiReact />} position={[-6.5, 2.5, -2]} />
      </Float>
      <Float
        rotationIntensity={FLOAT_ROTATION_INTENSITY}
        floatIntensity={FLOAT_INTENSITY}
      >
        <ExtrudedSvg svg={<Nextjs />} position={[-6.5, -2.5, -2]} />
      </Float>
      <Float
        rotationIntensity={FLOAT_ROTATION_INTENSITY}
        floatIntensity={FLOAT_INTENSITY}
      >
        <ExtrudedSvg svg={<SiBlender />} position={[-2.5, 2.5, -2]} />
      </Float>
      <Float
        rotationIntensity={FLOAT_ROTATION_INTENSITY}
        floatIntensity={FLOAT_INTENSITY}
      >
        <ExtrudedSvg svg={<SiJava />} position={[-2.5, -2.5, -2]} />
      </Float>
      <Float
        rotationIntensity={FLOAT_ROTATION_INTENSITY}
        floatIntensity={FLOAT_INTENSITY}
      >
        <ExtrudedSvg svg={<SiNodeDotJs />} position={[2.5, -2.5, -2]} />
      </Float>
      <Float
        rotationIntensity={FLOAT_ROTATION_INTENSITY}
        floatIntensity={FLOAT_INTENSITY}
      >
        <ExtrudedSvg svg={<Remix />} position={[2.5, 2.5, -2]} />
      </Float>
      <Float
        rotationIntensity={FLOAT_ROTATION_INTENSITY}
        floatIntensity={FLOAT_INTENSITY}
      >
        <ExtrudedSvg svg={<SiCsharp />} position={[6.5, 2.5, -2]} />
      </Float>
      <Float
        rotationIntensity={FLOAT_ROTATION_INTENSITY}
        floatIntensity={FLOAT_INTENSITY}
      >
        <ExtrudedSvg svg={<Blazor />} position={[6.5, -2.5, -2]} />
      </Float>
    </group>
  );
};

export default function SkillsShowcase(props: ISkillsShowcaseProps) {
  return (
    <>
      <View style={{ width: '100%', height: '100%' }}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} />
        {/* rectangular shelf */}
        <mesh position={[0, 0, -2]} scale={[18, 0.2, 1]}>
          <boxGeometry />
          <meshStandardMaterial color="white" />
        </mesh>
        <Bounds>
          <Skills />
        </Bounds>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
      </View>
    </>
  );
}
