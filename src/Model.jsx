/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.2.13 yanina-dancing-woman.glb --transform 
Files: yanina-dancing-woman.glb [5.09MB] > yanina-dancing-woman-transformed.glb [847.02KB] (83%)
*/

import React, { useRef, useEffect } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'

export function Model({...props}) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF('/yanina-dancing-woman-transformed.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
  actions['YaninaDance'].play(); 
  });

  return (
    <group ref={group} {...props} dispose={null}>
      <group>
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.hips} />
        </group>
        <skinnedMesh name="Topology" geometry={nodes.Topology.geometry} material={materials.Naye} skeleton={nodes.Topology.skeleton} rotation={[Math.PI / 2, 0, 0]} scale={0.01} />
      </group>
    </group>
  )
}

useGLTF.preload('/yanina-dancing-woman-transformed.glb')