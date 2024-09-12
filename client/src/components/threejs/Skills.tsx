import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { Physics, RigidBody } from '@react-three/rapier';

type Props = {};

const Skills = (props: Props) => {
  return (
    <Canvas>
      <Suspense>
        <Physics gravity={[0, 1, 0]}>
          <RigidBody>
            <mesh>
              <boxGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color="hotpink" />
            </mesh>
          </RigidBody>
        </Physics>
      </Suspense>
    </Canvas>
  );
};

export default Skills;
