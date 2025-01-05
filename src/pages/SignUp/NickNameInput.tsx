import { GoArrowLeft, GoChevronRight } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

import Button from 'components/Button';
import Header from 'components/Header';

import { isDuplicateNickname } from 'services/user';

type NickNameInputProps = {
  nickName: string;
  isValid: boolean;
  onNext: () => void;
  updateNickName: (name: string) => void;
};

const NickNameInput = ({ nickName, isValid, updateNickName, onNext }: NickNameInputProps) => {
  const navigate = useNavigate();

  const handleLeftBtnClick = () => navigate('/login');

  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;

    const isDuplicated = await isDuplicateNickname(nickName);

    if (isDuplicated) {
      alert(`사용중인 닉네임입니다.\n다른 닉네임을 입력해주세요`);
      return;
    }

    onNext();
  };

  return (
    <>
      <Header
        title={<>회원가입</>}
        leftBtn={<GoArrowLeft style={{ width: '24px', height: '24px' }} onClick={handleLeftBtnClick} />}
      />
      <section className="height-without-header flex w-full flex-col p-9">
        <h1 className="text-[32px] font-semibold text-text">
          <span className="relative inline-block">
            <span className="relative z-10">빼곡에서</span>
            <span className="absolute bottom-1 left-0 h-3 w-full bg-accent opacity-50" />
            <span className="absolute bottom-1 right-0 h-3 w-1 bg-accent opacity-50" />
          </span>
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">사용할 닉네임</span>
            <span className="absolute bottom-1 left-0 h-3 w-full bg-accent opacity-50" />
            <span className="absolute bottom-1 right-0 h-3 w-1 bg-accent opacity-50" />
          </span>
          을
          <br /> 작성해주세요
        </h1>
        <p className="pb-10 pt-2 text-sm text-sub">최대 15글자까지 입력할 수 있어요</p>
        <form className="relative flex-grow">
          <div className="h-10 w-full border-b-4 border-accent">
            <input
              className="h-full w-full text-lg font-semibold"
              value={nickName}
              onChange={(e) => updateNickName(e.target.value)}
            />
          </div>
          <div className="absolute bottom-0 w-full">
            <Button handleClick={handleNext} disabled={!isValid}>
              다음
              <span>
                <GoChevronRight style={{ color: 'white' }} />
              </span>
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NickNameInput;
