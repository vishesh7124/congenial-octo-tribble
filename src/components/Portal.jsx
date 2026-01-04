import { useRef } from "react";
import { Color, AdditiveBlending } from "three";
import { extend, useFrame } from "@react-three/fiber";
import { shaderMaterial, useGLTF, useTexture, Sparkles } from "@react-three/drei";
import { DissolveMaterial } from "./DissolveEffect";
import * as THREE from "three";
// import { Model } from "./robot";
// import { Model } from "./building";

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    vUv = uv;
  }
`;

const fragmentShader = `
  uniform float uTime;
  uniform vec3 uColorStart;
  uniform vec3 uColorEnd;
  varying vec2 vUv;
  
  // Simplex noise function (3D)
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ *ns.x + vec2(0.0, 1.0).xxxy;
    vec4 y = y_ *ns.x + vec2(0.0, 1.0).xxxy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
  }
  
  void main() {
    vec2 displacedUv = vUv + snoise(vec3(vUv * 7.0, uTime * 0.1));
    float strength = snoise(vec3(displacedUv * 5.0, uTime * 0.2));
    float outerGlow = distance(vUv, vec2(0.5)) * 4.0 - 1.4;
    strength += outerGlow;
    strength += step(-0.2, strength) * 0.8;
    strength = clamp(strength, 0.0, 1.0);
    vec3 color = mix(uColorStart, uColorEnd, strength);
    gl_FragColor = vec4(color, 1.0);
    #include <tonemapping_fragment>
    #include <encodings_fragment>
  }
`;

const PortalMaterial = shaderMaterial(
  {
    uTime: 0,
    uColorStart: new Color("hotpink"),
    uColorEnd: new Color("white"),
  },
  vertexShader,
  fragmentShader
);

extend({ PortalMaterial });

export function Portal({
  portalColorStart = "hotpink",
  portalColorEnd = "white",
  lampColor = "#f0bf94",
  children,
  ...props
}) {
  const portalMaterial = useRef();
  const scale = Array.from({ length: 50 }, () => 0.5 + Math.random() * 4);
  
  // Load textures and models with correct paths
  const bakedTexture = useTexture("/models/baked-02.jpeg");
  const { nodes } = useGLTF("/models/portal-2.glb");
  

  useFrame((state, delta) => {
    if (portalMaterial.current) {
      portalMaterial.current.uTime += delta;
    }
  });

  const boxMaterial = new THREE.MeshStandardMaterial({ color: "white" });


  return (
    <group {...props} dispose={null}>
      {/* Sparkles effect */}
      <Sparkles 
        count={scale.length} 
        size={scale} 
        position={[0, 0.9, 0]} 
        scale={[4, 1.5, 4]} 
        speed={0.3} 
      />
      
      {/* Portal circle from model */}
      <mesh 
        geometry={nodes.portalCircle.geometry} 
        position={[0, 0.78, 1.6]} 
        rotation={[-Math.PI / 2, 0, 0]}
      >
<portalMaterial 
  ref={portalMaterial} 
  blending={AdditiveBlending} 
  uColorStart={portalColorStart}
  uColorEnd={portalColorEnd}
/>
      </mesh>
      
      {/* Lamp lights */}
      <mesh 
        geometry={nodes.lampLightL.geometry} 
        position={[0.89, 1.07, -0.14]} 
        scale={[0.07, 0.11, 0.07]} 
      >
<meshBasicMaterial color={lampColor} />
      </mesh>
      <mesh 
        geometry={nodes.lampLightR.geometry} 
        position={[-0.98, 1.07, -0.14]} 
        scale={[-0.07, 0.11, 0.07]} 
      >
<meshBasicMaterial color={lampColor} />
      </mesh>
      
      {/* Baked texture mesh */}
      <mesh 
        geometry={nodes.baked.geometry} 
        position={[0.9, 0.34, -1.47]} 
        rotation={[0, 0.14, 0]}
      >
        <meshBasicMaterial map={bakedTexture} map-flipY={false} />
      </mesh>


          {children}


    </group>
  );
}

