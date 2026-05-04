import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState, useEffect, useMemo } from 'react';
import * as THREE from 'three';
import saadAvatar from '@/assets/saad-avatar-nobg.png';

function CircularAvatar() {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });
  const breathOffset = useRef(0);

  const texture = useMemo(() => {
    const tex = new THREE.TextureLoader().load(saadAvatar);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  // Create circular clipping via stencil
  const circleMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTexture: { value: texture },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform sampler2D uTexture;
        varying vec2 vUv;
        void main() {
          vec2 center = vec2(0.5, 0.5);
          float dist = distance(vUv, center);
          if (dist > 0.49) discard;
          float edge = smoothstep(0.49, 0.46, dist);
          vec4 tex = texture2D(uTexture, vUv);
          gl_FragColor = vec4(tex.rgb, tex.a * edge);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, [texture]);

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

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    targetRotation.current.y = THREE.MathUtils.clamp(mouse.x * 0.25, -0.3, 0.3);
    targetRotation.current.x = THREE.MathUtils.clamp(mouse.y * 0.12, -0.15, 0.15);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation.current.y, 3 * delta);
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, -targetRotation.current.x, 3 * delta);
    breathOffset.current += delta;
    groupRef.current.position.y = Math.sin(breathOffset.current * 1.2) * 0.04;

    // Animate ring glow
    if (ringRef.current) {
      const mat = ringRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.8 + Math.sin(state.clock.elapsedTime * 2) * 0.4;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Circular avatar image with shader clipping */}
      <mesh position={[0, 0.15, 0.05]} material={circleMaterial}>
        <planeGeometry args={[3, 3]} />
      </mesh>

      {/* Dark circular backdrop */}
      <mesh position={[0, 0, -0.05]}>
        <circleGeometry args={[1.42, 64]} />
        <meshStandardMaterial color="#0a1628" emissive="#22d3ee" emissiveIntensity={0.05} />
      </mesh>

      {/* Primary glow ring */}
      <mesh ref={ringRef} position={[0, 0, -0.06]}>
        <ringGeometry args={[1.38, 1.48, 64]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={1.0}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Rotating dashed outer ring */}
      <mesh ref={outerRingRef} position={[0, 0, -0.08]}>
        <ringGeometry args={[1.55, 1.58, 64]} />
        <meshStandardMaterial
          color="#8b5cf6"
          emissive="#8b5cf6"
          emissiveIntensity={0.8}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Soft outer halo */}
      <mesh position={[0, 0, -0.1]}>
        <ringGeometry args={[1.65, 1.9, 64]} />
        <meshStandardMaterial
          color="#22d3ee"
          emissive="#22d3ee"
          emissiveIntensity={0.3}
          transparent
          opacity={0.12}
        />
      </mesh>

      {/* Large soft glow behind everything */}
      <mesh position={[0, 0, -0.2]}>
        <circleGeometry args={[2.2, 64]} />
        <meshStandardMaterial
          color="#0c4a6e"
          emissive="#22d3ee"
          emissiveIntensity={0.08}
          transparent
          opacity={0.2}
        />
      </mesh>
    </group>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 80;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y += delta * 0.03;
    particlesRef.current.rotation.x += delta * 0.01;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#22d3ee" transparent opacity={0.5} sizeAttenuation />
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
    <div className={`w-full h-[280px] sm:h-[350px] md:h-[460px] lg:h-[540px] transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 3, 5]} intensity={1.2} color="#e0f2fe" />
        <pointLight position={[-3, 1, -2]} intensity={0.9} color="#22d3ee" />
        <pointLight position={[3, -1, -2]} intensity={0.6} color="#8b5cf6" />
        <pointLight position={[0, -3, 2]} intensity={0.3} color="#22d3ee" />
        <CircularAvatar />
        <Particles />
      </Canvas>
    </div>
  );
}
