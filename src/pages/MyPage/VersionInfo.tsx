import { useNavigate } from 'react-router-dom';

import Header from 'components/Header';
import Icon from 'components/Icon';

import { CommonBack } from 'assets/icons';

// 버전 정보를 보여주는 컴포넌트
// 버전 정보는 추후 수정될 예정
// ? : 근데 이거 .. 웹뷰는 버전관리를 어덯게 하는게맞는지 ?
const VersionInfo = () => {
  const navigate = useNavigate();
  const cur = 'v1.0.0';
  const recent = 'v2.36.0';

  return (
    <section className="relative h-full bg-white">
      <Header
        leftBtn={
          <button type="button" onClick={() => navigate(-1)} aria-label="뒤로가기">
            <Icon Component={CommonBack} />
          </button>
        }
        title="버전 정보"
      />
      <section className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center">
        <div className="flex h-28 w-28 items-center justify-center rounded-xl bg-main shadow-md">logo</div>
        <p className="pt-12 font-semibold">{`현재 버전 : ${cur}`}</p>
        <p className="font-semibold text-accent">{`최신 버전 : ${recent}`}</p>
      </section>
    </section>
  );
};

export default VersionInfo;
