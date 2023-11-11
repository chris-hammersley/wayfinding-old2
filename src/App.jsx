import { Canvas, useFrame, useLoader, extend } from "@react-three/fiber";
import { Gltf, ScrollControls, useScroll, useAspect, useVideoTexture, useTexture, useGLTF, useAnimations, Billboard, Text, Html } from "@react-three/drei";
import { getProject, val } from "@theatre/core";
import flyThroughState from "./flyThruState.json"; // import this after creating the animation for production
import { editable as e } from "@theatre/r3f"; // remove this before deploying to production
import { React, useState, useRef, useEffect, Suspense } from 'react'; //used for markqer function
import * as THREE from 'three';
import { SheetProvider, PerspectiveCamera, useCurrentSheet } from "@theatre/r3f";
import { Model } from './Model';
import { Model_Girl } from './Model_Girl';
//import Portal from './Portal';
import { ReactDOM, createPortal } from 'react-dom';
import ModalContent from './ModalContent';
import { Modal, ReactModal } from 'react-modal';

export default function App() {
//  const sheet = getProject("Fly Through").sheet("Scene"); // used when creating keyframes/json file
  const sheet = getProject("Fly Through", {state: flyThroughState}).sheet("Scene"); // used after creating json keyframe file - needs to match the import at top of file

  function Portal() {
    const [showModal, setShowModal] = useState(false);
  
    return (
      <>
      <Html>
      {showModal && createPortal(
          <ModalContent onClose={() => setShowModal(false)} />,
          document.getElementById('portal')
        )}
      </Html>
      </>
    );
  }

  return (
    <Canvas gl={{ preserveDrawingBuffer: true }}>
      <ScrollControls pages={5}>
        <SheetProvider sheet={sheet}>
          <Scene />
          <Model position={[-3.4, 0.21, -4]} onClick={Portal} />
          <Model_Girl position={[-3.63, 1.47, .15]} rotation={[ 0, .5, 0]} scale={.75} onClick={objectClickHandler} />
        </SheetProvider>
      </ScrollControls>
    </Canvas>
  );
}

// 3D Background Scene with 3D Prompt Objects
function Scene() {
  const sheet = useCurrentSheet();
  const scroll = useScroll();
  const group = useRef();
  const texture = useLoader(THREE.TextureLoader, 'sharon-prompt1-response.png');
  const videoTexture = useVideoTexture('prompt3.mp4');
  const vTexture2 = useVideoTexture('yanina-dancing.mp4');
  const size = useAspect(16, 9);
  const box = useRef();
  const [open, setModalOpen] = useState(false);
  //const billboardTexture = useTexture('https://merylmurman.me');

  // our callback will run on every animation frame
  useFrame(() => {
    // the length of our sequence
    const sequenceLength = val(sheet.sequence.pointer.length);
    // update the "position" of the playhead in the sequence, as a fraction of its whole length
    sheet.sequence.position = scroll.offset * sequenceLength;
  });

  // For 3D Rotating Cup - we use the useFrame hook here to rotate on the x-axis.
  useFrame(() => {
    // rotating the group instead of the mesh
    group.current.rotation.y += Math.PI / 200
    });

  const bgColor = "#84a4f4";

  return (
    <>
      /* 3D Global Scene Elements */
      <color attach="background" args={[bgColor]} />
      <fog attach="fog" color={bgColor} near={-2} far={10} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-5, 5, -5]} intensity={1.5} />
      /* 3D Background */
      <Gltf src="/better-river.glb" castShadow receiveShadow />

      // 3D Prompts
      // First Image - Left
      <e.mesh theatreKey="Prompt1" position={[-4.19, 1, 2.49]} rotation={[0, 1.09, 0]} onClick={objectClickHandler}>
      <boxGeometry args={[1, 2, .005]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
      </e.mesh>

      // River Video Sideways - Right
      <e.mesh theatreKey="Prompt2" position={[3.19, 1, 0.4]} rotation={[0,1.95,0]} onClick={objectClickHandler2} scale={size}>
        <boxGeometry />
        <meshBasicMaterial attach="material" map={videoTexture} toneMapped={false} />
      </e.mesh>

      // Second Image - Left
      <e.mesh ref={box} theatreKey="Prompt3" position={[3.63, 1, -.5]} rotation={[0,1.24,0]} onClick={objectClickHandler3}>
        <boxGeometry args={[1, 2, .5]} />
        <meshBasicMaterial attach="material" map={vTexture2} toneMapped={false} />
      </e.mesh>

      // 3D Spinning Object - Right
      <group ref={group} dispose={null} position={[3.2, 0.83, -8.5]} height={20}>
         <Gltf src="/tea-cup.glb" castShadow receiveShadow onClick={objectClickHandler4} />
      </group>

      // 3D camera
      <PerspectiveCamera
        theatreKey="Camera"
        makeDefault
        position={[0, 0, 0]}
        fov={90}
        near={0.1}
        far={70}
      />
    </>
  );
}

// Default click handler for our three.js objects
function objectClickHandler() {
  window.open('../prompt1.html', 'modal');
}
function objectClickHandler2() {
  window.open('../prompt1.html', 'modal');
}
function objectClickHandler3() {
  window.open('../prompt1.html', 'modal');
}
function objectClickHandler4() {
  window.open('../prompt1.html', 'modal');
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.onload = function() {
  App();
}