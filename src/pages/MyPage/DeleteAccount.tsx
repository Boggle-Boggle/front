import { useNavigate } from 'react-router-dom';
import useAuthStore from 'stores/useAuthStore';

import Button from 'components/Button';
import Header from 'components/Header';
import Icon from 'components/Icon';

import useDevice from 'hooks/useDevice';
import { deleteAccount } from 'services/user';

import { CommonBack } from 'assets/icons';
import deleteAccountImg from 'assets/img/delete_account.svg';

const DeleteAccount = () => {
  const { isIOS } = useDevice();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const handleGoBack = () => navigate('/myPage');

  const handleDeleteAccount = async () => {
    await deleteAccount();
    logout();
    navigate('/login');
  };

  return (
    <section className="h-full bg-white">
      <Header
        leftBtn={
          <button type="button" aria-label="뒤로가기" onClick={handleGoBack}>
            <Icon Component={CommonBack} size="sm" />
          </button>
        }
        title="탈퇴하기"
      />
      <section
        className={`${isIOS ? 'height-without-headerIOS' : 'height-without-headerAnd'} flex flex-col items-center justify-between`}
      >
        <section className="flex flex-col items-center pt-28">
          <img src={deleteAccountImg} alt="" className="h-28" />
          <p className="py-9 text-2xl font-bold">정말 탈퇴하시겠습니까?</p>
          <p className="whitespace-pre-line text-center text-lg opacity-70">
            계정을 탈퇴하시면 저장된 책들과{'\n'} 작성한 독서노트 등 모든 활동 정보가 {'\n'}삭제되며 복구가 어렵습니다.
          </p>
        </section>
        <section className="grid w-full grid-cols-2 gap-3 px-5 pb-7">
          <Button handleClick={handleGoBack} className="bg-main">
            계속 이용할래요
          </Button>
          <Button handleClick={handleDeleteAccount}>네 탈퇴할게요</Button>
        </section>
      </section>
    </section>
  );
};

export default DeleteAccount;
