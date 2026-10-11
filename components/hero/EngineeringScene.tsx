"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";

function SystemModel({ reduceMotion }: { reduceMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { nodes, edges } = useMemo(() => {
    const nodeCount = 18;
    const points: THREE.Vector3[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < nodeCount; i++) {
      const y = 1 - (i / (nodeCount - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const angle = goldenAngle * i;
      points.push(new THREE.Vector3(Math.cos(angle) * radius, y, Math.sin(angle) * radius).multiplyScalar(1.34));
    }
    const edgePoints: THREE.Vector3[] = [];
    points.forEach((point, index) => points.slice(index + 1).forEach(other => {
      if (point.distanceTo(other) < 1.15) edgePoints.push(point, other);
    }));
    const geometry = new THREE.BufferGeometry().setFromPoints(edgePoints);
    return { nodes: points, edges: geometry };
  }, []);

  useFrame(({ clock }, delta) => {
    if (!group.current || reduceMotion) return;
    group.current.rotation.y += delta * 0.11;
    group.current.rotation.x = Math.sin(clock.elapsedTime * 0.18) * 0.12;
  });

  return <group ref={group}>
    <mesh><icosahedronGeometry args={[1.34, 1]} /><meshBasicMaterial color="#cbbafa" wireframe transparent opacity={0.22} /></mesh>
    <lineSegments geometry={edges}><lineBasicMaterial color="#b8d6d0" transparent opacity={0.5} /></lineSegments>
    <mesh rotation={[0.8, 0.2, 0.25]}><torusGeometry args={[1.62, 0.006, 6, 120]} /><meshBasicMaterial color="#d1c3fa" transparent opacity={0.58} /></mesh>
    <mesh rotation={[1.1, 0.7, -0.45]}><torusGeometry args={[1.78, 0.004, 6, 120]} /><meshBasicMaterial color="#a9d5c0" transparent opacity={0.42} /></mesh>
    {nodes.map((point, index) => <mesh key={index} position={point.toArray()}><sphereGeometry args={[index % 5 === 0 ? 0.045 : 0.027, 10, 10]} /><meshBasicMaterial color={index % 3 === 0 ? "#e8ddff" : "#b8d9cd"} /></mesh>)}
  </group>;
}

export default function EngineeringScene() {
  const reduceMotion = useReducedMotion();
  return <div className="engineering-scene" aria-hidden="true">
    <Canvas dpr={[1, 1.35]} camera={{ position: [0, 0, 5.2], fov: 39 }} gl={{ alpha: true, antialias: false, powerPreference: "low-power" }}>
      <ambientLight intensity={0.8} /><SystemModel reduceMotion={Boolean(reduceMotion)} />
    </Canvas>
  </div>;
}
