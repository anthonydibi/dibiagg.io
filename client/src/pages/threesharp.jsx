import dynamic from "next/dynamic";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Box, Heading, Stack, Text as ChakraText, Flex, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { Text, OrbitControls, Line, PerspectiveCamera } from '@react-three/drei'
import React, { useState, useRef, useEffect } from "react";
import SEO from "../components/seo";
import { WhatIsThreeSharp } from "../components/ThreeSharpStrings";
import { WhyThreeSharp } from "../components/ThreeSharpStrings";
import { HowItWorks } from "../components/ThreeSharpStrings";

//TODO: this code is really ugly, kind of just manically hacked it up but definitely need to clean up components

function Node(props){
  const mesh = useRef();
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [accentColor, setAccentColor] = useState("");
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
      setAccentColor(getComputedStyle(document.body).getPropertyValue('--accent'));
  }, [colorMode]);

  return (
    <>
      <mesh
          {...props}
          ref={mesh}
          scale = {1}
          onClick={props.onClick ? props.onClick : (event) => {
            props.setSelectedNode(props.name);
            props.setBlurb(props.heading, props.text)
          }
          }
          onPointerOver={(event) => setHovered(true)}
          onPointerOut={(event) => setHovered(false)}
          >
          { props.box === true ? <boxGeometry args={[0.5, 0.5, 0.5]}/> : <sphereGeometry args={[0.3, 16, 16]} /> }
          <meshStandardMaterial color={props.selected === props.name ? "green" : accentColor} />
          <NodeText text={props.heading}/>
      </mesh>
    </>
  )
}

function NodeText(props){
  
  const mesh = useRef();
  const camera = useThree(state => state.camera)
  const textColor = useColorModeValue("black", "white")

  useFrame(() => {
    mesh.current.lookAt(camera.position);
  })

  return (
    <Text ref={mesh} scale={[0.2, 0.2, 0.2]} color={textColor} position={[0, 0.4, 0]}>
      {props.text}
    </Text>
  )
}

function Blurb(props){

  return (
    <>
      <Box>
        <Heading size={{base: "lg", md: "xl", lg: "2xl"}} mb={"8"} display={"inline-block"}>
              { props.heading ? props.heading : "THREESHARP" }
        </Heading>
        <ChakraText fontSize={{base: "lg", md: "xl"}} maxW={"500px"}>
          { props.text ? props.text :
          `
          The old showcase I had kind of sucked so I built a new one that
          is more on-theme. I made this using react-three-fiber. You can pan around,
          rotate, and zoom with right click, left click, and mouse wheel, respectively, on desktop.
          If you're on mobile, you can use a two-finger drag, one-finger drag, and pinch. In the future
          I am planning on adding a 3D demonstration at some point once I get a better hang of
          react-three-fiber. Click the nodes on the right to learn more!
          `
          }
        </ChakraText>
      </Box>
    </>
  );
}

function CollapseContext(props){

  const [selectedNode, setSelectedNode] = useState("");
  const [text, setText] = useState("");
  const [heading, setHeading] = useState("");

  const setBlurb = (heading, text) => {
    setHeading(heading);
    setText(text);
  }
  
  return (
  <Stack minW={"100%"} height={"100%"} position={"relative"} direction={{base: "column", md: "row"}}>
      <Flex align={"center"} verticalAlign={"center"} width={{base: "100%", md: "50%"}} height={"100%"} style={{marginLeft: 0}} p={"8"} direction={"column"}>
        <Blurb heading={heading} text={text} />
      </Flex>
      <Box borderLeft={{base: "0px", md: "1px"}} borderTop={{base: "1px", md: "0px"}} width={{base: "100%", md: "50%"}} height={"60vh"}>
        <Canvas>
          <OrbitControls />
          <PerspectiveCamera
            makeDefault
            position={[2.5, 1, 2.5]}
            fov={60}
            zoom={0.9}
          />
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <Node setSelectedNode={setSelectedNode} setBlurb={setBlurb} name={"why-threesharp"} position={[0, 1, 0]} heading={"Why ThreeSharp?"} text={WhyThreeSharp} selected={selectedNode} box/>
          <Node setSelectedNode={setSelectedNode} setBlurb={setBlurb} name={"what-is-threesharp"} position={[1/2.0, -0.5, Math.sqrt(3)/2]} heading={"What is ThreeSharp?"} text={WhatIsThreeSharp} selected={selectedNode} />
          <Node setSelectedNode={setSelectedNode} setBlurb={setBlurb} name={"how-it-works"} position={[-1, -1.5, 0]} heading={"How it works"} text={HowItWorks} selected={selectedNode} />
          <Node onClick={() => window.open("https://youtu.be/JaxGmNPOdZM")} setSelectedNode={setSelectedNode} setBlurb={setBlurb} name={"demo"} position={[1/2.0, -2.5, -Math.sqrt(3)/2]} heading={"Demo on YouTube"} text={HowItWorks} selected={selectedNode} />
          <Line
            points={[[0, 1, 0], [0, -1.5, 0], [-1, -1.5, 0]]}       // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
            color="white"
            lineWidth={5}
            dashed={false}
          />
          <Line
            points={[[0, 1, 0], [0, -0.5, 0], [1/2.0, -0.5, Math.sqrt(3)/2]]}       // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
            color="white"                   // Default
            lineWidth={5}                   // In pixels (default)
                            // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
            dashed={false}                  // Default
          />
          <Line
            points={[[0, 1, 0], [0, -2.5, 0], [1/2.0, -2.5, -Math.sqrt(3)/2]]}       // Array of points, Array<Vector3 | Vector2 | [number, number, number] | [number, number] | number>
            color="white"                   // Default
            lineWidth={5}                   // In pixels (default)
                            // If true, renders a THREE.LineSegments2. Otherwise, renders a THREE.Line2
            dashed={false}                  // Default
          />
        </Canvas>
      </Box>
    </Stack>
  );
}

export default function ThreeSharp() {
  const [reactPlayerWidth, setWidth] = useState(0);
  const [reactPlayerHeight, setHeight] = useState(0);

  React.useEffect(() => {
    setWidth(window.innerWidth * 0.8); //TODO: make this less hacky, have tried so many css tricks though...
    setHeight(window.innerWidth * 0.8 * 0.5625); //this causes 2 rerenders but not really a big deal
  }, []);

  return (
    <>
      <SEO
        description="ThreeSharp - a virtual reality code visualization tool"
        title="ThreeSharp"
        siteTitle="dibiagg.io"
      />
      <CollapseContext />
    </>
  );
}
