import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';

// Stylized geometric head that tracks cursor
function Head() {
  const groupRef = useRef<THREE.Group>(null);
  const eyeLeftRef = useRef<THREE.Mesh>(null);
  const eyeRightRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const breathOffset = useRef(0);
  const blinkTimer = useRef(0);
  const [blinkScale, setBlinkScale] = useState(1);

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

  // Head material
  const headMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#1a2a3a'),
    metalness: 0.6,
    roughness: 0.3,
  }), []);

  const glowMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#22d3ee'),
    emissive: new THREE.Color('#22d3ee'),
    emissiveIntensity: 0.8,
    metalness: 0.9,
    roughness: 0.1,
  }), []);

  const eyeMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#e0f2fe'),
    emissive: new THREE.Color('#22d3ee'),
    emissiveIntensity: 0.5,
  }), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    // Cursor tracking with limits
    targetRotation.current.y = THREE.MathUtils.clamp(mouse.x * 0.4, -0.5, 0.5);
    targetRotation.current.x = THREE.MathUtils.clamp(mouse.y * 0.2, -0.3, 0.3);

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

    // Breathing
    breathOffset.current += delta;
    groupRef.current.position.y = Math.sin(breathOffset.current * 1.2) * 0.03;
    groupRef.current.scale.setScalar(1 + Math.sin(breathOffset.current * 1.2) * 0.005);

    // Blinking
    blinkTimer.current += delta;
    if (blinkTimer.current > 3.5 + Math.random() * 2) {
      blinkTimer.current = 0;
      setBlinkScale(0.1);
      setTimeout(() => setBlinkScale(1), 150);
    }

    // Eye scale for blink
    if (eyeLeftRef.current) eyeLeftRef.current.scale.y = THREE.MathUtils.lerp(eyeLeftRef.current.scale.y, blinkScale, 10 * delta);
    if (eyeRightRef.current) eyeRightRef.current.scale.y = THREE.MathUtils.lerp(eyeRightRef.current.scale.y, blinkScale, 10 * delta);

    // Subtle idle sway
    groupRef.current.rotation.z = Math.sin(breathOffset.current * 0.5) * 0.02;
  });

  return (
    <group ref={groupRef}>
      {/* Head - main shape */}
      <mesh material={headMaterial}>
        <sphereGeometry args={[1, 64, 64]} />
      </mesh>

      {/* Jaw / chin area */}
      <mesh position={[0, -0.6, 0.2]} material={headMaterial}>
        <sphereGeometry args={[0.65, 32, 32]} />
      </mesh>

      {/* Forehead ridge */}
      <mesh position={[0, 0.3, 0.7]} material={headMaterial}>
        <boxGeometry args={[1.2, 0.15, 0.3]} />
      </mesh>

      {/* Eye sockets - glowing */}
      <mesh ref={eyeLeftRef} position={[-0.32, 0.15, 0.85]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <primitive object={eyeMaterial} attach="material" />
      </mesh>
      <mesh ref={eyeRightRef} position={[0.32, 0.15, 0.85]}>
        <sphereGeometry args={[0.12, 16, 16]} />
        <primitive object={eyeMaterial} attach="material" />
      </mesh>

      {/* Pupils */}
      <mesh position={[-0.32, 0.15, 0.97]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#0e7490" />
      </mesh>
      <mesh position={[0.32, 0.15, 0.97]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="#0e7490" />
      </mesh>

      {/* Nose bridge */}
      <mesh position={[0, -0.05, 0.9]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.12, 0.3, 0.15]} />
        <primitive object={headMaterial} attach="material" />
      </mesh>

      {/* Cyber lines - decorative */}
      <mesh position={[-0.7, 0.3, 0.5]} rotation={[0, 0.5, 0.2]}>
        <boxGeometry args={[0.4, 0.02, 0.02]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>
      <mesh position={[0.7, 0.3, 0.5]} rotation={[0, -0.5, -0.2]}>
        <boxGeometry args={[0.4, 0.02, 0.02]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>
      <mesh position={[-0.5, -0.2, 0.75]} rotation={[0.1, 0.3, 0]}>
        <boxGeometry args={[0.25, 0.015, 0.015]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>
      <mesh position={[0.5, -0.2, 0.75]} rotation={[0.1, -0.3, 0]}>
        <boxGeometry args={[0.25, 0.015, 0.015]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>

      {/* Ear accents */}
      <mesh position={[-1, 0, 0]}>
        <boxGeometry args={[0.08, 0.4, 0.2]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>
      <mesh position={[1, 0, 0]}>
        <boxGeometry args={[0.08, 0.4, 0.2]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>

      {/* Neck */}
      <mesh position={[0, -1.2, 0]} material={headMaterial}>
        <cylinderGeometry args={[0.3, 0.35, 0.6, 16]} />
      </mesh>

      {/* Shoulders hint */}
      <mesh position={[0, -1.6, 0]} material={headMaterial}>
        <boxGeometry args={[2, 0.3, 0.8]} />
      </mesh>
      <mesh position={[0, -1.55, 0.1]}>
        <boxGeometry args={[1.8, 0.02, 0.02]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>
    </group>
  );
}

// Floating particles around head
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
        camera={{ position: [0, 0, 4], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Ambient */}
        <ambientLight intensity={0.15} />

        {/* Key light */}
        <directionalLight position={[3, 3, 5]} intensity={0.8} color="#e0f2fe" />

        {/* Rim lights */}
        <pointLight position={[-3, 1, -2]} intensity={0.6} color="#22d3ee" />
        <pointLight position={[3, -1, -2]} intensity={0.4} color="#8b5cf6" />

        {/* Bottom fill */}
        <pointLight position={[0, -3, 2]} intensity={0.2} color="#22d3ee" />

        <Head />
        <Particles />
      </Canvas>
    </div>
  );
}
