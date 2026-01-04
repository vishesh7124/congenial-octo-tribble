import React, { Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, KeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { Physics } from "@react-three/rapier";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { NeonGridFloor } from "./components/NeonGridFloor";
import { Model as RetroComputer } from "./components/comp";
import { Model as TiLogo } from "./components/ti";
import { Model as Robot } from "./components/robo";
import { Model as Academic } from "./components/building";
import { Model as Sign } from "./components/sign";
// import { Model as Sun } from "./components/sun";
import { Model as PurplePlanet } from "./components/purple_planet";
import { Model as Saucer } from "./components/flying_saucer";
import { Model as Library } from "./components/library";
import { Model as Crash } from "./components/crash";
// import { fog } from "three/src/nodes/TSL.js";

import { Map } from "./components/Map";
import { CharacterController } from "./components/CharacterController";
import { Portal } from "./components/Portal";

function BloomEffect() {
  const { gl, scene, camera, size } = useThree();
  const composerRef = React.useRef(null);

  React.useEffect(() => {
    const composer = new EffectComposer(gl);
    composerRef.current = composer;

    composer.setSize(size.width, size.height);
    composer.addPass(new RenderPass(scene, camera));

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(size.width, size.height),
      0.5,
      1,
      0.3
    );
    composer.addPass(bloomPass);

    const handleResize = () =>
      composer.setSize(window.innerWidth, window.innerHeight);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      composer.dispose();
    };
  }, [gl, scene, camera, size]);

  useFrame(() => {
    if (composerRef.current) composerRef.current.render();
  }, 1);

  return null;
}

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
];

const SceneContent = () => {
  return (
    <>
      <color attach="background" args={["#080009"]} />
      <ambientLight intensity={0.15} color="#f400e8" />

      {/* <directionalLight
        position={[0, 500, 1000]}
        intensity={1}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
      /> */}
      {/* <directionalLight   position={[90, 20, 10]} intensity={0.4} /> */}
      {/* <directionalLight position={[-45, -20, 10]} intensity={0.4} /> */}

      {/* Key light (front-left) */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.6}
        color="#ff2fd3"
      />

      {/* Rim light (behind character) */}
      <directionalLight
        position={[-10, 5, -10]}
        intensity={1.2}
        color="#00ffff"
      />

      {/* Ground glow */}
      <pointLight
        position={[0, -0.5, 0]}
        intensity={1.5}
        distance={20}
        color="#ff00ff"
      />

      <Environment preset="night" />

      <Suspense fallback={null}>
        <Physics gravity={[0, -9.81, 0]}>
          {/* Load the neon stage as the physics map — place your model in public/models */}
          <Map
            model={`models/neon_stage_full2.glb`}
            scale={0.5}
            position={[0, -1, -6]}
          />
          <NeonGridFloor />
          <CharacterController />
          {/* Portal model positioned at specified coordinates */}
          <Portal
            position={[0, -1, -1]}
            portalColorStart="red"
            lampColor="#b20024"
          >
            <TiLogo
              scale={0.4}
              position={[0, 0.5, 0]}
              rotation={[0, -3, 0]}
              floatHeight={0.2}
              floatSpeed={1}
              rotationSpeed={0.6}
            />
          </Portal>
          <Portal
            position={[6, -1, -10]}
            rotation={[0, 2.3, 0]}
            portalColorStart="blue"
            lampColor="#0082b2"
          >
            <Robot scale={0.5} position={[0, 0.7, 0]} rotation={[0, 2.8, 0]} />
          </Portal>
          <Portal
            position={[-6, -1, -10]}
            rotation={[0, -2.3, 0]}
            portalColorStart="green"
            lampColor="#00b26b"
          >
            <RetroComputer
              scale={2.5}
              position={[0.1, 1, 0]}
              rotation={[0, 3.2, 0]}
            />
          </Portal>
          <group>
            {/* <Model scale={4} position={[4, -1, -18]} rotation={[0,-1,0]} />          
          <Model scale={4} position={[-4, -1, -18]} rotation={[0,1,0]} />           */}
            {/* <Model scale={2} position={[3, 0, -15]} rotation={[0,-1,0]} />           */}

            <Academic scale={3.5} position={[4, -1, -18]} rotation={[0,-1,0]} />
            <Sign scale={2} position={[-4,-1,-18]} rotation={[0,1,0]} />
            <Crash scale={1} position={[-5,-1,-16]} rotation={[0,1.8,0]} />
            {/* <Sign scale={2} position={[6,-1,-4]} rotation={[0,4.2,0]} /> */}
            {/* <Sun scale={0.04} position={[-4,4,-18]}/> */}
            <PurplePlanet scale={1} position={[-4, 3.2, -18]} />
            <Saucer scale={2} position={[0, 1, -22]}/>
            <Library scale={3} position={[6, -1, -4]} rotation={[0,4.2,0]} />
            <Library scale={3} position={[-6, -1, -4]} rotation={[0,-4.2,0]} />
          </group>
        </Physics>
      </Suspense>

      <BloomEffect />
    </>
  );
};

export default function Scene() {
  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas
        shadows
        camera={{ position: [3, 3, 3], near: 0.1, fov: 60 }}
        dpr={[1, 2]}
        style={{
          touchAction: "none",
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <SceneContent />
      </Canvas>
    </KeyboardControls>
  );
}
