import { FaAngleLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import Button from 'components/Button';
import Header from 'components/Header';

const DeleteAccount = () => {
  const navigate = useNavigate();
  const handleGoBack = () => navigate('/myPage');

  return (
    <section className="h-full bg-white">
      <Header
        leftBtn={<FaAngleLeft onClick={handleGoBack} style={{ width: '24px', height: '24px' }} />}
        title="탈퇴하기"
      />
      <section className="height-content flex flex-col items-center justify-between">
        <section className="flex flex-col items-center pt-16">
          <img src={`${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/scared.png`} alt="" className="h-32 w-32" />
          <p className="py-9 text-2xl font-bold">정말 탈퇴하시겠습니까?</p>
          <p className="whitespace-pre-line text-center text-lg opacity-70">
            계정을 탈퇴하시면 저장된 책들과{'\n'} 작성한 독서노트 등 모든 활동 정보가 {'\n'}삭제되며 복구가 어렵습니다.
          </p>
        </section>
        <section className="grid w-full grid-cols-2 gap-3 px-5 pb-7">
          <Button handleClick={handleGoBack} className="bg-main">
            계속 이용할래요
          </Button>
          <Button handleClick={() => {}}>네 탈퇴할게요</Button>
        </section>
      </section>
    </section>
  );
};

export default DeleteAccount;
