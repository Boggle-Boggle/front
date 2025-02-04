/* eslint-disable no-param-reassign */
/* eslint-disable react/no-unknown-property */
import { Html, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { Suspense, useEffect } from 'react';
import * as THREE from 'three';

import Icon from 'components/Icon';

import { LoginConsultation } from 'assets/icons';

import LoginBtn from './LoginBtn';

const Login = () => {
  const { scene } = useGLTF(`${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/Splash.glb`);

  useEffect(() => {
    if (!scene) return;

    scene.scale.set(3, 3, 1);

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);

    scene.traverse((child) => {
      child.castShadow = true;
      child.receiveShadow = true;
    });
  }, [scene]);

  return (
    <div className="bottom-3 flex h-screen flex-col items-center justify-center bg-[#CBBAB9] py-[5.5rem]">
      <h1 className="text-font text-center text-[32px] text-white">
        <span className="font-bold">빼곡</span>하게 채우는 <br /> 나만의
        <span className="font-bold"> 책장</span>
      </h1>
      <section className="my-4 h-full w-full flex-grow">
        <Canvas
          shadows
          gl={{
            antialias: true,
            shadowMapType: THREE.PCFSoftShadowMap,
          }}
          onCreated={({ gl }) => {
            gl.setClearColor('#CBBAB9');
          }}
        >
          <ambientLight intensity={1.2} />
          <directionalLight castShadow intensity={2.3} position={[-9, 5, 11.5]} />
          <Suspense
            fallback={
              <Html center>
                <div>로딩 중...</div>
              </Html>
            }
          >
            <primitive object={scene} />
          </Suspense>
          <mesh receiveShadow position={[-4, -3, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[40, 40]} />
            <shadowMaterial opacity={0.04} />
          </mesh>
        </Canvas>
      </section>

      <p className="pb-4 text-xs opacity-50">SNS계정으로 간편하게 로그인</p>
      <div className="flex h-24 w-[70%] justify-around">
        <LoginBtn type="kakao" />
        <LoginBtn type="google" />
        <LoginBtn type="apple" />
      </div>
      <a href="/" className="absolute bottom-8 flex items-center text-xs underline opacity-50">
        <Icon Component={LoginConsultation} size="sm" style={{ marginRight: '5px' }} />
        가입/로그인 오류 문의
      </a>
    </div>
  );
};

export default Login;
