import LoginBtn from 'layouts/Login/LoginBtn';

const Login = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-main p-7">
      <h1 className="text-font text-center text-[32px]">
        <span className="font-bold">빼곡</span>하게 채우는 <br /> 나만의
        <span className="font-bold"> 책장</span>
      </h1>
      <div className="bg-main2 mb-20 mt-7 h-[400px] w-[230px]">책장</div>
      <div className="grid gap-y-3">
        <LoginBtn type="kakao" />
      </div>
      <a href="/" className="absolute bottom-5 text-xs text-neutral-500 underline">
        (아이콘) 가입/로그인 오류 문의
      </a>
    </div>
  );
};

export default Login;
