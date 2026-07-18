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
  Html,
  OrbitControls,
  OrthographicCamera,
  PerspectiveCamera,
} from '@react-three/drei';
import * as THREE from 'three';
import ExtrudedSvg from './geometry/ExtrudedSvg';
import {
  SiAmazonaws,
  SiBlender,
  SiCss3,
  SiDatadog,
  SiDotnet,
  SiFirebase,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJenkins,
  SiKubernetes,
  SiNewyorktimes,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiReactrouter,
  SiRedux,
  SiTailwindcss,
  SiTerraform,
  SiTypescript,
  SiUnity,
  SiVitest,
} from 'react-icons/si';
import Threejs from '../icons/Threejs';
import Newrelic from '../icons/Newrelic';
import AiSparkle from '../icons/AiSparkle';
import Playwright from '../icons/Playwright';
import Locust from '../icons/Locust';
import { debounce } from '../../utils/debounce';
import View from './helpers/View';
import { useSnapshotStore } from '../../stores/snapshotStore';
import { Box, Flex, Text } from '@chakra-ui/react';

const BALL_GEOMETRY_RADIUS = 18;
const CAMERA_ZOOM = 70;
const TARGET_SETTLED_FOOTPRINT_COVERAGE = 0.68;
const ESTIMATED_SETTLED_PACKING_DENSITY = 0.82;
const MAX_ORB_RADIUS_VIEWPORT_RATIO = 0.16;

export const skillCategories = [
  { id: 'web', label: 'WEB' },
  { id: 'backend', label: 'BACKEND' },
  { id: 'infra', label: 'INFRA' },
  { id: 'testing', label: 'TEST' },
  { id: 'creative', label: 'CREATIVE' },
] as const;

export type SkillCategory = (typeof skillCategories)[number]['id'];

interface SkillDefinition {
  name: string;
  categories: SkillCategory[];
  icon: React.ReactElement;
  desc: React.ReactNode;
}

const getSvgScale = (containerWidth: number, containerHeight: number) => {
  if (containerWidth <= 0 || containerHeight <= 0) return 0;

  const availableArea = containerWidth * containerHeight;
  const targetCircleAreaCoverage =
    TARGET_SETTLED_FOOTPRINT_COVERAGE * ESTIMATED_SETTLED_PACKING_DENSITY;
  const areaPerOrb =
    (availableArea * targetCircleAreaCoverage) / skillIcons.length;
  const areaBasedRadius = Math.sqrt(areaPerOrb / Math.PI);
  const viewportBasedRadius =
    Math.min(containerWidth, containerHeight) * MAX_ORB_RADIUS_VIEWPORT_RATIO;
  const radius = Math.min(areaBasedRadius, viewportBasedRadius);

  return radius / (BALL_GEOMETRY_RADIUS * CAMERA_ZOOM);
};

export const skillIcons: SkillDefinition[] = [
  {
    name: 'React',
    categories: ['web'],
    icon: <SiReact />,
    desc: "I promise I won't litter your codebase with useEffect 🥹👉👈",
  },
  {
    name: 'Node.js',
    categories: ['backend'],
    icon: <SiNodedotjs />,
    desc: 'Node powers my BFFs, microservices, and the server-side pieces behind React Router apps.',
  },
  {
    name: 'React Router',
    categories: ['web'],
    icon: <SiReactrouter width="20px" height="20px" />,
    desc: 'I build and maintain enterprise React Router apps in both Data and Framework mode. It also powers most of my personal frontends. RIP Remix...',
  },
  {
    name: 'TypeScript',
    categories: ['web', 'backend'],
    icon: <SiTypescript />,
    desc: 'I use TypeScript everywhere JavaScript runs, including frontend apps, WebGL renderers, and backend services.',
  },
  {
    name: 'Next.js',
    categories: ['web', 'backend'],
    icon: <SiNextdotjs />,
    desc: 'Used to build this site!',
  },
  {
    name: 'HTML',
    categories: ['web'],
    icon: <SiHtml5 />,
    desc: "Semantic structure and accessibility are part of the functionality and shouldn't be an afterthought!!! (saying it louder for the people in the back)",
  },
  {
    name: 'CSS',
    categories: ['web'],
    icon: <SiCss3 />,
    desc: 'I only have to look at the flexbox cheat sheet sometimes...',
  },
  {
    name: '.NET',
    categories: ['backend'],
    icon: <SiDotnet />,
    desc: 'Blazor lets me build internal tools that .NET-native developers can comfortably maintain.',
  },
  {
    name: 'Tailwind',
    categories: ['web'],
    icon: <SiTailwindcss />,
    desc: 'Tailwind handles styling in most of my personal projects.',
  },
  {
    name: 'Git',
    categories: ['infra'],
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
    categories: ['infra'],
    icon: <SiAmazonaws />,
    desc: 'Most of my cloud work, personal and professional, lives in AWS. I understand at least 50% of the console... I think.',
  },
  {
    name: 'Terraform',
    categories: ['infra'],
    icon: <SiTerraform />,
    desc: 'I like Terraform for keeping infrastructure reproducible and transferrable between use cases.',
  },
  {
    name: 'Vitest',
    categories: ['testing'],
    icon: <SiVitest />,
    desc: 'Vitest helps remind me not to accidentally un-handle that edge case I handled 2 years ago.',
  },
  {
    name: 'Playwright',
    categories: ['web', 'testing'],
    icon: <Playwright />,
    desc: 'Playwright covers my frontend integration tests, catching hydration errors before users do so I can spend the next eight hours debugging them.',
  },
  {
    name: 'Locust',
    categories: ['testing'],
    icon: <Locust />,
    desc: 'Locust helps me find bottlenecks before production traffic does it for me.',
  },
  {
    name: 'New Relic',
    categories: ['infra'],
    icon: <Newrelic width="20px" height="20px" />,
    desc: 'New Relic dashboards and alerts help me keep production apps healthy.',
  },
  {
    name: 'Datadog',
    categories: ['infra'],
    icon: <SiDatadog width="20px" height="20px" />,
    desc: 'Datadog APM and RUM help me trace problems from the backend to the browser. Especially after I get paged at 3 am.',
  },
  {
    name: 'Jenkins',
    categories: ['infra'],
    icon: <SiJenkins width="20px" height="20px" />,
    desc: 'I use Jenkins to automate jobs like load testing in CI/CD pipelines.',
  },
  {
    name: 'Unity',
    categories: ['creative'],
    icon: <SiUnity />,
    desc: 'Unity is my favorite playground for building games and interactive apps.',
  },
  {
    name: 'Blender',
    categories: ['creative'],
    icon: <SiBlender />,
    desc: 'I dabble in some 3D modeling and animation. Not to brag, but I finished the donut tutorial.',
  },
  {
    name: 'PostgreSQL',
    categories: ['backend'],
    icon: <SiPostgresql />,
    desc: 'Postgres powers persistence for this site and most of my personal projects.',
  },
  {
    name: 'Kubernetes',
    categories: ['infra'],
    icon: <SiKubernetes />,
    desc: 'I deploy apps with Helm and make them scale with HPA and KEDA.',
  },
  {
    name: 'AI Engineering',
    categories: ['backend'],
    icon: <AiSparkle />,
    desc: 'I build and ship MCP servers, integrations, and agentic workflows that make life easier for customer support teams.',
  },
];

export interface SkillsProps {
  containerWidth: number;
  containerHeight: number;
  onClick?: (id: string) => void;
  selectedSkill?: string;
  paused?: boolean;
  showTooltips?: boolean;
  activeCategory?: SkillCategory | null;
  tooltipPortalRef?: React.MutableRefObject<HTMLElement | null>;
}

const UPRIGHT_ROTATION = new THREE.Quaternion().setFromEuler(
  new THREE.Euler(-Math.PI, 0, 0),
);
const UPRIGHT_LERP_DURATION_SECONDS = 0.75;
const STILL_LINEAR_SPEED_SQUARED = 0.05 ** 2;
const STILL_ANGULAR_SPEED_SQUARED = 0.05 ** 2;
const VELOCITY_DECAY_DELAY_SECONDS = 3;
const VELOCITY_DECAY_SPEED = 1.5;
const UPWARD_VELOCITY_DECAY_SPEED = 4;
const FORCE_RIGHTING_AFTER_SECONDS = 3.5;
const INITIAL_DOWNWARD_VELOCITY = -3;
const INITIAL_BALL_GAP = 0.1;
const INITIAL_VIEWPORT_CLEARANCE = 0.5;
const POSITION_ATTEMPTS_PER_BALL = 200;
const EMPTY_TOOLTIP_PORTAL_REF: React.MutableRefObject<HTMLElement | null> = {
  current: null,
};

const isStill = (rigidBody: RapierRigidBody) => {
  const linearVelocity = rigidBody.linvel();
  const angularVelocity = rigidBody.angvel();

  return (
    linearVelocity.x ** 2 + linearVelocity.y ** 2 + linearVelocity.z ** 2 <=
      STILL_LINEAR_SPEED_SQUARED &&
    angularVelocity.x ** 2 + angularVelocity.y ** 2 + angularVelocity.z ** 2 <=
      STILL_ANGULAR_SPEED_SQUARED
  );
};

interface SkillRigidBodyProps {
  children: (isVisuallySelected: boolean) => React.ReactNode;
  initialXPosition: number;
  initialXVelocity: number;
  initialYPosition: number;
  bodyIndex: number;
  rigidBodiesRef: React.MutableRefObject<Array<RapierRigidBody | null>>;
  shouldRightBodies: (elapsedTime: number) => boolean;
  skillName: string;
  skillDescription: React.ReactNode;
  skillIcon: React.ReactNode;
  controlSize: number;
  selected: boolean;
  showTooltip: boolean;
  onActivate?: (skillName: string) => void;
  setControlRef: (control: HTMLButtonElement | null) => void;
  onControlFocus: (
    event: React.FocusEvent<HTMLButtonElement>,
    bodyIndex: number,
  ) => void;
  onControlKeyDown: (
    event: React.KeyboardEvent<HTMLButtonElement>,
    bodyIndex: number,
  ) => void;
  tooltipPortalRef: React.MutableRefObject<HTMLElement | null>;
}

interface InternalProps {
  svgScale: number;
  onClick?: (skillName: string) => void;
  selectedSkill?: string;
  showTooltips: boolean;
  activeCategory?: SkillCategory | null;
  tooltipPortalRef: React.MutableRefObject<HTMLElement | null>;
}

const SkillRigidBody: FC<SkillRigidBodyProps> = ({
  children,
  initialXPosition,
  initialXVelocity,
  initialYPosition,
  bodyIndex,
  rigidBodiesRef,
  shouldRightBodies,
  skillName,
  skillDescription,
  skillIcon,
  controlSize,
  selected,
  showTooltip,
  onActivate,
  setControlRef,
  onControlFocus,
  onControlKeyDown,
  tooltipPortalRef,
}) => {
  const rigidBodyRef = useRef<RapierRigidBody | null>(null);
  const visualGroupRef = useRef<THREE.Group | null>(null);
  const bodyRotation = useMemo(() => new THREE.Quaternion(), []);
  const inverseBodyRotation = useMemo(() => new THREE.Quaternion(), []);
  const currentRotation = useMemo(() => new THREE.Quaternion(), []);
  const startingRotation = useMemo(() => new THREE.Quaternion(), []);
  const rightingProgress = useRef(0);
  const hasStartedRighting = useRef(false);
  const [isControlFocused, setIsControlFocused] = useState(false);
  const [isControlHovered, setIsControlHovered] = useState(false);
  const canvas = useThree((state) => state.gl.domElement);
  const tooltipDimensionsRef = useRef({ width: 280, height: 120 });
  const tooltipResizeObserverRef = useRef<ResizeObserver>();
  const projectedPosition = useMemo(() => new THREE.Vector3(), []);
  const isTooltipOpen =
    showTooltip && (selected || isControlFocused || isControlHovered);
  const tooltipId = `skill-tooltip-${bodyIndex}`;
  const setTooltipContentRef = useCallback((element: HTMLDivElement | null) => {
    tooltipResizeObserverRef.current?.disconnect();
    if (!element) return;

    const updateTooltipDimensions = () => {
      const bounds = element.getBoundingClientRect();
      tooltipDimensionsRef.current = {
        width: bounds.width,
        height: bounds.height,
      };
    };

    updateTooltipDimensions();
    tooltipResizeObserverRef.current = new ResizeObserver(
      updateTooltipDimensions,
    );
    tooltipResizeObserverRef.current.observe(element);
  }, []);
  const calculateTooltipPosition = useCallback(
    (
      object: THREE.Object3D,
      camera: THREE.Camera,
      size: { width: number; height: number },
    ) => {
      projectedPosition
        .setFromMatrixPosition(object.matrixWorld)
        .project(camera);

      const canvasBounds = canvas.getBoundingClientRect();
      const orbX =
        canvasBounds.left +
        projectedPosition.x * (size.width / 2) +
        size.width / 2;
      const orbY =
        canvasBounds.top -
        projectedPosition.y * (size.height / 2) +
        size.height / 2;
      const { width: tooltipWidth, height: tooltipHeight } =
        tooltipDimensionsRef.current;
      const edgeMargin = 12;
      const orbGap = controlSize / 2 + 8;
      const halfTooltipWidth = tooltipWidth / 2;
      const halfTooltipHeight = tooltipHeight / 2;
      const minimumX = edgeMargin + halfTooltipWidth;
      const maximumX = window.innerWidth - edgeMargin - halfTooltipWidth;
      let tooltipX = Math.min(Math.max(orbX, minimumX), maximumX);
      let tooltipY = orbY - orbGap - halfTooltipHeight;

      if (tooltipY - halfTooltipHeight < edgeMargin) {
        tooltipY = orbY + orbGap + halfTooltipHeight;
      }

      tooltipY = Math.min(
        Math.max(tooltipY, edgeMargin + halfTooltipHeight),
        window.innerHeight - edgeMargin - halfTooltipHeight,
      );

      if (maximumX < minimumX) tooltipX = window.innerWidth / 2;

      return [tooltipX, tooltipY] as [number, number];
    },
    [canvas, controlSize, projectedPosition],
  );

  useEffect(() => () => tooltipResizeObserverRef.current?.disconnect(), []);
  const setRigidBodyRef = useCallback(
    (rigidBody: RapierRigidBody | null) => {
      rigidBodyRef.current = rigidBody;
      rigidBodiesRef.current[bodyIndex] = rigidBody;
    },
    [bodyIndex, rigidBodiesRef],
  );

  useFrame(({ clock }, delta) => {
    const rigidBody = rigidBodyRef.current;

    if (!rigidBody) return;

    const velocity = rigidBody.linvel();
    const shouldRight = shouldRightBodies(clock.elapsedTime);
    const isSettling =
      clock.elapsedTime >= VELOCITY_DECAY_DELAY_SECONDS && !shouldRight;

    if (isSettling) {
      const upwardDecay = Math.exp(-UPWARD_VELOCITY_DECAY_SPEED * delta);
      const settlingDecay = Math.exp(-VELOCITY_DECAY_SPEED * delta);

      rigidBody.setLinvel(
        {
          x: velocity.x * settlingDecay,
          y: velocity.y > 0 ? velocity.y * upwardDecay : velocity.y,
          z: velocity.z,
        },
        false,
      );
    }

    if (isSettling) {
      const angularVelocity = rigidBody.angvel();
      const decay = Math.exp(-VELOCITY_DECAY_SPEED * delta);

      rigidBody.setAngvel(
        {
          x: angularVelocity.x * decay,
          y: angularVelocity.y * decay,
          z: angularVelocity.z * decay,
        },
        false,
      );
    }

    if (!shouldRight || !visualGroupRef.current) return;

    const rotation = rigidBody.rotation();
    bodyRotation.set(rotation.x, rotation.y, rotation.z, rotation.w);

    if (!hasStartedRighting.current) {
      startingRotation
        .copy(bodyRotation)
        .multiply(visualGroupRef.current.quaternion);
      hasStartedRighting.current = true;
    }

    rightingProgress.current = Math.min(
      1,
      rightingProgress.current + delta / UPRIGHT_LERP_DURATION_SECONDS,
    );

    const easedProgress = 1 - (1 - rightingProgress.current) ** 3;
    currentRotation.slerpQuaternions(
      startingRotation,
      UPRIGHT_ROTATION,
      easedProgress,
    );
    inverseBodyRotation.copy(bodyRotation).invert();
    visualGroupRef.current.quaternion.multiplyQuaternions(
      inverseBodyRotation,
      currentRotation,
    );
  });

  return (
    <RigidBody
      ref={setRigidBodyRef}
      restitution={0}
      friction={1}
      rotation={[-Math.PI, 0, 0]}
      linearVelocity={[initialXVelocity, INITIAL_DOWNWARD_VELOCITY, 0]}
      colliders="ball"
      enabledTranslations={[true, true, false]}
      position={[initialXPosition, initialYPosition, 0]}
    >
      <group ref={visualGroupRef}>
        {children(selected || isControlFocused || isControlHovered)}
      </group>
      <Html center style={{ pointerEvents: 'none' }} zIndexRange={[1, 1]}>
        <button
          ref={setControlRef}
          type="button"
          className="skill-orb-control"
          style={{ width: controlSize, height: controlSize }}
          aria-label={`Show details for ${skillName}`}
          aria-describedby={isTooltipOpen ? tooltipId : undefined}
          aria-pressed={selected}
          onPointerEnter={(event) => {
            if (!showTooltip || event.pointerType === 'touch') return;
            setIsControlHovered(true);
          }}
          onPointerLeave={() => {
            setIsControlHovered(false);
          }}
          onFocus={(event) => {
            setIsControlFocused(true);
            onControlFocus(event, bodyIndex);
          }}
          onBlur={() => {
            setIsControlFocused(false);
          }}
          onKeyDown={(event) => onControlKeyDown(event, bodyIndex)}
          onClick={() => onActivate?.(skillName)}
        />
      </Html>
      {isTooltipOpen && tooltipPortalRef.current && (
        <Html
          center
          portal={tooltipPortalRef as React.MutableRefObject<HTMLElement>}
          calculatePosition={calculateTooltipPosition}
          style={{ pointerEvents: 'none' }}
          zIndexRange={[10000, 10000]}
        >
          <Box
            ref={setTooltipContentRef}
            id={tooltipId}
            role="tooltip"
            w="280px"
            maxW="calc(100vw - 24px)"
            bg="var(--off)"
            border="2px solid var(--accent)"
            borderRadius="0"
            p=".625rem"
          >
            <Flex alignItems="center" gap="6px" mb="6px">
              <Box fontSize="20px" color="var(--darklight)">
                {skillIcon}
              </Box>
              <Text color="var(--darklight)">{skillName}</Text>
            </Flex>
            <Text color="GrayText">{skillDescription}</Text>
          </Box>
        </Html>
      )}
    </RigidBody>
  );
};

const Internal: FC<InternalProps> = ({
  svgScale,
  onClick,
  selectedSkill,
  showTooltips,
  activeCategory,
  tooltipPortalRef,
}) => {
  const { width, height } = useThree((state) => state.viewport);
  // camera coords
  const camera = useThree((state) => state.camera);
  const rigidBodiesRef = useRef<Array<RapierRigidBody | null>>([]);
  const controlElementsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const rightingStartedRef = useRef(false);
  const isTabbingRef = useRef(false);
  const tabDirectionRef = useRef<1 | -1>(1);

  useEffect(() => {
    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      isTabbingRef.current = true;
      tabDirectionRef.current = event.shiftKey ? -1 : 1;
    };
    const handleDocumentPointerDown = () => {
      isTabbingRef.current = false;
    };

    document.addEventListener('keydown', handleDocumentKeyDown, true);
    document.addEventListener('pointerdown', handleDocumentPointerDown, true);

    return () => {
      document.removeEventListener('keydown', handleDocumentKeyDown, true);
      document.removeEventListener(
        'pointerdown',
        handleDocumentPointerDown,
        true,
      );
    };
  }, []);

  const getHeightOrderedBodyIndices = useCallback(
    () =>
      skillIcons
        .map((_, index) => ({
          index,
          y: rigidBodiesRef.current[index]?.translation().y,
        }))
        .filter(
          (body): body is { index: number; y: number } => body.y !== undefined,
        )
        .sort((first, second) => second.y - first.y)
        .map((body) => body.index),
    [],
  );

  const focusOutsideSkills = useCallback(
    (control: HTMLButtonElement, backwards: boolean) => {
      const focusableElements = Array.from(
        document.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter(
        (element) =>
          !element.classList.contains('skill-orb-control') &&
          element.getClientRects().length > 0,
      );
      const candidates = backwards
        ? focusableElements.slice().reverse()
        : focusableElements;
      const relation = backwards
        ? Node.DOCUMENT_POSITION_PRECEDING
        : Node.DOCUMENT_POSITION_FOLLOWING;
      const nextElement = candidates.find(
        (element) => control.compareDocumentPosition(element) & relation,
      );

      nextElement?.focus();
    },
    [],
  );

  const handleControlFocus = useCallback(
    (event: React.FocusEvent<HTMLButtonElement>, bodyIndex: number) => {
      if (
        !isTabbingRef.current ||
        (event.relatedTarget instanceof HTMLElement &&
          event.relatedTarget.classList.contains('skill-orb-control'))
      ) {
        return;
      }

      const heightOrder = getHeightOrderedBodyIndices();
      const targetIndex =
        tabDirectionRef.current === 1
          ? heightOrder[0]
          : heightOrder[heightOrder.length - 1];

      if (targetIndex !== undefined && targetIndex !== bodyIndex) {
        controlElementsRef.current[targetIndex]?.focus();
      }
      isTabbingRef.current = false;
    },
    [getHeightOrderedBodyIndices],
  );

  const handleControlKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, bodyIndex: number) => {
      if (event.key !== 'Tab') return;

      const heightOrder = getHeightOrderedBodyIndices();
      const currentOrderIndex = heightOrder.indexOf(bodyIndex);
      const nextOrderIndex = currentOrderIndex + (event.shiftKey ? -1 : 1);
      const nextBodyIndex = heightOrder[nextOrderIndex];

      event.preventDefault();
      if (nextBodyIndex !== undefined) {
        controlElementsRef.current[nextBodyIndex]?.focus();
      } else {
        focusOutsideSkills(event.currentTarget, event.shiftKey);
      }
      isTabbingRef.current = false;
    },
    [focusOutsideSkills, getHeightOrderedBodyIndices],
  );

  const shouldRightBodies = useCallback((elapsedTime: number) => {
    if (rightingStartedRef.current) return true;

    rightingStartedRef.current =
      elapsedTime >= FORCE_RIGHTING_AFTER_SECONDS ||
      skillIcons.every((_, index) => {
        const rigidBody = rigidBodiesRef.current[index];
        return rigidBody ? isStill(rigidBody) : false;
      });

    return rightingStartedRef.current;
  }, []);

  useLayoutEffect(() => {
    rightingStartedRef.current = false;
  }, [svgScale]);

  const initialPositions = useMemo(() => {
    const radius = BALL_GEOMETRY_RADIUS * svgScale;
    const minimumDistance = radius * 2 + INITIAL_BALL_GAP;
    const usableWidth = Math.max(0, width - radius * 2);
    const minimumX = -usableWidth / 2;
    const maximumX = usableWidth / 2;
    const estimatedColumns = Math.max(
      1,
      Math.floor(usableWidth / minimumDistance) + 1,
    );
    const estimatedRows = Math.ceil(skillIcons.length / estimatedColumns);
    const spawnBandHeight = estimatedRows * minimumDistance;
    const baseY = height / 2 + radius + INITIAL_VIEWPORT_CLEARANCE;
    const positions: Array<{ x: number; y: number }> = [];

    skillIcons.forEach(() => {
      let position: { x: number; y: number } | undefined;

      for (let attempt = 0; attempt < POSITION_ATTEMPTS_PER_BALL; attempt++) {
        const candidate = {
          x: minimumX + Math.random() * (maximumX - minimumX),
          y: baseY + Math.random() * spawnBandHeight,
        };
        const doesNotOverlap = positions.every(
          (otherPosition) =>
            (candidate.x - otherPosition.x) ** 2 +
              (candidate.y - otherPosition.y) ** 2 >=
            minimumDistance ** 2,
        );

        if (doesNotOverlap) {
          position = candidate;
          break;
        }
      }

      if (!position) {
        const highestY = positions.reduce(
          (highest, existingPosition) => Math.max(highest, existingPosition.y),
          baseY - minimumDistance,
        );

        position = {
          x: minimumX + Math.random() * (maximumX - minimumX),
          y: highestY + minimumDistance,
        };
      }

      positions.push(position);
    });

    return positions;
  }, [height, svgScale, width]);

  const randomXVelocities = useMemo(() => {
    return skillIcons.map(
      (_) => (Math.random() * 2 + 1) * (Math.random() > 0.5 ? 1 : -1),
    );
  }, []);

  return (
    <>
      {skillIcons.map((skill, index) => {
        return (
          <SkillRigidBody
            key={`${svgScale.toString()}-${index}`}
            bodyIndex={index}
            rigidBodiesRef={rigidBodiesRef}
            shouldRightBodies={shouldRightBodies}
            initialXPosition={initialPositions[index]!.x}
            initialXVelocity={randomXVelocities[index]!}
            initialYPosition={initialPositions[index]!.y}
            skillName={skill.name}
            skillDescription={skill.desc}
            skillIcon={skill.icon}
            controlSize={Math.max(
              44,
              BALL_GEOMETRY_RADIUS * 2 * svgScale * CAMERA_ZOOM,
            )}
            selected={selectedSkill === skill.name}
            showTooltip={showTooltips}
            onActivate={onClick}
            setControlRef={(control) => {
              controlElementsRef.current[index] = control;
            }}
            onControlFocus={handleControlFocus}
            onControlKeyDown={handleControlKeyDown}
            tooltipPortalRef={tooltipPortalRef}
          >
            {(isVisuallySelected) => (
              <ExtrudedSvg
                scale={svgScale}
                svg={skill.icon}
                id={skill.name}
                onClick={onClick}
                selected={isVisuallySelected}
                dimmed={
                  Boolean(activeCategory) &&
                  !skill.categories.includes(activeCategory!)
                }
              />
            )}
          </SkillRigidBody>
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
  showTooltips = false,
  activeCategory,
  tooltipPortalRef = EMPTY_TOOLTIP_PORTAL_REF,
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
        <OrthographicCamera
          makeDefault
          position={[0, 0, 10]}
          zoom={CAMERA_ZOOM}
        />
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <Physics paused={paused} gravity={[0, -6, 0]}>
          <Internal
            svgScale={svgScale}
            onClick={onClick}
            selectedSkill={selectedSkill}
            showTooltips={showTooltips}
            activeCategory={activeCategory}
            tooltipPortalRef={tooltipPortalRef}
          />
        </Physics>
      </Suspense>
    </>
  );
};

const Wrapped: FC<SkillsProps> = ({
  onClick,
  paused,
  selectedSkill,
  showTooltips,
  activeCategory,
}) => {
  //get width and height of View
  const viewRef = useRef<HTMLElement | null>(null);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [tooltipPortalElement, setTooltipPortalElement] =
    useState<HTMLElement | null>(null);
  const tooltipPortalRef = useMemo(
    () => ({ current: tooltipPortalElement }),
    [tooltipPortalElement],
  );

  useEffect(() => {
    const portalElement = document.createElement('div');
    portalElement.className = 'skill-tooltip-root';
    document.body.appendChild(portalElement);
    setTooltipPortalElement(portalElement);

    return () => portalElement.remove();
  }, []);
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
          showTooltips={showTooltips}
          activeCategory={activeCategory}
          tooltipPortalRef={tooltipPortalRef}
        />
      </Canvas>
    </>
  );
};

export default Wrapped;
