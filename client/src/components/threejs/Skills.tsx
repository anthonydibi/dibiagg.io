import { Canvas, useFrame, useThree } from '@react-three/fiber';
import React, {
  FC,
  memo,
  Suspense,
  useCallback,
  useEffect,
  useImperativeHandle,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ConvexHullCollider,
  CuboidCollider,
  MeshCollider,
  Physics,
  RapierRigidBody,
  RigidBody,
  useRapier,
} from '@react-three/rapier';
import {
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from '@react-three/drei';
import ExtrudedSvg from './geometry/ExtrudedSvg';
import {
  SiAmazonaws,
  SiBlender,
  SiCss3,
  SiDatadog,
  SiFirebase,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiNewyorktimes,
  SiNextDotJs,
  SiNodeDotJs,
  SiPostgresql,
  SiReact,
  SiRedux,
  SiTailwindcss,
  SiTypescript,
  SiUnity,
} from 'react-icons/si';
import Remix from '../icons/Remix';
import Threejs from '../icons/Threejs';
import Blazor from '../icons/Blazor';
import Newrelic from '../icons/Newrelic';
import { debounce } from '../../utils/debounce';
import View from './helpers/View';
import { useSnapshotStore } from '../../stores/snapshotStore';

const getSvgScale = (containerWidth: number, containerHeight: number) => {
  const area = containerWidth * containerHeight;
  return area / (skillIcons.length * 250000);
};

export const skillIcons = [
  {
    name: 'React',
    icon: <SiReact />,
    desc: "I promise I won't litter your codebase with useEffect 🥹👉👈",
  },
  {
    name: 'Node.js',
    icon: <SiNodeDotJs />,
    desc: 'I mainly use Node via Express for Remix.',
  },
  {
    name: 'Remix',
    icon: <Remix width="20px" height="20px" />,
    desc: "I've delivered production Remix code to hundreds of thousands of users.",
  },
  {
    name: 'TypeScript',
    icon: <SiTypescript />,
    desc: "It's JavaScript... but with types.",
  },
  {
    name: 'JavaScript',
    icon: <SiJavascript />,
    desc: 'I use JavaScript for everything from WebGL, to servers, to the browser.',
  },
  {
    name: 'Next.js',
    icon: <SiNextDotJs />,
    desc: 'Used to build this site! (but Remix is better)',
  },
  {
    name: 'HTML',
    icon: <SiHtml5 />,
    desc: 'Accessibility and semantic HTML are key.',
  },
  {
    name: 'CSS',
    icon: <SiCss3 />,
    desc: "I'm so good at CSS that I only have to look at the flexbox cheat sheet sometimes.",
  },
  {
    name: 'Redux',
    icon: <SiRedux />,
    desc: "I've written Redux for a large legacy codebase with a complex state structure.",
  },
  {
    name: 'Blazor',
    icon: <Blazor width="20px" height="20px" />,
    desc: 'Blazor is my secret love. I have used it for developing internal tooling and wish I could use it for everything.',
  },
  {
    name: 'Tailwind',
    icon: <SiTailwindcss />,
    desc: 'I have mainly used Tailwind in combination with Blazor for building an internal tooling component library.',
  },
  {
    name: 'Git',
    icon: <SiGit />,
    desc: (
      <>
        My favorite command is{' '}
        <pre style={{ display: 'inline-block' }}>git bisect</pre>. Try it, it
        will change your life.
      </>
    ),
  },
  {
    name: 'AWS',
    icon: <SiAmazonaws />,
    desc: 'I know how to use at least 20% of the AWS console.',
  },
  {
    name: 'Firebase',
    icon: <SiFirebase />,
    desc: "I'm mainly familiar with Firebase Remote Config and Auth and have set them up in both personal and enterprise settings.",
  },
  {
    name: 'New Relic',
    icon: <Newrelic width="20px" height="20px" />,
    desc: "I've built many New Relic dashboards and alerts to monitor the health of production apps.",
  },
  {
    name: 'Unity',
    icon: <SiUnity />,
    desc: "I've built a few XR apps in Unity.",
  },
  {
    name: 'Blender',
    icon: <SiBlender />,
    desc: 'I dabble in some 3D modeling and animation. Not to brag, but I completed the donut tutorial.',
  },
  {
    name: 'PostgreSQL',
    icon: <SiPostgresql />,
    desc: "If you don't like the elephant then you are evil.",
  },
];

export interface SkillsProps {
  containerWidth: number;
  containerHeight: number;
  onClick?: (id: string) => void;
  selectedSkill?: string;
  paused?: boolean;
}

const Internal = ({ svgScale, onClick, selectedSkill }) => {
  const { width, height } = useThree((state) => state.viewport);
  // camera coords
  const camera = useThree((state) => state.camera);

  const randomXPositions = useMemo(() => {
    return skillIcons.map((_) => Math.random() * width - width / 2);
  }, []);

  const randomXVelocities = useMemo(() => {
    return skillIcons.map(
      (_) => (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
    );
  }, []);

  return (
    <>
      {skillIcons.map((skill, index) => {
        return (
          <RigidBody
            key={`${svgScale.toString()}-${index}`}
            restitution={0}
            rotation={[-Math.PI, 0, 0]}
            linearVelocity={[randomXVelocities[index]!, 0, 0]}
            colliders="ball"
            enabledTranslations={[true, true, false]}
            enabledRotations={[false, true, true]}
            position={[randomXPositions[index]!, height / 2 + 2 + index * 1, 0]}
          >
            <ExtrudedSvg
              scale={svgScale}
              svg={skill.icon}
              id={skill.name}
              onClick={onClick}
              selected={selectedSkill === skill.name}
            />
          </RigidBody>
        );
      })}
      <RigidBody gravityScale={0} key="bounds">
        <CuboidCollider
          args={[100, 10, 100]}
          position={[camera.position.x, -height / 2 - 10, camera.position.z]}
        />
        <CuboidCollider
          args={[10, 100, 100]}
          position={[-width / 2 - 10, camera.position.y, camera.position.z]}
        />
        <CuboidCollider
          args={[10, 100, 100]}
          position={[width / 2 + 10, camera.position.y, camera.position.z]}
        />
      </RigidBody>
    </>
  );
};

const Skills: FC<SkillsProps> = ({
  onClick,
  containerWidth,
  containerHeight,
  paused,
  selectedSkill,
}) => {
  const [svgScale, setSvgScale] = useState(
    getSvgScale(containerWidth, containerHeight),
  );

  const debouncedSetSvgScale = useCallback(
    debounce(
      (containerWidth: number, containerHeight: number) => {
        setSvgScale(getSvgScale(containerWidth, containerHeight));
      },
      250,
      false,
    ),
    [],
  );

  useLayoutEffect(() => {
    debouncedSetSvgScale(containerWidth, containerHeight);
  }, [containerWidth, containerHeight]);

  // TODO: get ortho cam to work so that I don't have to do weird positioning math
  return (
    <>
      {/* lighting */}
      <Suspense>
        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={70} />
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <Physics paused={paused} gravity={[0, -6, 0]}>
          <Internal
            svgScale={svgScale}
            onClick={onClick}
            selectedSkill={selectedSkill}
          />
        </Physics>
      </Suspense>
    </>
  );
};

const Wrapped: FC<SkillsProps> = ({ onClick, paused, selectedSkill }) => {
  //get width and height of View
  const viewRef = useRef<HTMLElement | null>(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  //use resize observer to update width and height
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setContainerDimensions({ width, height });
      }
    });
    resizeObserver.observe(view);

    return () => resizeObserver.disconnect();
  }, [viewRef]);

  return (
    <>
      <Canvas
        ref={viewRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      >
        <Skills
          onClick={onClick}
          containerWidth={containerDimensions.width}
          containerHeight={containerDimensions.height}
          paused={paused}
          selectedSkill={selectedSkill}
        />
      </Canvas>
    </>
  );
};

export default Wrapped;
