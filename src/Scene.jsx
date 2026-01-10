import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, KeyboardControls } from "@react-three/drei";
import * as THREE from "three";
// import { Physics } from "@react-three/rapier";
// import { Physics } from "@react-three/cannon";

import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { useProgress } from "@react-three/drei";

import { NeonGridFloor } from "./components/NeonGridFloor";
import { Map } from "./components/Map";
import { CharacterController } from "./components/CharacterController";
import { Portal } from "./components/Portal";


const RetroComputer = React.lazy(() =>
  import("./components/comp").then(m => ({ default: m.Model }))
);
const TiLogo = React.lazy(() =>
  import("./components/ti").then(m => ({ default: m.Model }))
);
const Robot = React.lazy(() =>
  import("./components/robo").then(m => ({ default: m.Model }))
);
const AdminBlock = React.lazy(() =>
  import("./components/AdminBlock").then(m => ({ default: m.Model }))
);
const Sign = React.lazy(() =>
  import("./components/sign").then(m => ({ default: m.Model }))
);
const PurplePlanet = React.lazy(() =>
  import("./components/purple_planet").then(m => ({ default: m.Model }))
);
const Saucer = React.lazy(() =>
  import("./components/flying_saucer").then(m => ({ default: m.Model }))
);
const Library = React.lazy(() =>
  import("./components/library").then(m => ({ default: m.Model }))
);
const Crash = React.lazy(() =>
  import("./components/crash").then(m => ({ default: m.Model }))
);



function BloomEffect() {
  const { gl, scene, camera, size } = useThree();
  const composer = useRef();

  useEffect(() => {
    composer.current = new EffectComposer(gl);
    composer.current.setSize(size.width, size.height);
    composer.current.addPass(new RenderPass(scene, camera));

    const bloom = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      0.2,
      1,
      0.3
    );
    composer.current.addPass(bloom);

    return () => composer.current?.dispose();
  }, [gl, scene, camera, size]);

  useFrame(() => composer.current?.render(), 1);
  return null;
}

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
];


function SceneContent({ onReady }) {
  // const { gl, scene, camera } = useThree();
  // const warmedUp = useRef(false);

  const {progress} = useProgress();

  useEffect(() => {
    console.log("Loading progress:", progress);
  }, [progress]);
  

  // useEffect(() => {
  //   let frames = 0;

  //   const warmup = () => {
  //     frames++;

  //     gl.compile(scene, camera);

  //     if (frames > 120) { 
  //       if (!warmedUp.current) {
  //         warmedUp.current = true;
  //         onReady();
  //       }
  //       return;
  //     }
  //     requestAnimationFrame(warmup);
  //   };

  //   warmup();
  // }, [gl, scene, camera, onReady]);
  const frames = useRef(0);
  const readyOnce = useRef(false);

  useFrame(() => {
    if (readyOnce.current) return;

    frames.current++;
    console.log(frames)

    // 60–90 frames is usually enough for:
    // shaders, skeletons, textures, bloom, physics
    if (frames.current > 150) {
      readyOnce.current = true;
      onReady();
    }
  });

  return (
    <>
      <color attach="background" args={["#080009"]} />
      <ambientLight intensity={0.15} color="#f400e8" />

      <directionalLight position={[10, 10, 5]} intensity={0.6} color="#ff2fd3" />
      <directionalLight position={[-10, 5, -10]} intensity={1.2} color="#00ffff" />
      <pointLight position={[0, -0.5, 0]} intensity={1.5} distance={20} color="#ff00ff" />

      {/* <Environment preset="night" /> */}

      <Suspense fallback={null}>
        <NeonGridFloor />
      </Suspense>

      {/* <Physics gravity={[0, -9.81, 0]}> */}
        <Suspense fallback={null}>
          <Map model="models/neon_stage_full2.glb" scale={0.5} position={[0, -1, -6]} />
        </Suspense>

        <Suspense fallback={null}>
          <CharacterController />

          <Portal position={[0, -1, -1]} portalColorStart="red" lampColor="#b20024">
            <TiLogo scale={0.4} position={[0, 0.5, 0]} rotation={[0, -3, 0]} />
          </Portal>

          <Portal position={[6, -1, -10]} rotation={[0, 2.3, 0]} portalColorStart="blue" lampColor="#0082b2">
            <Robot scale={0.5} position={[0, 0.7, 0]} rotation={[0, 2.8, 0]} />
          </Portal>

          <Portal position={[-6, -1, -10]} rotation={[0, -2.3, 0]} portalColorStart="green" lampColor="#00b26b">
            <RetroComputer scale={2.5} position={[0.1, 1, 0]} rotation={[0, 3.2, 0]} />
          </Portal>

          <group>
            {/* <Academic scale={3.5} position={[4, -1, -18]} rotation={[0, -1, 0]} /> */}
            <AdminBlock scale={3.5} position={[4, -1, -19]} rotation={[0, -1, 0]} />
            <Sign scale={2} position={[-4, -1, -18]} rotation={[0, 1, 0]} />
            <Crash scale={1} position={[-5, -1, -16]} rotation={[0, 1.8, 0]} />
            <PurplePlanet scale={1} position={[-4, 3.2, -18]} />
            <Saucer scale={2} position={[0, 1, -22]} />
            {/* <Library scale={3} position={[6, -1, -4]} rotation={[0, 4.2, 0]} />
            <Library scale={3} position={[-6, -1, -4]} rotation={[0, -4.2, 0]} /> */}
            <Library scale={3} position={[6, -1, -4]} rotation={[0, 4.2, 0]} />
            <Library scale={3} position={[-6, -1, -4]} rotation={[0, -4.2, 0]} />
          </group>
        </Suspense>
      {/* </Physics> */}

      <BloomEffect />
    </>
  );
}


export default function Scene() {
  const [ready, setReady] = useState(false);

  return (
    <KeyboardControls map={keyboardMap}>
      {/* Loader (DOM) */}
      {!ready && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "black",
            color: "#ff4fd8",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 10,
            fontSize: 24,
            letterSpacing: 2,
          }}
        >
          Setting up Environment...
        </div>
      )}

      <Canvas
        shadows
        camera={{ position: [3, 3, 3], near: 0.1, fov: 60 }}
        dpr={[1, 1.5]}
        style={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
          opacity: ready ? 1 : 0,
          pointerEvents: ready ? "auto" : "none",
          transition: "opacity 0.8s ease",
        }}
      >
        <SceneContent onReady={() => setReady(true)} />
      </Canvas>
    </KeyboardControls>
  );
}
