import Button from 'components/Button';
import Modal from 'components/Modal';

import useLogout from 'hooks/useLogout';

type LogoutModalProps = {
  isOpen: boolean;
  close: () => void;
  scrollPos: number;
};

const LogoutModal = ({ isOpen, close, scrollPos }: LogoutModalProps) => {
  const { logout } = useLogout();

  return (
    <Modal isOpen={isOpen} scrollPos={scrollPos} onClose={close} hasCloseMark={false}>
      <section className="w-72 p-4 text-center">
        <p className="text-lg font-semibold">로그아웃</p>
        <p className="opacity-50">정말 로그아웃 하시겠습니까?</p>

        <section className="mt-7 grid grid-cols-2 gap-3">
          <Button handleClick={close} className="bg-main">
            취소
          </Button>
          <Button handleClick={logout}>로그아웃</Button>
        </section>
      </section>
    </Modal>
  );
};

export default LogoutModal;
