import React from 'react';
import { useRef } from 'react';

export function Cube({ dimensions = { width: 1, height: 1, depth: 1 }, color = "orange", position = [0, 0, 0] }) {
  const meshRef = useRef();
  return (
    <mesh position={position} ref={meshRef}>
      <boxGeometry args={[dimensions.width, dimensions.height, dimensions.depth]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export function Sphere({ dimensions = { width: 1 }, color = "blue", position = [0, 0, 0] }) {
  const meshRef = useRef();
  const radius = dimensions.width / 2;
  return (
    <mesh position={position} ref={meshRef}>
      <sphereGeometry args={[radius, 32, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export function Cylinder({ dimensions = { width: 1, height: 1 }, color = "green", position = [0, 0, 0] }) {
  const meshRef = useRef();
  const radius = dimensions.width / 2;
  return (
    <mesh position={position} ref={meshRef}>
      <cylinderGeometry args={[radius, radius, dimensions.height, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export function Cone({ dimensions = { width: 1, height: 1 }, color = "red", position = [0, 0, 0] }) {
  const meshRef = useRef();
  const radius = dimensions.width / 2;
  return (
    <mesh position={position} ref={meshRef}>
      <coneGeometry args={[radius, dimensions.height, 32]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}