import { Html, OrbitControls, OrbitControlsChangeEvent, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useQuery } from '@tanstack/react-query';

import { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';

import Loading from 'pages/Loading';

import { getBookCase } from 'services/record';

import Book from './Book';

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
  const startX = -0.62;
  const startY = 0.815;
  const rowHeight = 0.575;
  const cameraZPosition = window.innerWidth < 350 ? 3 : 2.5;
  const [zoomLevel, setZoomLevel] = useState<number>(cameraZPosition);

  useGLTF.preload(`${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/bookshelf.glb`);
  const { scene } = useGLTF(`${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/bookshelf.glb`);

  const { data: books } = useQuery({
    queryKey: ['book'],
    queryFn: () => getBookCase(),
  });

  const getZoomLevel = (e?: OrbitControlsChangeEvent) => {
    if (!e) return;

    const controls = e.target;
    const distance = controls.object.position.z;

    setZoomLevel(distance);
  };

  useEffect(() => {
    if (!scene) return;

    scene.scale.set(1, 1.2, 1);

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);
  }, [scene]);

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Canvas camera={{ position: [0, 0, cameraZPosition] }}>
        <ambientLight intensity={1.7} />
        <directionalLight position={[7.5, 5, 7.5]} intensity={1} />
        <Suspense
          fallback={
            <Html center>
              <Loading />
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
                  <Book
                    position={[xPosition, yPosition, 0.1]}
                    title={title}
                    width={width}
                    page={page}
                    zoomLevel={zoomLevel}
                  />,
                );

                if (acc.previousX > 0.56) {
                  acc.previousY = yPosition - rowHeight;
                  acc.previousX = startX;
                }

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
          enableZoom
          minDistance={1.5}
          maxDistance={cameraZPosition}
          onChange={(e) => getZoomLevel(e)}
        />
      </Canvas>
    </div>
  );
};

export default BookCase;
