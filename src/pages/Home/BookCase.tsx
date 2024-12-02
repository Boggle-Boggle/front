import * as THREE from 'three';
import { useMemo, Suspense, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, useGLTF } from '@react-three/drei';

import { getBookCase } from 'services/record.ts';

import Book from './Book.tsx';

const getBookProperties = (page: number) => {
  if (page <= 50) return { width: 0.55, offset: 0.045 };
  if (page <= 100) return { width: 0.5, offset: 0.05 };
  if (page <= 150) return { width: 0.55, offset: 0.055 };
  if (page <= 200) return { width: 0.6, offset: 0.06 };
  if (page <= 250) return { width: 0.65, offset: 0.065 };
  if (page <= 300) return { width: 0.7, offset: 0.07 };
  if (page <= 350) return { width: 0.75, offset: 0.075 };
  if (page <= 400) return { width: 0.8, offset: 0.08 };
  if (page <= 450) return { width: 0.85, offset: 0.085 };
  if (page <= 500) return { width: 0.9, offset: 0.09 };
  if (page <= 550) return { width: 0.95, offset: 0.095 };
  if (page <= 600) return { width: 1.0, offset: 0.1 };
  if (page <= 650) return { width: 1.05, offset: 0.105 };
  if (page <= 700) return { width: 1.1, offset: 0.11 };
  if (page <= 750) return { width: 1.15, offset: 0.115 };
  if (page <= 800) return { width: 1.2, offset: 0.12 };
  if (page <= 850) return { width: 1.25, offset: 0.125 };
  if (page <= 900) return { width: 1.3, offset: 0.13 };
  if (page <= 950) return { width: 1.35, offset: 0.135 };

  return { width: 1.4, offset: 0.14 };
};

const BookCase = () => {
  useGLTF.preload(`${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/bookshelf.glb`);
  const { scene } = useGLTF(`${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/bookshelf.glb`);

  const { data: books } = useQuery({
    queryKey: ['book'],
    queryFn: () => getBookCase(),
  });

  useEffect(() => {
    if (!scene) return;

    scene.scale.set(1, 1.2, 1);

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);
  }, [scene]);

  const startX = books && books.length > 0 ? -0.62 + Math.min(Math.ceil(books[0].page / 100), 20) * 0.005 : 0;
  const startY = 0.735;
  const cameraZPosition = window.innerWidth < 350 ? 3 : 2.5;

  return (
    <div className="h-full w-full items-center justify-center">
      <Canvas camera={{ position: [0, 0, cameraZPosition] }}>
        <ambientLight intensity={1.7} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        {/* TODO : 로딩중 Fallback */}
        <Suspense
          fallback={
            <Html center>
              <div> fh로딩</div>
            </Html>
          }
        >
          <primitive object={scene} />
          {books &&
            books.reduce<{ previousX: number; previousY: number; elements: React.ReactNode[] }>(
              (acc, { title, page }) => {
                const { width, offset } = getBookProperties(page);
                const xPosition = acc.previousX + offset / 2;
                const yPosition = acc.previousY;

                acc.previousX = xPosition + offset / 2;

                acc.elements.push(
                  <Book position={[xPosition, yPosition, 0.1]} title={title} width={width} page={page} />,
                );

                return acc;
              },
              { previousX: startX, previousY: startY, elements: [] },
            ).elements}
        </Suspense>

        <OrbitControls
          enableRotate={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enableZoom={true}
          minDistance={1.5}
          maxDistance={cameraZPosition}
        />
      </Canvas>
    </div>
  );
};

export default BookCase;
