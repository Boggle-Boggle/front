/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { Html, useGLTF } from '@react-three/drei';

import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

// TODO : 테마 다양하게 두기
const colors = [0xe4b4b2, 0xe1c2a5, 0xd6c8c5, 0xb6bfbd, 0xdecdcc];

type BookProps = {
  position: [number, number, number];
  title: string;
  width: number;
  page: number;
  readingRecordId: number;
};

const Book = ({ position, title, width, page, readingRecordId }: BookProps) => {
  useGLTF.preload(`${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/book.glb`);
  const { scene } = useGLTF(`${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/book.glb`);
  const navigate = useNavigate();

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

  const MAX_TITLE_LEN = window.innerWidth < 400 ? 8 : 10;
  const filteredTitle = title.replace(/[^a-zA-Z0-9가-힣 ?!]/g, '');

  const handleNavigate = () => {
    navigate(`/record/${readingRecordId}`);
  };

  return (
    <group position={position} scale={[width, 1.5, 1]}>
      <primitive object={bookScene} />
      <Html position={[0, 0, 0.035]} center>
        <div
          className="font-book flex h-[100px] w-[22px] flex-col items-center justify-center pb-2 text-[14.5px] leading-[0.85] text-[#5a5a5a]"
          onClick={handleNavigate}
        >
          {Array.from(filteredTitle.length > MAX_TITLE_LEN ? filteredTitle.slice(0, MAX_TITLE_LEN) : filteredTitle).map(
            (char) => (char === ' ' ? <div className="h-[4px]">{'\u00A0'}</div> : <div>{char}</div>),
          )}
        </div>
      </Html>
    </group>
  );
};

export default Book;
