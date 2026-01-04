import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

export function NeonGridFloor() {
  const meshRef = useRef();

  const material = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
      color: { value: new THREE.Color("#ff00ff") },
      fillColor: { value: new THREE.Color("#00ffff") },// neon blue

      gridSize: { value: 1.0 },
      lineWidth: { value: 0.03 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv * 50.0;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
      }
    `,
    // fragmentShader: `
    //   uniform vec3 color;
    //   uniform float lineWidth;
    //   varying vec2 vUv;

    //   float grid(vec2 uv) {
    //     vec2 gv = fract(uv) - 0.5;
    //     vec2 id = floor(uv);
    //     float line = min(abs(gv.x), abs(gv.y));
    //     return smoothstep(lineWidth, 0.0, line);
    //   }

    //   void main() {
    //     float g = grid(vUv);
    //     vec3 glow = color * g * 2.5;
    //     gl_FragColor = vec4(glow, 1.0);
    //   }
    // `,
//     fragmentShader: `
//     uniform vec3 color;          // grid line color (pink)
// uniform vec3 fillColor;      // neon blue
// uniform float lineWidth;
// varying vec2 vUv;

// float gridLine(vec2 uv) {
//   vec2 gv = fract(uv) - 0.5;
//   float line = min(abs(gv.x), abs(gv.y));
//   return smoothstep(lineWidth, 0.0, line);
// }

// // pseudo-random per cell
// float hash(vec2 p) {
//   return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
// }

// void main() {
//   vec2 uv = vUv;
//   vec2 cellId = floor(uv);

//   // GRID LINES
//   float g = gridLine(uv);
//   vec3 gridGlow = color * g * 2.5;

//   // SELECTIVE FILLED CELLS
//   float rnd = hash(cellId);

//   // tweak threshold to control how many tiles glow
//   float fillMask = step(0.85, rnd); 

//   // soft fill (keeps edges clean)
//   vec2 gv = abs(fract(uv) - 0.5);
//   float fill = smoothstep(0.48, 0.45, max(gv.x, gv.y));

//   vec3 fillGlow = fillColor * fill * fillMask * 1.5;

//   vec3 finalColor = gridGlow + fillGlow;

//   gl_FragColor = vec4(finalColor, 1.0);
// }`,

fragmentShader: `
uniform vec3 color;      // grid line color
uniform vec3 fillColor;  // neon blue
uniform float lineWidth;
varying vec2 vUv;

// hash per grid cell
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

void main() {

  // --- GRID SPACE ---
  vec2 gridUV = vUv;             // already scaled in vertex shader
  vec2 cellId = floor(gridUV);   // integer grid cell
  vec2 cellUV = fract(gridUV);   // local cell coords (0..1)

  // --- GRID LINES (perfectly aligned) ---
  vec2 distToEdge = min(cellUV, 1.0 - cellUV);
  float line = min(distToEdge.x, distToEdge.y);
  float gridLine = smoothstep(lineWidth, 0.0, line);
  vec3 gridGlow = color * gridLine * 2.5;

  // --- SELECTIVE TILE FILL ---
  float rnd = hash(cellId);
  float fillMask = step(0.75, rnd); // density control

  // fill stays INSIDE the cell
  float fill = smoothstep(0.48, 0.45, max(abs(cellUV - 0.5).x, abs(cellUV - 0.5).y));
  vec3 fillGlow = fillColor * fill * fillMask * 1.2;

  // --- FINAL ---
  vec3 finalColor = gridGlow + fillGlow;
  gl_FragColor = vec4(finalColor, 1.0);
}

`,

    transparent: true,
  });

  useFrame(({ clock }) => {
    material.uniforms.time.value = clock.getElapsedTime();
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[1.6, -0.99, 0]}
    >
      <planeGeometry args={[200, 200]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
