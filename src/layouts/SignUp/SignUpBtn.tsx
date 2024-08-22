import { GoChevronRight } from 'react-icons/go';

type SignUpBtnType = {
  onClick: (e: React.FormEvent) => void;
  type: '닉네임입력' | '약관동의';
};

const SignUpBtn = ({ onClick, type }: SignUpBtnType) => {
  return (
    <button
      type="submit"
      className="flex h-[50px] w-full border-spacing-3 items-center justify-center rounded-lg bg-[#747264] drop-shadow"
      onClick={onClick}
    >
      {type === '닉네임입력' && (
        <>
          <p className="font-semibold text-white">다음</p>
          <span>
            <GoChevronRight style={{ color: 'white' }} />
          </span>
        </>
      )}
      {type === '약관동의' && <p className="font-semibold text-white">빼곡 시작하기</p>}
    </button>
  );
};

export default SignUpBtn;
