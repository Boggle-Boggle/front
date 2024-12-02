import { useMemo } from 'react';
import { Html, useGLTF } from '@react-three/drei';

import * as THREE from 'three';

// TODO : 테마 다양하게 두기
const colors = [0xe4b4b2, 0xe1c2a5, 0xd6c8c5, 0xb6bfbd, 0xdecdcc];
const MAX_TITLE_LEN = window.innerWidth < 400 ? 7 : 9;
const FONT_SIZE = window.innerHeight < 600 ? 6 : 8;

type BookProps = {
  position: [number, number, number];
  title: string;
  width: number;
  page: number;
};

const Book = ({ position, title, width, page }: BookProps) => {
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

  return (
    <group position={position} scale={[width, 1.4, 1]}>
      <primitive object={bookScene} />
      <Html position={[0, 0, 0.035]} center>
        <div className={`flex flex-col items-center pb-2 text-[${FONT_SIZE}px] leading-[16px] text-[#3e3b36]`}>
          {Array.from(filteredTitle.length > MAX_TITLE_LEN ? filteredTitle.slice(0, MAX_TITLE_LEN) : filteredTitle).map(
            (char) => (char === ' ' ? <div className="h-[3px]">{'\u00A0'}</div> : <div>{char}</div>),
          )}
          {filteredTitle.length > MAX_TITLE_LEN && (
            <div className="absolute bottom-[7px]">
              <div className="h-[2px]">.</div>
              <div className="h-[2px]">.</div>
              <div className="h-[2px]">.</div>
            </div>
          )}
        </div>
      </Html>
    </group>
  );
};

export default Book;
