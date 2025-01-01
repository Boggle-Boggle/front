import { FaAngleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Header from 'components/Header';

const VersionInfo = () => {
  const navigate = useNavigate();
  const cur = 'v1.0.0';
  const recent = 'v2.36.0';

  return (
    <section className="h-full bg-white">
      <Header
        leftBtn={<FaAngleLeft onClick={() => navigate('/myPage')} style={{ width: '24px', height: '24px' }} />}
        title="버전 정보"
      />
      <section className="height-content flex flex-col items-center pt-48">
        <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-main shadow-md">logo</div>
        <p className="pt-12 font-semibold">{`현재 버전 : ${cur}`}</p>
        <p className="font-semibold text-accent">{`최신 버전 : ${recent}`}</p>
      </section>
    </section>
  );
};

export default VersionInfo;
