import { useNavigate } from 'react-router-dom';

import Header from 'components/Header';

import LogoImg from 'assets/img/logo.png';

const VersionInfo = () => {
  const navigate = useNavigate();
  const cur = 'v1.0.0';
  const recent = 'v1.0.0';

  return (
    <section className="relative h-full bg-white">
      <Header leftBtn={<button type="button" onClick={() => navigate(-1)} aria-label="뒤로가기" />} title="버전 정보" />
      <section className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center">
        <img
          src={LogoImg}
          className="flex h-28 w-28 items-center justify-center rounded-xl bg-main object-cover shadow-md"
          alt=""
        />
        <p className="pt-12 font-semibold">{`현재 버전 : ${cur}`}</p>
        <p className="font-semibold text-accent">{`최신 버전 : ${recent}`}</p>
      </section>
    </section>
  );
};

export default VersionInfo;
