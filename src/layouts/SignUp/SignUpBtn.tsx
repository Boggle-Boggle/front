import { GoChevronRight } from 'react-icons/go';

type SignUpBtnType = {
  onClick: (e: React.FormEvent) => void;
};

const SignUpBtn = ({ onClick }: SignUpBtnType) => {
  return (
    <button
      type="submit"
      className="flex h-[50px] w-full border-spacing-3 items-center justify-center rounded-lg bg-[#747264] drop-shadow"
      onClick={onClick}
    >
      <p className="font-semibold text-white">다음</p>
      <span>
        <GoChevronRight style={{ color: 'white' }} />
      </span>
    </button>
  );
};

export default SignUpBtn;
