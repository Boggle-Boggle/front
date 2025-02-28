import Button from 'components/Button';
import Modal from 'components/Modal';

import useLogout from 'hooks/useLogout';

type LogoutModalProps = {
  isOpen: boolean;
  close: () => void;
  scrollPos: number;
};

// 로그아웃을 처리하는 모달
// 로컬스토리지를 비워준다.
// const LogoutModal = ({ isOpen, close, scrollPos }: LogoutModalProps) => {
//   const { logout } = useLogout();

//   return (
//     <Modal isOpen={isOpen} scrollPos={scrollPos} onClose={close} hasCloseMark={false}>
//       <section className="w-80 px-5 py-6 text-center">
//         <p className="text-lg font-semibold">로그아웃</p>
//         <p className="opacity-50">정말 로그아웃 하시겠습니까?</p>

//         <section className="mt-7 grid grid-cols-2 gap-3">
//           <Button handleClick={close} className="bg-main">
//             취소
//           </Button>
//           <Button handleClick={logout}>로그아웃</Button>
//         </section>
//       </section>
//     </Modal>
//   );
// };


const LogoutModal = ({ isOpen, close, scrollPos }: LogoutModalProps) => {
  const { logout } = useLogout();

  return (
    <Modal title="로그아웃" hasCloseMark={false} buttons={[
      { label: '취소', action:  },
      { label: '로그아웃' },
    ]}>
        <p className="opacity-50">정말 로그아웃 하시겠습니까?</p>

        <section className="mt-7 grid grid-cols-2 gap-3">
          <Button handleClick={close} className="bg-main">
            취소
          </Button>
          <Button handleClick={logout}>로그아웃</Button>
      </section>
    </Modal>
  );
};


export default LogoutModal;


