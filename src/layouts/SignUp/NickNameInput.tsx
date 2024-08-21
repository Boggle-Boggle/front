import { useEffect } from 'react';
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

import Header from 'components/ui/Header';

import useNickNameInput from 'hooks/useNickNameInput';

import { MAX_KOR_NICKNAME_LEN, MAX_ENG_NICKNAME_LEN } from 'constants/index';

import SignUpBtn from './SignUpBtn';

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
        <h1 className="text-decoration: solid #888888; text-[32px] font-semibold underline">
          빼곡에서
          <br /> 사용할 닉네임을
          <br /> 작성해주세요
        </h1>
        <p className="pb-10 pt-2 text-[13px] text-neutral-500">
          한글 최대 {MAX_KOR_NICKNAME_LEN}글자 / 영문 최대 {MAX_ENG_NICKNAME_LEN}글자
          <br /> 공백, 특수기호 사용 불가
        </p>
        <form className="relative flex-grow">
          <div className="h-10 w-full border-b-4 border-[#747264]">
            <input
              className="h-full w-full text-lg font-semibold focus:outline-none"
              value={nickName}
              onChange={handleInput}
            />
            <p className={`mt-2 ${isValid ? 'text-blue-600' : 'text-red-600'}`}>{message}</p>
          </div>
          <div className={`absolute bottom-0 w-full ${!isValid && 'opacity-30'}`}>
            <SignUpBtn onClick={handleNext} type="닉네임입력" />
          </div>
        </form>
      </section>
    </>
  );
};

export default NickNameInput;
