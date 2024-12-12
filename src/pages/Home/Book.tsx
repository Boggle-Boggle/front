import { Html, useGLTF } from '@react-three/drei';

import { useEffect, useMemo, useState } from 'react';
import * as THREE from 'three';

// TODO : 테마 다양하게 두기
const colors = [0xe4b4b2, 0xe1c2a5, 0xd6c8c5, 0xb6bfbd, 0xdecdcc];
const MAX_TITLE_LEN = window.innerWidth < 400 ? 7 : 7;

type BookProps = {
  position: [number, number, number];
  title: string;
  width: number;
  page: number;
  zoomLevel: number;
};

const Book = ({ position, title, width, page, zoomLevel }: BookProps) => {
  const [fontSize, setFontSize] = useState(14);
  useGLTF.preload(`${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/book.glb`);
  const { scene } = useGLTF(`${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/book.glb`);

  const bookScene = useMemo(() => {
    const clonedScene = scene.clone();

    clonedScene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        mesh.material = new THREE.MeshStandardMaterial({
          color: colors[page % colors.length],
        });
      }
    });

    return clonedScene;
  }, [scene, page]);

  const filteredTitle = title.replace(/[^a-zA-Z0-9가-힣 ?!]/g, '');

  useEffect(() => {
    if (zoomLevel < 2) setFontSize(18);
    else if (zoomLevel < 2.5) setFontSize(16);
    else setFontSize(14);
  }, [zoomLevel]);

  return (
    <group position={position} scale={[width, 1.5, 1]}>
      <primitive object={bookScene} />
      <Html position={[0, 0, 0.035]} center>
        <div className={`flex flex-col items-center pb-2 text-[${fontSize}px] leading-none text-[#3e3b36]`}>
          {Array.from(filteredTitle.length > MAX_TITLE_LEN ? filteredTitle.slice(0, MAX_TITLE_LEN) : filteredTitle).map(
            (char) => (char === ' ' ? <div className="h-[3px]">{'\u00A0'}</div> : <div>{char}</div>),
          )}
        </div>
      </Html>
    </group>
  );
};

export default Book;
