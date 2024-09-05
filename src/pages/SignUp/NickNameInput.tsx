import { useEffect } from 'react';
import { GoArrowLeft, GoChevronRight } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

import Button from 'components/ui/Button';
import Header from 'components/ui/Header';

import useNickNameInput from 'hooks/useNickNameInput';

import { MAX_KOR_NICKNAME_LEN, MAX_ENG_NICKNAME_LEN } from 'constants/index';

type NickNameInputProps = {
  nickName: string;
  setNickName: React.Dispatch<React.SetStateAction<string>>;
  onNext: () => void;
};

const NickNameInput = ({ nickName, setNickName, onNext }: NickNameInputProps) => {
  const { message, isValid, validateNickName } = useNickNameInput();
  const navigate = useNavigate();

  const handleLeftBtnClick = () => navigate('/login');

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickName(e.target.value);
  };

  useEffect(() => {
    validateNickName(nickName);
  }, [nickName, validateNickName]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    onNext();
  };

  return (
    <>
      <Header
        title={{ text: '회원가입' }}
        leftBtn={{
          icon: <GoArrowLeft style={{ width: '24px', height: '24px' }} />,
          handleLeftBtnClick,
        }}
      />
      <section className="height-without-header flex w-full flex-col p-9">
        <h1 className="text-text text-[32px] font-semibold">
          <span className="relative inline-block">
            <span className="relative z-10">빼곡에서</span>
            <span className="bg-accent absolute bottom-1 left-0 h-3 w-full opacity-50" />
            <span className="bg-accent absolute bottom-1 right-0 h-3 w-1 opacity-50" />
          </span>
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">사용할 닉네임</span>
            <span className="bg-accent absolute bottom-1 left-0 h-3 w-full opacity-50" />
            <span className="bg-accent absolute bottom-1 right-0 h-3 w-1 opacity-50" />
          </span>
          을
          <br /> 작성해주세요
        </h1>
        <p className="text-sub pb-10 pt-2 text-sm">
          한글 최대 {MAX_KOR_NICKNAME_LEN}글자 / 영문 최대 {MAX_ENG_NICKNAME_LEN}글자
          <br /> 공백, 특수기호 사용 불가
        </p>
        <form className="relative flex-grow">
          <div className="border-accent h-10 w-full border-b-4">
            <input
              className="h-full w-full bg-main text-lg font-semibold focus:outline-none"
              value={nickName}
              onChange={handleInput}
            />
            <p className={`mt-2 ${isValid ? 'text-green' : 'text-red'}`}>
              <span className="text-sm">
                {isValid ? (
                  <img
                    alt="유효성 검사 통과"
                    src="src/assets/icons/nickname_check.png"
                    className="mr-2 inline h-[18px] w-[18px]"
                  />
                ) : (
                  <img
                    alt="유효성 검사 실패"
                    src="src/assets/icons/nickname_uncheck.png"
                    className="mr-2 inline h-[18px] w-[18px]"
                  />
                )}
              </span>
              {message}
            </p>
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
