const LOGIN_TYPE = {
  kakao: {
    title: '카카오',
    imgUrl: 'src/assets/icons/kakao_login.png',
    redirect: '',
    color: 'bg-[#FCE51E]',
  },
};

type LoginType = typeof LOGIN_TYPE;

type LoginBtnProps = {
  type: keyof LoginType;
};

const LoginBtn = ({ type }: LoginBtnProps) => {
  const { title, imgUrl, color } = LOGIN_TYPE[type];

  const handleClick = () => {
    const baseUrl = import.meta.env.VITE_SERVER_BASE_URL;
    const apiPath = `/oauth2/authorization/kakao?redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URL}`;

    window.location.href = baseUrl + apiPath;
  };

  return (
    <button
      type="submit"
      className={`h-[50px] w-[345px] border-spacing-3 rounded-lg ${color} flex items-center justify-center drop-shadow`}
      onClick={handleClick}
    >
      <span>
        <img alt={`${title}로그인`} src={imgUrl} className="h-[18px] w-[18px]" />
      </span>
      <p className="pl-5 text-base">{title}로 로그인</p>
    </button>
  );
};

export default LoginBtn;
