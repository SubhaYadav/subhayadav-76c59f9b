import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import * as THREE from "three";
import { SectionHeader } from "./SectionHeader";

const TECHS = [
  "HTML", "CSS", "JavaScript", "React", "Tailwind CSS",
  "Python", "Firebase", "SQL", "GitHub", "AI/ML",
];

function TechSphere() {
  const group = useRef<THREE.Group>(null);
  const points: THREE.Vector3[] = [];
  const N = TECHS.length;
  for (let i = 0; i < N; i++) {
    const phi = Math.acos(-1 + (2 * i) / N);
    const theta = Math.sqrt(N * Math.PI) * phi;
    const r = 1.8;
    points.push(
      new THREE.Vector3(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      ),
    );
  }

  useFrame((_, dt) => {
    if (group.current) {
      group.current.rotation.y += dt * 0.25;
      group.current.rotation.x += dt * 0.08;
    }
  });

  return (
    <group ref={group}>
      {points.map((p, i) => (
        <mesh key={i} position={p}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#dc3c46" />
        </mesh>
      ))}
      {points.map((p, i) => (
        <line key={`l-${i}`}>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([0, 0, 0, p.x, p.y, p.z])}
              itemSize={3}
              args={[new Float32Array([0, 0, 0, p.x, p.y, p.z]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#dc3c46" transparent opacity={0.25} />
        </line>
      ))}
      <mesh>
        <sphereGeometry args={[1.8, 32, 32]} />
        <meshBasicMaterial color="#dc3c46" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

export function Arsenal() {
  return (
    <section id="arsenal" className="relative px-6 py-32 md:py-40">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          index="02"
          title="ARSENAL"
          subtitle="The stack I command — from raw fundamentals to intelligent systems."
        />

        <div className="grid gap-10 md:grid-cols-5 md:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative aspect-square md:col-span-2"
          >
            <div className="absolute inset-0 rounded-full bg-crimson/10 blur-3xl" />
            <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
              <Suspense fallback={null}>
                <TechSphere />
              </Suspense>
            </Canvas>
          </motion.div>

          <div className="grid grid-cols-2 gap-3 md:col-span-3 md:grid-cols-3">
            {TECHS.map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                whileHover={{ y: -4 }}
                className="group glass relative overflow-hidden rounded-xl p-5 transition-all hover:border-crimson/60"
              >
                <div className="absolute -right-8 -top-8 h-16 w-16 rounded-full bg-crimson/20 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="relative">
                  <div className="font-display text-[0.6rem] tracking-[0.3em] text-crimson">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-2 font-display text-base font-bold tracking-wide text-foreground md:text-lg">
                    {t}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
