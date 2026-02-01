import { IconHeadphone } from 'components/icons';
import Highlight from 'components/refactor/Highlight';

import LoginBtn from './LoginBtn';

const Login = () => {
  return (
    <div className="h-dvh w-full text-center">
      <h1 className="pt-10 text-2xl text-h3">
        <Highlight>빼곡하게 채우는</Highlight>
        <p className="text-h1">나만의 책장</p>
      </h1>

      <div className="flex h-[450px] w-full items-center justify-center bg-secondary-light opacity-40">
        임시 책장 영역
      </div>

      <div className="flex w-full items-center gap-5 px-mobile">
        <span className="h-px flex-1 bg-neutral-100" />
        SNS로 간편로그인
        <span className="h-px flex-1 bg-neutral-100" />
      </div>

      <div className="mt-6 flex w-full justify-center gap-8">
        <LoginBtn type="kakao" isRecent />
        <LoginBtn type="google" isRecent={false} />
        <LoginBtn type="apple" isRecent={false} />
      </div>

      {/* 
        TODO : 로그인 API 연동시 로딩상태/에러핸들링 구현
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <LoginBtn type="kakao" setIsLoading={setIsLoading} />
            <LoginBtn type="google" setIsLoading={setIsLoading} />
            <LoginBtn type="apple" setIsLoading={setIsLoading} />
          </>
        )} */}

      <a
        href={import.meta.env.VITE_MYPAGE_FORM_URL}
        className="absolute bottom-[10px] mx-auto flex w-full items-center justify-center pb-safe-bottom text-caption2 text-neutral-60"
      >
        <IconHeadphone />
        가입/로그인 오류 문의하기
      </a>
    </div>
  );
};

export default Login;
