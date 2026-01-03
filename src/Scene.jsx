import React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, KeyboardControls } from "@react-three/drei";
import * as THREE from "three";
import { Physics } from "@react-three/rapier";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";

import { Map } from "./components/Map";
import { CharacterController } from "./components/CharacterController";

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

export default function Scene() {
  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas
        shadows
        camera={{ position: [3, 3, 3], near: 0.1, fov: 60 }}
        dpr={[1, 2]}
        style={{ touchAction: "none", height: "100vh", width: "100vw" }}
      >
        <color attach="background" args={["#080009"]} />
        <ambientLight intensity={0.5} color="#f400e8" />
        <directionalLight
          position={[0, 500, 1000]}
          intensity={1}
          castShadow
          shadow-mapSize-width={4096}
          shadow-mapSize-height={4096}
        />
        <directionalLight position={[90, 20, 10]} intensity={0.4} />
        <directionalLight position={[-45, -20, 10]} intensity={0.4} />

        <Environment preset="sunset" />

        <Physics>
          {/* Load the neon stage as the physics map — place your model in public/models */}
          <Map
            model={`models/neon_stage_full2.glb`}
            scale={0.8}
            position={[0, -1, -6]}
          />
          <CharacterController />
        </Physics>

        <BloomEffect />
      </Canvas>
    </KeyboardControls>
  );
}
