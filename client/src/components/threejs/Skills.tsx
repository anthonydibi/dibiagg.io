import { useThree } from '@react-three/fiber';
import React, { Suspense } from 'react';
import { Physics } from '@react-three/rapier';

type Props = {};

const Skills = (props: Props) => {
  return (
    <Suspense>
      <Physics
        gravity={[0, 1, 0]}
        interpolation={false}
        colliders={false}
      ></Physics>
    </Suspense>
  );
};

export default Skills;
