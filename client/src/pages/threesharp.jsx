import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  Box,
  Heading,
  Stack,
  Text as ChakraText,
  Flex,
  useColorMode,
  useColorModeValue,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  Button,
  Center as ChakraCenter,
} from '@chakra-ui/react'
import {
  Text,
  OrbitControls,
  Line,
  PerspectiveCamera,
  Center,
} from '@react-three/drei'
import React, { useState, useRef, useEffect } from 'react'
import SEO from '../components/seo'
import { WhatIsThreeSharp } from '../components/ThreeSharpStrings'
import { WhyThreeSharp } from '../components/ThreeSharpStrings'
import { HowItWorks } from '../components/ThreeSharpStrings'
import UnderlinedHeading from '../components/UnderlinedHeading'

//TODO: this code is really ugly, kind of just manically hacked it up but definitely need to clean up components

function Node(props) {
  const mesh = useRef()
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)
  const [accentColor, setAccentColor] = useState('')
  const { colorMode, toggleColorMode } = useColorMode()

  useEffect(() => {
    setAccentColor(getComputedStyle(document.body).getPropertyValue('--accent'))
  }, [colorMode])

  return (
    <>
      <mesh
        {...props}
        ref={mesh}
        scale={1}
        onClick={
          props.onClick
            ? props.onClick
            : (event) => {
                props.setSelectedNode(props.name)
                props.setBlurb(props.heading, props.text)
              }
        }
        onPointerOver={(event) => setHovered(true)}
        onPointerOut={(event) => setHovered(false)}
      >
        {props.box === true ? (
          <boxGeometry args={[0.5, 0.5, 0.5]} />
        ) : (
          <sphereGeometry args={[0.3, 16, 16]} />
        )}
        <meshStandardMaterial
          color={props.selected === props.name ? 'green' : accentColor}
        />
        <NodeText text={props.heading} />
      </mesh>
    </>
  )
}

function NodeText(props) {
  const mesh = useRef()
  const camera = useThree((state) => state.camera)
  const textColor = useColorModeValue('black', 'white')

  useFrame(() => {
    mesh.current.lookAt(camera.position)
  })

  return (
    <Text
      ref={mesh}
      scale={[0.2, 0.2, 0.2]}
      color={textColor}
      position={[0, 0.6, 0]}
    >
      {props.text}
    </Text>
  )
}

function Blurb(props) {
  const isMobile = useBreakpointValue({ base: true, md: false })

  return (
    <>
      {!isMobile ? (
        <>
          <Heading size={['sm', 'md', 'lg', 'xl']} mb={'8'} whiteSpace='nowrap'>
            {props.heading ? props.heading : 'THREESHARP'}
          </Heading>
          <ChakraText
            textAlign={'left'}
            fontSize={{ base: 'lg', md: 'xl' }}
            maxW={'60ch'}
          >
            {props.text
              ? props.text
              : `The old showcase I had kind of sucked so I built a new one that
          is more on-theme. I made this using react-three-fiber. You can pan around,
          rotate, and zoom with right click, left click, and mouse wheel, respectively, on desktop.
          If you're on mobile, you can use a two-finger drag, one-finger drag, and pinch. In the future
          I am planning on adding a 3D demonstration at some point once I get a better hang of
          react-three-fiber. Click the nodes on the right to learn more!
          `}
          </ChakraText>{' '}
        </>
      ) : (
        <ThreeSharpModal
          isOpen={props.isOpen}
          onClose={props.onClose}
          text={props.text}
          heading={props.heading}
        />
      )}
    </>
  )
}

function ThreeSharpModal(props) {
  return (
    <>
      <Modal
        onClose={props.onClose}
        isOpen={props.isOpen}
        scrollBehavior={'inside'}
        size={'lg'}
        isCentered
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{props.heading}</ModalHeader>
          <ModalCloseButton variant={'interact'} />
          <ModalBody>{props.text}</ModalBody>
          <ModalFooter>
            <Button
              onClick={props.onClose}
              variant={'interact'}
              rounded={'none'}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

function ThreeSharpShowcase(props) {
  const [selectedNode, setSelectedNode] = useState('')
  const [text, setText] = useState('')
  const [heading, setHeading] = useState('')
  const { isOpen, onOpen, onClose } = useDisclosure()

  const setBlurb = (heading, text) => {
    setHeading(heading)
    setText(text)
    onOpen()
  }

  return (
    <Stack direction={['column', null, null, 'row']} height={['initial', null, null, '80vh']}>
      <Flex
        display={{ base: 'none', md: 'flex' }}
        width={[ '100%', null, null, '50%']}
        height={['500px', null, null, '100%']}
        align={'center'}
        style={{ marginLeft: 0, marginTop: 0 }}
        p={{ base: '0', md: '10' }}
        direction={'column'}
        justifyContent={'center'}
        alignItems='end'
      >
        <Box>
          <Blurb
            isOpen={isOpen}
            onClose={onClose}
            heading={heading}
            text={text}
          />
        </Box>
      </Flex>
      <Flex alignItems='stretch' width={[ '100%', null, null, '50%']} height={['700px', null, null, 'auto']}>
        <Canvas>
          <OrbitControls />
          <PerspectiveCamera
            makeDefault
            position={[4, 2, -1]}
            fov={60}
            zoom={0.9}
          />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Center>
            <Node
              setSelectedNode={setSelectedNode}
              setBlurb={setBlurb}
              name={'why-threesharp'}
              position={[0, 1, 0]}
              heading={'Why ThreeSharp?'}
              text={WhyThreeSharp}
              selected={selectedNode}
              box
            />
            <Node
              setSelectedNode={setSelectedNode}
              setBlurb={setBlurb}
              name={'what-is-threesharp'}
              position={[1 / 2.0, -0.5, Math.sqrt(3) / 2]}
              heading={'What is ThreeSharp?'}
              text={WhatIsThreeSharp}
              selected={selectedNode}
            />
            <Node
              setSelectedNode={setSelectedNode}
              setBlurb={setBlurb}
              name={'how-it-works'}
              position={[-1, -1.5, 0]}
              heading={'How it works'}
              text={HowItWorks}
              selected={selectedNode}
            />
            <Node
              onClick={() => {
                if (typeof window !== undefined)
                  window.open('https://youtu.be/JaxGmNPOdZM')
              }}
              setSelectedNode={setSelectedNode}
              setBlurb={setBlurb}
              name={'demo'}
              position={[1 / 2.0, -2.5, -Math.sqrt(3) / 2]}
              heading={'Demo on YouTube'}
              text={HowItWorks}
              selected={selectedNode}
            />
            <Line
              points={[
                [0, 1, 0],
                [0, -1.5, 0],
                [-1, -1.5, 0],
              ]} // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
              color="white"
              lineWidth={5}
              dashed={false}
            />
            <Line
              points={[
                [0, 1, 0],
                [0, -0.5, 0],
                [1 / 2.0, -0.5, Math.sqrt(3) / 2],
              ]} // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
              color="white" // Default
              lineWidth={5} // In pixels (default)
              // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
              dashed={false} // Default
            />
            <Line
              points={[
                [0, 1, 0],
                [0, -2.5, 0],
                [1 / 2.0, -2.5, -Math.sqrt(3) / 2],
              ]} // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
              color="white" // Default
              lineWidth={5} // In pixels (default)
              // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
              dashed={false} // Default
            />
          </Center>
        </Canvas>
      </Flex>
    </Stack>
  )
}

export default function ThreeSharp() {
  return (
    <>
      <SEO
        description="ThreeSharp - a virtual reality code visualization tool"
        title="ThreeSharp"
        siteTitle="dibiagg.io"
      />
      <ThreeSharpShowcase />
    </>
  )
}
