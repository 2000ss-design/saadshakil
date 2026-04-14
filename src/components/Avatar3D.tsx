import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import saadAvatar from '@/assets/saad-avatar-nobg.png';

function PhotoCard() {
  const groupRef = useRef<THREE.Group>(null);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const breathOffset = useRef(0);

  const texture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(saadAvatar);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    targetRotation.current.y = THREE.MathUtils.clamp(mouse.x * 0.3, -0.4, 0.4);
    targetRotation.current.x = THREE.MathUtils.clamp(mouse.y * 0.15, -0.2, 0.2);

    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation.current.y, 3 * delta);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetRotation.current.x, 3 * delta);

    breathOffset.current += delta;
    groupRef.current.position.y = Math.sin(breathOffset.current * 1.2) * 0.05;
    groupRef.current.rotation.z = Math.sin(breathOffset.current * 0.5) * 0.015;
  });

  return (
    <group ref={groupRef}>
      {/* Avatar with transparent bg */}
      <mesh position={[0, 0.1, 0]}>
        <planeGeometry args={[2.4, 3.2]} />
        <meshStandardMaterial map={texture} transparent alphaTest={0.1} side={THREE.DoubleSide} />
      </mesh>

      {/* Hexagonal glow ring */}
      <mesh position={[0, 0, -0.15]}>
        <ringGeometry args={[1.5, 1.55, 6]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.8} metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0, -0.2]} rotation={[0, 0, Math.PI / 6]}>
        <ringGeometry args={[1.7, 1.73, 6]} />
        <meshStandardMaterial color="#8b5cf6" emissive="#8b5cf6" emissiveIntensity={0.4} transparent opacity={0.5} />
      </mesh>
      {/* Outer accent ring */}
      <mesh position={[0, 0, -0.25]} rotation={[0, 0, Math.PI / 12]}>
        <ringGeometry args={[1.9, 1.92, 6]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.2} transparent opacity={0.3} />
      </mesh>
    </group>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 120;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y += delta * 0.05;
    particlesRef.current.rotation.x += delta * 0.02;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#22d3ee" transparent opacity={0.7} sizeAttenuation />
    </points>
  );
}

// Floating hexagons
function FloatingHexagons() {
  const groupRef = useRef<THREE.Group>(null);
  
  const hexagons = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      pos: [(Math.random() - 0.5) * 7, (Math.random() - 0.5) * 7, (Math.random() - 0.5) * 3 - 2] as [number, number, number],
      scale: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 0.5 + 0.2,
      phase: Math.random() * Math.PI * 2,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.children.forEach((child, i) => {
      const hex = hexagons[i];
      child.position.y = hex.pos[1] + Math.sin(state.clock.elapsedTime * hex.speed + hex.phase) * 0.3;
      child.rotation.z += 0.002;
    });
  });

  return (
    <group ref={groupRef}>
      {hexagons.map((hex, i) => (
        <mesh key={i} position={hex.pos} scale={hex.scale}>
          <ringGeometry args={[0.8, 1, 6]} />
          <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.3} transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
}

export default function Avatar3D() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`w-full h-[500px] md:h-[600px] transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 3, 5]} intensity={0.8} color="#e0f2fe" />
        <pointLight position={[-3, 1, -2]} intensity={0.6} color="#22d3ee" />
        <pointLight position={[3, -1, -2]} intensity={0.4} color="#8b5cf6" />
        <pointLight position={[0, -3, 2]} intensity={0.2} color="#22d3ee" />
        <PhotoCard />
        <Particles />
        <FloatingHexagons />
      </Canvas>
    </div>
  );
}
