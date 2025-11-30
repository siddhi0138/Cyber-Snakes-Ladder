
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import { OrbitControls } from '@react-three/drei';

function DiceMesh({ value, rolling }) {
  const mesh = useRef();
  // Dice face rotations for 1-6
  const rotations = [
    [0, 0, 0], // 1
    [Math.PI / 2, 0, 0], // 2
    [0, 0, Math.PI / 2], // 3
    [0, 0, -Math.PI / 2], // 4
    [-Math.PI / 2, 0, 0], // 5
    [Math.PI, 0, 0], // 6
  ];
  // Dot positions for each face (standard dice layout)
  const allDotPositions = [
    // Face 1 (z=0.5)
    { face: 1, pos: [0, 0, 0.51] },
    // Face 2 (y=0.5)
    { face: 2, pos: [-0.25, 0.51, 0.25] }, { face: 2, pos: [0.25, 0.51, -0.25] },
    // Face 3 (x=0.5)
    { face: 3, pos: [0.51, -0.25, -0.25] }, { face: 3, pos: [0.51, 0, 0] }, { face: 3, pos: [0.51, 0.25, 0.25] },
    // Face 4 (x=-0.5)
    { face: 4, pos: [-0.51, -0.25, -0.25] }, { face: 4, pos: [-0.51, 0.25, -0.25] }, { face: 4, pos: [-0.51, -0.25, 0.25] }, { face: 4, pos: [-0.51, 0.25, 0.25] },
    // Face 5 (y=-0.5)
    { face: 5, pos: [-0.25, -0.51, -0.25] }, { face: 5, pos: [0.25, -0.51, -0.25] }, { face: 5, pos: [0, -0.51, 0] }, { face: 5, pos: [-0.25, -0.51, 0.25] }, { face: 5, pos: [0.25, -0.51, 0.25] },
    // Face 6 (z=-0.5)
    { face: 6, pos: [-0.25, 0.25, -0.51] }, { face: 6, pos: [0.25, 0.25, -0.51] }, { face: 6, pos: [-0.25, 0, -0.51] }, { face: 6, pos: [0.25, 0, -0.51] }, { face: 6, pos: [-0.25, -0.25, -0.51] }, { face: 6, pos: [0.25, -0.25, -0.51] },
  ];

  useFrame(() => {
    if (rolling && mesh.current) {
      mesh.current.rotation.x += 0.2;
      mesh.current.rotation.y += 0.2;
    } else if (mesh.current) {
      const [rx, ry, rz] = rotations[value - 1];
      // Smoothly interpolate to the target rotation
      mesh.current.rotation.x = Vector3.prototype.lerp.call({x: mesh.current.rotation.x}, {x: rx}, 0.1).x;
      mesh.current.rotation.y = Vector3.prototype.lerp.call({y: mesh.current.rotation.y}, {y: ry}, 0.1).y;
      mesh.current.rotation.z = Vector3.prototype.lerp.call({z: mesh.current.rotation.z}, {z: rz}, 0.1).z;
    }
  });

  return (
    <mesh ref={mesh} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#fff" />
      {allDotPositions.map((dot, i) => (
        <mesh key={i} position={dot.pos}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial color="black" />
        </mesh>
      ))}
    </mesh>
  );
}

export default function Dice({ onRoll, disabled }) {
  const [value, setValue] = useState(1);
  const [rolling, setRolling] = useState(false);

  const handleRoll = () => {
    if (rolling || disabled) return;
    setRolling(true);
  };

  useEffect(() => {
    if (!rolling) return;

    // Play dice rolling sound.
    // NOTE: You will need to add a sound file at `public/sounds/dice-roll.mp3`
    const audio = new Audio('/sounds/dice-roll.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => console.warn('Dice sound could not be played.'));

    const spinDuration = 1000; // 1 second of spinning
    const spinInterval = 50;
    let elapsed = 0;

    const timer = setInterval(() => {
      setValue(Math.floor(Math.random() * 6) + 1);
      elapsed += spinInterval;
      if (elapsed >= spinDuration) {
        clearInterval(timer);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setValue(finalValue);
        setRolling(false);
        onRoll(finalValue);
      }
    }, spinInterval);

    return () => clearInterval(timer);
  }, [rolling, onRoll]);

  return (
    <div style={{ width: 150, height: 150, position: 'relative' }}>
      <Canvas camera={{ position: [2, 2, 2] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} />
        <DiceMesh value={value} rolling={rolling} />
      </Canvas>
      <button
        style={{ position: 'absolute', bottom: 10, left: '50%', transform: 'translateX(-50%)' }}
        onClick={handleRoll}
        disabled={disabled || rolling}
      >
        {rolling ? 'Rolling...' : 'Roll Dice'}
      </button>
    </div>
  );
}
