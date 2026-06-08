"use client";

import { useEffect, useRef } from "react";
import {
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import * as THREE from "three";

type MechanicalPart = {
  object: THREE.Object3D;
  assembled: THREE.Vector3;
  exploded: THREE.Vector3;
  spin: number;
};

type BoltPart = {
  object: THREE.Object3D;
  insertedZ: number;
  extractedZ: number;
  spin: number;
  delay: number;
};

function createGearGeometry(
  teeth: number,
  innerRadius: number,
  rootRadius: number,
  outerRadius: number,
  depth: number,
) {
  const shape = new THREE.Shape();
  const steps = teeth * 2;

  for (let index = 0; index <= steps; index += 1) {
    const angle = (index / steps) * Math.PI * 2;
    const radius = index % 2 === 0 ? outerRadius : rootRadius;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;

    if (index === 0) {
      shape.moveTo(x, y);
    } else {
      shape.lineTo(x, y);
    }
  }

  const hole = new THREE.Path();
  hole.absellipse(0, 0, innerRadius, innerRadius, 0, Math.PI * 2, false, 0);
  shape.holes.push(hole);

  const geometry = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: depth * 0.12,
    bevelThickness: depth * 0.12,
  });

  geometry.center();
  geometry.computeVertexNormals();

  return geometry;
}

function createGear(
  teeth: number,
  radius: number,
  depth: number,
  materials: {
    steel: THREE.Material;
    darkSteel: THREE.Material;
    brass: THREE.Material;
  },
) {
  const group = new THREE.Group();
  const bolts: BoltPart[] = [];
  const gear = new THREE.Mesh(
    createGearGeometry(
      teeth,
      radius * 0.22,
      radius * 0.82,
      radius,
      depth,
    ),
    materials.steel,
  );

  gear.castShadow = true;
  gear.receiveShadow = true;
  group.add(gear);

  const hub = new THREE.Mesh(
    new THREE.CylinderGeometry(radius * 0.32, radius * 0.38, depth * 1.28, 56),
    materials.darkSteel,
  );
  hub.rotation.x = Math.PI / 2;
  hub.castShadow = true;
  hub.receiveShadow = true;
  group.add(hub);

  const frontRing = new THREE.Mesh(
    new THREE.TorusGeometry(radius * 0.57, radius * 0.035, 12, 80),
    materials.brass,
  );
  frontRing.position.z = depth * 0.68;
  group.add(frontRing);

  const backRing = frontRing.clone();
  backRing.position.z = -depth * 0.68;
  group.add(backRing);

  for (let index = 0; index < 8; index += 1) {
    const angle = (Math.PI * 2 * index) / 8;
    const boltLength = depth * 1.05;
    const boltHeadDepth = depth * 0.32;
    const boltRadius = radius * 0.03;
    const headRadius = radius * 0.11;
    const frontFaceZ = depth * 0.62;
    const insertedZ = frontFaceZ - boltLength;
    const extractedZ = frontFaceZ + depth * 1.18;
    const boltX = Math.cos(angle) * radius * 0.48;
    const boltY = Math.sin(angle) * radius * 0.48;
    const bolt = new THREE.Group();

    const boltStem = new THREE.Mesh(
      new THREE.CylinderGeometry(
        boltRadius,
        boltRadius,
        boltLength,
        24,
      ),
      materials.steel,
    );
    boltStem.rotation.set(Math.PI / 2, 0, 0);
    boltStem.position.z = boltLength / 2;
    boltStem.castShadow = true;
    bolt.add(boltStem);

    const headBackChamfer = new THREE.Mesh(
      new THREE.CylinderGeometry(
        headRadius,
        headRadius * 0.86,
        boltHeadDepth * 0.16,
        6,
      ),
      materials.steel,
    );
    headBackChamfer.rotation.set(Math.PI / 2, 0, 0);
    headBackChamfer.position.z = boltLength + boltHeadDepth * 0.08;
    headBackChamfer.castShadow = true;
    bolt.add(headBackChamfer);

    const boltHead = new THREE.Mesh(
      new THREE.CylinderGeometry(
        headRadius,
        headRadius,
        boltHeadDepth * 0.68,
        6,
      ),
      materials.darkSteel,
    );
    boltHead.rotation.set(Math.PI / 2, 0, 0);
    boltHead.position.z = boltLength + boltHeadDepth * 0.5;
    boltHead.castShadow = true;
    bolt.add(boltHead);

    const headFrontChamfer = new THREE.Mesh(
      new THREE.CylinderGeometry(
        headRadius * 0.86,
        headRadius,
        boltHeadDepth * 0.16,
        6,
      ),
      materials.steel,
    );
    headFrontChamfer.rotation.set(Math.PI / 2, 0, 0);
    headFrontChamfer.position.z = boltLength + boltHeadDepth * 0.92;
    headFrontChamfer.castShadow = true;
    bolt.add(headFrontChamfer);

    bolt.position.set(boltX, boltY, insertedZ);
    group.add(bolt);
    bolts.push({
      object: bolt,
      insertedZ,
      extractedZ,
      spin: 0,
      delay: index * 0.01,
    });
  }

  return { group, bolts };
}

function addPart(
  parts: MechanicalPart[],
  object: THREE.Object3D,
  assembled: [number, number, number],
  exploded: [number, number, number],
  spin: number,
) {
  object.position.set(...assembled);
  parts.push({
    object,
    assembled: new THREE.Vector3(...assembled),
    exploded: new THREE.Vector3(...exploded),
    spin,
  });
}

export function HeroMechanicalBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(0);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    progressRef.current = value;
  });

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;

    if (!container || !canvas) {
      return;
    }

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    });
    const camera = new THREE.OrthographicCamera(-6, 6, 4, -4, 0.1, 100);
    const parts: MechanicalPart[] = [];
    const bolts: BoltPart[] = [];

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    camera.position.set(3.4, 3.2, 9.5);
    camera.lookAt(0, 0, 0);

    scene.add(new THREE.AmbientLight(0xffffff, 0.82));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.75);
    keyLight.position.set(4, 7, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const steel = new THREE.MeshStandardMaterial({
      color: 0xbfc3c5,
      metalness: 0.9,
      roughness: 0.28,
    });
    const darkSteel = new THREE.MeshStandardMaterial({
      color: 0x1f2428,
      metalness: 0.86,
      roughness: 0.34,
    });
    const brass = new THREE.MeshStandardMaterial({
      color: 0xb39b69,
      metalness: 0.82,
      roughness: 0.32,
    });

    const model = new THREE.Group();
    model.position.set(-0.62, -0.32, 0);
    model.rotation.x = -0.12;
    model.rotation.z = -0.1;
    scene.add(model);

    const mainGear = createGear(34, 0.78, 0.34, { steel, darkSteel, brass });
    const leftGear = createGear(28, 0.62, 0.3, { steel, darkSteel, brass });
    const rightGear = createGear(30, 0.66, 0.32, { steel, darkSteel, brass });
    const topGear = createGear(24, 0.48, 0.26, { steel, darkSteel, brass });
    const lowerGear = createGear(24, 0.5, 0.26, { steel, darkSteel, brass });

    model.add(
      mainGear.group,
      leftGear.group,
      rightGear.group,
      topGear.group,
      lowerGear.group,
    );
    bolts.push(
      ...mainGear.bolts,
      ...leftGear.bolts,
      ...rightGear.bolts,
      ...topGear.bolts,
      ...lowerGear.bolts,
    );

    addPart(parts, leftGear.group, [-1.22, 0.02, 0], [-5.6, 0.34, 0.34], -1.8);
    addPart(parts, mainGear.group, [0, 0, 0.1], [0, 0.02, 0.1], 1.2);
    addPart(parts, rightGear.group, [1.26, -0.04, 0.02], [5.45, -0.18, 0.38], -1.6);
    addPart(parts, topGear.group, [0.16, 1.05, 0.04], [-3.65, 1.78, 0.56], 1.9);
    addPart(parts, lowerGear.group, [0.12, -1.06, 0.05], [3.8, -1.76, 0.52], -1.9);

    const resize = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const aspect = width / Math.max(height, 1);
      const viewHeight = width < 768 ? 6.7 : 4.55;
      const viewWidth = viewHeight * aspect;

      camera.left = -viewWidth;
      camera.right = viewWidth;
      camera.top = viewHeight;
      camera.bottom = -viewHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);
    resize();

    let animationFrame = 0;

    const render = () => {
      const rawProgress = prefersReducedMotion ? 0 : progressRef.current;
      const progress = THREE.MathUtils.smoothstep(rawProgress, 0.04, 0.98);
      const boltTravel = THREE.MathUtils.clamp(
        (rawProgress - 0.015) / 0.98,
        0,
        1,
      );
      const quickBoltProgress = 1 - Math.pow(1 - boltTravel, 5);
      const boltProgress = quickBoltProgress * 0.72 + boltTravel * 0.28;
      model.rotation.y = -0.12;

      for (const part of parts) {
        part.object.position.lerpVectors(
          part.assembled,
          part.exploded,
          progress,
        );
        part.object.rotation.z = part.spin * progress;
        part.object.rotation.x = 0;
      }

      for (const bolt of bolts) {
        const delayedProgress = THREE.MathUtils.clamp(
          (boltProgress - bolt.delay) / (1 - bolt.delay),
          0,
          1,
        );

        bolt.object.position.z = THREE.MathUtils.lerp(
          bolt.insertedZ,
          bolt.extractedZ,
          delayedProgress,
        );
        bolt.object.rotation.z = bolt.spin;
      }

      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };

    render();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      renderer.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];

          for (const material of materials) {
            material.dispose();
          }
        }
      });
    };
  }, [prefersReducedMotion]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden bg-slate-950"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
      />
      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-950 to-transparent" />
    </div>
  );
}
