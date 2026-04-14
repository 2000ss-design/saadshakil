import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import saadAvatar from '@/assets/saad-avatar.png';

// Blink overlay - thin dark bars that simulate eye closing
function BlinkOverlay({ blinking }: { blinking: boolean }) {
  const leftRef = useRef<THREE.Mesh>(null);
  const rightRef = useRef<THREE.Mesh>(null);
  const targetScale = blinking ? 1 : 0;

  useFrame((_, delta) => {
    [leftRef, rightRef].forEach((ref) => {
      if (!ref.current) return;
      ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, targetScale, 12 * delta);
    });
  });

  const material = useMemo(() => new THREE.MeshBasicMaterial({
    color: new THREE.Color('#2a1a10'),
    transparent: true,
    opacity: 0.85,
    depthTest: false,
  }), []);

  return (
    <>
      {/* Left eye blink */}
      <mesh ref={leftRef} position={[-0.28, 0.72, 0.01]} scale={[1, 0, 1]}>
        <planeGeometry args={[0.22, 0.07]} />
        <primitive object={material} attach="material" />
      </mesh>
      {/* Right eye blink */}
      <mesh ref={rightRef} position={[0.28, 0.72, 0.01]} scale={[1, 0, 1]}>
        <planeGeometry args={[0.22, 0.07]} />
        <primitive object={material.clone()} attach="material" />
      </mesh>
    </>
  );
}

// 3D photo card that tracks cursor
function PhotoCard() {
  const groupRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const breathOffset = useRef(0);
  const [blinking, setBlinking] = useState(false);

  const texture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(saadAvatar);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // Eye blink interval
  useEffect(() => {
    const blink = () => {
      setBlinking(true);
      setTimeout(() => setBlinking(false), 150);
    };
    const interval = setInterval(() => {
      blink();
      // Double blink sometimes
      if (Math.random() > 0.6) {
        setTimeout(blink, 300);
      }
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(interval);
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

  const glowMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: new THREE.Color('#22d3ee'),
    emissive: new THREE.Color('#22d3ee'),
    emissiveIntensity: 1,
    metalness: 0.9,
    roughness: 0.1,
  }), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    targetRotation.current.y = THREE.MathUtils.clamp(mouse.x * 0.25, -0.35, 0.35);
    targetRotation.current.x = THREE.MathUtils.clamp(mouse.y * 0.12, -0.15, 0.15);

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y, targetRotation.current.y, 3 * delta
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x, -targetRotation.current.x, 3 * delta
    );

    breathOffset.current += delta;
    groupRef.current.position.y = Math.sin(breathOffset.current * 1.2) * 0.04;
    groupRef.current.rotation.z = Math.sin(breathOffset.current * 0.5) * 0.01;
  });

  return (
    <group ref={groupRef}>
      {/* Avatar image - centered */}
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2.6, 3.5]} />
        <meshStandardMaterial
          map={texture}
          transparent
          alphaTest={0.5}
          emissive={new THREE.Color('#ffffff')}
          emissiveIntensity={0.15}
          toneMapped={false}
        />
      </mesh>

      {/* Blink overlay */}
      <BlinkOverlay blinking={blinking} />

      {/* Glow ring behind */}
      <mesh position={[0, 0, -0.15]}>
        <ringGeometry args={[1.6, 1.65, 64]} />
        <primitive object={glowMaterial} attach="material" />
      </mesh>
      <mesh position={[0, 0, -0.2]} rotation={[0, 0, Math.PI / 6]}>
        <ringGeometry args={[1.8, 1.83, 64]} />
        <meshStandardMaterial color="#22d3ee" emissive="#22d3ee" emissiveIntensity={0.4} transparent opacity={0.35} />
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
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
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
    <div className={`w-full h-[500px] md:h-[600px] flex items-center justify-center transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 5]} intensity={1.2} color="#f0f8ff" />
        <pointLight position={[-3, 1, -2]} intensity={0.8} color="#22d3ee" />
        <pointLight position={[3, -1, -2]} intensity={0.5} color="#8b5cf6" />
        <pointLight position={[0, 2, 3]} intensity={0.4} color="#ffffff" />

        <PhotoCard />
        <Particles />
      </Canvas>
    </div>
  );
}
