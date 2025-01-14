/* eslint-disable react/no-unknown-property */
import { Html } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

import { Suspense, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

import Button from 'components/Button';
import Highlight from 'components/Highlight';

import { agreeTerms, getRefresh, updateNickname } from 'services/user';

import { AgreementStatus } from 'types/user';

type CompleteProps = {
  nickName: string;
  terms: AgreementStatus[];
  scene: THREE.Group<THREE.Object3DEventMap>;
};

const Complete = ({ nickName, terms, scene }: CompleteProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!scene) return;

    scene.scale.set(2.3, 2.3, 1);

    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);
    scene.position.sub(center);
  }, [scene]);

  useEffect(() => {
    const completeSignUp = async () => {
      try {
        await updateNickname(nickName);
        await agreeTerms(terms);
        await getRefresh();
      } catch (error) {
        // TODO : 위의 상황에서 에러 발생시 로그인 페이지로 이동(각각확인)
        navigate('/login');
      }
    };

    completeSignUp();
  }, [nickName, terms, navigate]);

  return (
    <section className="flex h-dvh w-full flex-col justify-center p-9 py-14">
      <h1 className="text-[32px] font-semibold text-text">
        <span className="relative inline-block">
          <span className="relative z-10">회원가입이</span>
          <Highlight />
        </span>
        <br />
        <span className="relative inline-block">
          <span className="relative z-10">완료되었습니다.</span>
          <Highlight />
        </span>
      </h1>
      <p className="py-2 text-sm text-sub">빼곡을 이용할 준비가 되셨나요?</p>

      <section className="h-3/5 flex-grow px-4">
        <Canvas shadows>
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

      <Button handleClick={() => navigate('/')}>나만의 책장 만들기</Button>
    </section>
  );
};

export default Complete;
