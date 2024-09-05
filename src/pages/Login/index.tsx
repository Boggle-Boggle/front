import LoginBtn from './LoginBtn';

const Login = () => {
  return (
    <div className="bottom-3 flex h-screen flex-col items-center justify-center bg-[#CBBAB9] p-7">
      <h1 className="text-center text-[32px] text-font text-main">
        <span className="font-bold">빼곡</span>하게 채우는 <br /> 나만의
        <span className="font-bold"> 책장</span>
      </h1>
      <div className="mb-20 mt-7 h-[400px] w-[230px] bg-main2">책장</div>
      <div className="grid gap-y-3">
        <LoginBtn type="kakao" />
      </div>
      <a href="/" className="text-sub absolute bottom-5 text-xs underline">
        (아이콘) 가입/로그인 오류 문의
      </a>
    </div>
  );
};

export default Login;