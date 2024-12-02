import * as THREE from 'three';
import { Suspense, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls, useGLTF } from '@react-three/drei';

import { getBookCase } from 'services/record.ts';

import Book from './Book.tsx';

const getBookProperties = (page: number) => {
  if (page <= 100) return { width: 0.7, offset: 0.07 };
  if (page <= 200) return { width: 0.9, offset: 0.09 };
  if (page <= 300) return { width: 1.1, offset: 0.11 };
  if (page <= 400) return { width: 1.3, offset: 0.13 };
  if (page <= 500) return { width: 1.5, offset: 0.15 };
  if (page <= 600) return { width: 1.7, offset: 0.17 };
  if (page <= 700) return { width: 1.9, offset: 0.19 };
  return { width: 2.1, offset: 0.21 };
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
  const startY = 0.8;
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
