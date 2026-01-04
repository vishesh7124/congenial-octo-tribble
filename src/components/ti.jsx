import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Model({
  floatSpeed = 1.2,
  floatHeight = 0.15,
  rotationSpeed = 0.4,
  ...props
}) {
  const group = useRef()
  const { nodes, materials } = useGLTF('/models/ti.glb')

  useFrame((state) => {
    const t = state.clock.elapsedTime

    if (!group.current) return

    // Floating motion
    group.current.position.y =
      (props.position?.[1] || 0) + Math.sin(t * floatSpeed) * floatHeight

    // Gentle rotation
    group.current.rotation.y += 0.01 * rotationSpeed
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh geometry={nodes.model.geometry} material={materials.model} />
    </group>
  )
}

useGLTF.preload('/models/ti.glb')
