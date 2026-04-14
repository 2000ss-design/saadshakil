import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import saadAvatar from '@/assets/saad-avatar.png';

// 3D photo card that tracks cursor
function PhotoCard() {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();

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

  const frameMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1a2a3a'),
    metalness: 0.8,
    roughness: 0.2,
  }), []);

  const glowMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#22d3ee'),
    emissive: new THREE.Color('#22d3ee'),
    emissiveIntensity: 0.8,
    metalness: 0.9,
    roughness: 0.1,
  }), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Cursor tracking
    targetRotation.current.y = THREE.MathUtils.clamp(mouse.x * 0.3, -0.4, 0.4);
    targetRotation.current.x = THREE.MathUtils.clamp(mouse.y * 0.15, -0.2, 0.2);

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetRotation.current.y,
      3 * delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -targetRotation.current.x,
      3 * delta
    );

    // Breathing / floating
    breathOffset.current += delta;
    groupRef.current.position.y = Math.sin(breathOffset.current * 1.2) * 0.05;
    groupRef.current.rotation.z = Math.sin(breathOffset.current * 0.5) * 0.015;
  });

  return (
    <group ref={groupRef}>
      {/* Avatar plane - no background */}
      <mesh position={[0, 0.1, 0]}>
        <planeGeometry args={[2.4, 3.2]} />
        <meshStandardMaterial map={texture} transparent alphaTest={0.5} />
      </mesh>

      {/* Subtle glow ring behind avatar */}
      <mesh position={[0, 0, -0.15]} rotation={[0, 0, 0]}>
        <ringGeometry args={[1.5, 1.55, 64]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 0, -0.2]} rotation={[0, 0, Math.PI / 6]}>
        <ringGeometry args={[1.7, 1.73, 64]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.3} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

// Floating particles
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4;
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
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#22d3ee" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

export default function Avatar3D() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`w-full h-[500px] md:h-[600px] transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[3, 3, 5]} intensity={0.8} color="#e0f2fe" />
        <pointLight position={[-3, 1, -2]} intensity={0.6} color="#22d3ee" />
        <pointLight position={[3, -1, -2]} intensity={0.4} color="#8b5cf6" />
        <pointLight position={[0, -3, 2]} intensity={0.2} color="#22d3ee" />

        <PhotoCard />
        <Particles />
      </Canvas>
    </div>
  );
}
