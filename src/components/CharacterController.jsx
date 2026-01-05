import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
// import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import { MathUtils, Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils.js";
import { Model as Astronaut } from "./astro";
import { Raycaster } from "three";

const normalizeAngle = (angle) => {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
};

const lerpAngle = (start, end, t) => {
  start = normalizeAngle(start);
  end = normalizeAngle(end);

  if (Math.abs(end - start) > Math.PI) {
    if (end > start) start += 2 * Math.PI;
    else end += 2 * Math.PI;
  }

  return normalizeAngle(start + (end - start) * t);
};

export const CharacterController = () => {
  const WALK_SPEED = 100;
  const RUN_SPEED = 3;
  const ROTATION_SPEED = degToRad(2);
  const INITIAL_ROTATION = 0;

  const rb = useRef();
  const container = useRef();
  const character = useRef();

  const [animation, setAnimation] = useState("float");

  const characterRotationTarget = useRef(0);
  const rotationTarget = useRef(0);

  const cameraTarget = useRef();
  const cameraPosition = useRef();
  const cameraWorldPosition = useRef(new Vector3());
  const cameraLookAtWorldPosition = useRef(new Vector3());
  const cameraLookAt = useRef(new Vector3());

  const [, get] = useKeyboardControls();
  const isClicking = useRef(false);

  const raycaster = useRef(new Raycaster());
  const down = new Vector3(0, -1, 0);


  useEffect(() => {
    const down = () => (isClicking.current = true);
    const up = () => (isClicking.current = false);

    document.addEventListener("mousedown", down);
    document.addEventListener("mouseup", up);
    document.addEventListener("touchstart", down);
    document.addEventListener("touchend", up);

    return () => {
      document.removeEventListener("mousedown", down);
      document.removeEventListener("mouseup", up);
      document.removeEventListener("touchstart", down);
      document.removeEventListener("touchend", up);
    };
  }, []);

  useEffect(() => {
    rotationTarget.current = INITIAL_ROTATION;
    characterRotationTarget.current = INITIAL_ROTATION;
  }, []);

  // useFrame(({ camera, mouse }) => {
  //   if (!rb.current) return;

  //   const vel = rb.current.linvel();
  //   const movement = { x: 0, z: 0 };

  //   if (get().forward) movement.z = 1;
  //   if (get().backward) movement.z = -1;
  //   if (get().left) movement.x = 1;
  //   if (get().right) movement.x = -1;

  //   let speed = get().run ? RUN_SPEED : WALK_SPEED;

  //   if (isClicking.current) {
  //     if (Math.abs(mouse.x) > 0.1) movement.x = -mouse.x;
  //     movement.z = mouse.y + 0.4;
  //     if (Math.abs(movement.x) > 0.5 || Math.abs(movement.z) > 0.5) {
  //       speed = RUN_SPEED;
  //     }
  //   }

  //   if (movement.x !== 0) {
  //     rotationTarget.current += ROTATION_SPEED * movement.x;
  //   }

  //   // ---------------------------
  //   // MOVEMENT + ANIMATION LOGIC
  //   // ---------------------------
  //   if (movement.x !== 0 || movement.z !== 0) {
  //     characterRotationTarget.current =
  //       INITIAL_ROTATION + Math.atan2(movement.x, movement.z);

  //     const moveAngle =
  //       rotationTarget.current + characterRotationTarget.current + Math.PI;

  //     vel.x = Math.sin(moveAngle) * speed;
  //     vel.z = Math.cos(moveAngle) * speed;

  //     if (movement.x !== 0 && movement.z === 0) {
  //       setAnimation(movement.x > 0 ? "strafeLeft" : "strafeRight");
  //     } else {
  //       setAnimation(speed === RUN_SPEED ? "run" : "moonwalk");
  //     }
  //   } else {
  //     setAnimation("float");
  //     vel.x = 0;
  //     vel.z = 0;
  //   }

  //   character.current.rotation.y = lerpAngle(
  //     character.current.rotation.y,
  //     characterRotationTarget.current,
  //     0.1
  //   );

  //   rb.current.setLinvel(vel, true);

  //   // ---------------------------
  //   // CAMERA
  //   // ---------------------------
  //   container.current.rotation.y = MathUtils.lerp(
  //     container.current.rotation.y,
  //     rotationTarget.current,
  //     0.1
  //   );

  //   cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
  //   camera.position.lerp(cameraWorldPosition.current, 0.3);

  //   cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
  //   cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);
  //   camera.lookAt(cameraLookAt.current);
  // });


  useFrame((state) => {
  if (!container.current || !character.current) return;

  const delta = state.clock.getDelta();

  const movement = new Vector3();
  const speed = get().run ? RUN_SPEED : WALK_SPEED;

let forward = 0;
let turn = 0;

if (get().forward) forward = -1;
if (get().backward) forward = 1;
if (get().left) turn = 1;
if (get().right) turn = -1;


  if (forward !== 0 || turn !== 0) {
    movement.normalize().multiplyScalar(speed * delta);

    // Rotate container (world direction)
rotationTarget.current += turn * ROTATION_SPEED;


const angle = rotationTarget.current;

container.current.position.x +=
  Math.sin(angle) * forward * WALK_SPEED * delta;

container.current.position.z +=
  Math.cos(angle) * forward * WALK_SPEED * delta;

    // Animation
    setAnimation(speed === RUN_SPEED ? "run" : "moonwalk");
  } else {
    setAnimation("float");
  }

  character.current.rotation.y = 0;


  // Character rotation
  // character.current.rotation.y = lerpAngle(
  //   character.current.rotation.y,
  //   rotationTarget.current,
  //   0.4
  // );

  // -----------------------
  // GROUND SNAP (raycast)
  // -----------------------
  raycaster.current.set(container.current.position, down);

const groundMeshes = [];
state.scene.traverse((obj) => {
  if (obj.isMesh && obj.userData.isGround) {
    groundMeshes.push(obj);
  }
});

const hits = raycaster.current.intersectObjects(groundMeshes, true);

  if (hits.length) {
    container.current.position.y = hits[0].point.y + 0.6;
  }

  // -----------------------
  // CAMERA (unchanged)
  // -----------------------
  container.current.rotation.y = MathUtils.lerp(
    container.current.rotation.y,
    rotationTarget.current,
    0.1
  );

  cameraPosition.current.getWorldPosition(cameraWorldPosition.current);
  state.camera.position.lerp(cameraWorldPosition.current, 0.3);

  cameraTarget.current.getWorldPosition(cameraLookAtWorldPosition.current);
  cameraLookAt.current.lerp(cameraLookAtWorldPosition.current, 0.1);
  state.camera.lookAt(cameraLookAt.current);
});

  return (
    // <RigidBody
    //   colliders={false}
    //   lockRotations
    //   ref={rb}
    //   position={[0, 1, -5]}
    // >
      <group ref={container} position={[0, 1, -5]}>
        <group ref={cameraTarget} position-z={-2.0} />
        <group ref={cameraPosition} position-y={-0.2} position-z={0.6} />
        <group ref={character}>
          <Astronaut
            scale={0.1}
            position-y={-0.5}
            rotation={[0, 3, 0]}
            animation={animation}
          />
        </group>
      </group>
      // <CapsuleCollider args={[0.5, 0.25]} />
    // </RigidBody>
  );
};
