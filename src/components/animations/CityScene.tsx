import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, GradientTexture } from '@react-three/drei';
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  Vignette,
  ChromaticAberration,
  Noise,
  HueSaturation,
  BrightnessContrast,
  ToneMapping,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';

type Tower = {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
};

const towerPalette = ['#10152d', '#141a36', '#1b213f', '#11162a'];
const glowPalette = ['#ffb484', '#ffd59a', '#ffe7c2', '#ff9a88'];

function useTowers(): Tower[] {
  return useMemo(() => {
    const towers: Tower[] = [];
    for (let ring = 0; ring < 3; ring++) {
      const radius = 6 + ring * 4;
      const count = 10 + ring * 2;
      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + ring * 0.1;
        const height = 12 + Math.random() * (ring === 0 ? 25 : 35);
        towers.push({
          position: [
            Math.cos(angle) * radius,
            height / 2,
            Math.sin(angle) * radius + (ring - 1) * 2,
          ],
          size: [1.5 + Math.random() * 1.2, height, 1.4 + Math.random()],
          color: towerPalette[Math.floor(Math.random() * towerPalette.length)],
        });
      }
    }
    return towers;
  }, []);
}

function TowerMesh({ data, index }: { data: Tower; index: number }) {
  const windows = useMemo(() => {
    const [w, h, d] = data.size;
    const rows = Math.floor(h / 1.2);
    const columns = Math.max(2, Math.floor(w / 0.5));
    const slots: Array<[number, number, number, number]> = [];
    for (let side = 0; side < 4; side++) {
      const isZ = side % 2 === 0;
      const dir = side < 2 ? 1 : -1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
          if (Math.random() < 0.35) continue;
          const xOffset = ((c / (columns - 1 || 1)) - 0.5) * (isZ ? w - 0.15 : d - 0.15);
          const yOffset = (r / (rows - 1 || 1) - 0.5) * (h - 1);
          const position: [number, number, number] = isZ
            ? [xOffset, yOffset, (d / 2 + 0.01) * dir]
            : [(w / 2 + 0.01) * dir, yOffset, xOffset];
          const rotation: [number, number, number] = isZ ? [0, 0, 0] : [0, Math.PI / 2, 0];
          slots.push([position[0], position[1], position[2], rotation[1]]);
        }
      }
    }
    return slots;
  }, [data.size]);

  return (
    <group position={data.position}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={data.size} />
        <meshStandardMaterial
          color={data.color}
          metalness={0.4}
          roughness={0.7}
          emissive="#050713"
          emissiveIntensity={0.25}
        />
      </mesh>
      {windows.map((win, idx) => (
        <mesh key={`${index}-win-${idx}`} position={[win[0], win[1], win[2]]} rotation={[0, win[3], 0]}>
          <planeGeometry args={[0.2, 0.45]} />
          <meshBasicMaterial color={glowPalette[(idx + index) % glowPalette.length]} />
        </mesh>
      ))}
    </group>
  );
}

function GroundGlow() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 6]}>
      <planeGeometry args={[100, 120]} />
      <meshStandardMaterial color="#060912" roughness={1} />
    </mesh>
  );
}

function Platform() {
  return (
    <group position={[0, 0.05, 8]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5, 12, 64]} />
        <meshStandardMaterial color="#11182b" roughness={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[5.5, 5.7, 64]} />
        <meshStandardMaterial color="#ffb884" emissive="#ff8c73" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

function AmbientMist() {
  const mistRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!mistRef.current) return;
    const t = clock.getElapsedTime();
    const mat = mistRef.current.material as THREE.MeshBasicMaterial;
    if (mat) {
      mat.opacity = 0.35 + Math.sin(t * 0.3) * 0.05;
    }
  });

  return (
    <mesh ref={mistRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 3, 0]}>
      <planeGeometry args={[200, 200]} />
      <meshBasicMaterial color="#141f30" transparent opacity={0.35} />
    </mesh>
  );
}

function SkyGradient() {
  return (
    <mesh position={[0, 0, -40]} rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[120, 120]} />
      <meshBasicMaterial>
        <GradientTexture
          stops={[0, 0.5, 1]}
          colors={['#05060f', '#111b3b', '#1f2850']}
          size={512}
        />
      </meshBasicMaterial>
    </mesh>
  );
}

function NeonBillboard() {
  return (
    <group position={[0, 8, -6]}>
      <mesh>
        <planeGeometry args={[8, 3]} />
        <meshBasicMaterial color="#0d101f" />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <planeGeometry args={[7.5, 2.6]} />
        <meshBasicMaterial color="#ff9a8b" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function LightBeams() {
  return (
    <group>
      {[[-6, 18, -4], [6, 20, -2]].map((pos, idx) => (
        <mesh key={`beam-${idx}`} position={pos as [number, number, number]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[1.2, 12, 32, 1, true]} />
          <meshBasicMaterial color="#ffe3b0" transparent opacity={0.08} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function CameraRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3(0, 10, 0));

  useEffect(() => {
    camera.position.set(0, 6, 20);
    camera.lookAt(target.current);
  }, [camera]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const radius = 1.5;
    const heightOffset = Math.sin(t * 0.2) * 0.4;
    camera.position.x = Math.sin(t * 0.15) * radius;
    camera.position.z = 20 + Math.cos(t * 0.12) * 0.8;
    camera.position.y = 6 + heightOffset;
    camera.lookAt(target.current);
  });

  return null;
}

export function CityScene() {
  const towers = useTowers();
  const aberrationOffset = useMemo(() => new THREE.Vector2(0.0015, 0.002), []);

  return (
    <Canvas className="cityscape-canvas" camera={{ position: [0, 6, 20], fov: 40 }} shadows>
      <CameraRig />
      <color attach="background" args={['#04060d']} />
      <fog attach="fog" args={['#060916', 60, 140]} />
      <ambientLight intensity={0.4} />
      <directionalLight position={[15, 30, 20]} intensity={1} castShadow />
      <SkyGradient />
      <GroundGlow />
      <Platform />
      <AmbientMist />
      <LightBeams />
      <NeonBillboard />
      <group position={[0, 0, 0]}>
        {towers.map((tower, idx) => (
          <TowerMesh key={`tower-${idx}`} data={tower} index={idx} />
        ))}
      </group>
      <Stars radius={140} depth={50} count={4000} factor={3} fade />
      <EffectComposer>
        <DepthOfField focusDistance={0.015} focalLength={0.017} bokehScale={4.2} height={720} />
        <Bloom
          intensity={0.7}
          luminanceThreshold={0.08}
          luminanceSmoothing={0.6}
          height={300}
        />
        <HueSaturation hue={0.07} saturation={0.12} />
        <BrightnessContrast brightness={0.02} contrast={0.15} />
        <ToneMapping adaptive={false} resolution={256} middleGrey={0.8} maxLuminance={2.5} />
        <ChromaticAberration offset={aberrationOffset} radialModulation modulationOffset={0.5} />
        <Noise premultiply opacity={0.12} />
        <Vignette eskil={false} offset={0.15} darkness={0.75} blendFunction={BlendFunction.NORMAL} />
      </EffectComposer>
    </Canvas>
  );
}
