import { useReducer } from 'react';
import { useNavigate } from 'react-router-dom';

import Alert from 'components/Alert';
import Button from 'components/Button';
import Header from 'components/Header';
import Highlight from 'components/Highlight';
import Icon from 'components/Icon';
import { ArrowBack, Home } from 'components/icons';

import useDevice from 'hooks/useDevice';

import { CommonBack, CommonNext } from 'assets/icons';

type NickNameInputProps = {
  nickName: string;
  changeNickName: (name: string) => void;
  saveNickName: () => void;
};

const NickNameInput = ({ nickName, changeNickName, saveNickName }: NickNameInputProps) => {
  const [isAlertActive, handleAlertActive] = useReducer((prev) => !prev, false);

  const { isIOS } = useDevice();
  const navigate = useNavigate();

  const handleLeftBtnClick = () => navigate('/login');
  const handleNext = async (e: React.FormEvent) => {
    e.preventDefault();
    saveNickName();
  };

  return (
    <>
      {isAlertActive && (
        <Alert message={`사용중인 닉네임이에요 \n다른 닉네임을 입력해주세요`} onClose={handleAlertActive} />
      )}

      <Home className="h-6 w-6" />
      <ArrowBack className="h-6 w-6" />
      <Header
        title={<>회원가입</>}
        leftBtn={
          <button onClick={handleLeftBtnClick} type="button" aria-label="뒤로가기">
            <Icon Component={CommonBack} />
          </button>
        }
      />
      <section
        className={` ${isIOS ? 'height-without-headerIOS' : 'height-without-headerAnd'} flex w-full flex-col p-9`}
      >
        <h1 className="text-[2rem] font-semibold leading-[3rem]">
          <span className="relative inline-block">
            <span className="relative z-10">빼곡에서</span>
            <Highlight />
          </span>
          <br />
          <span className="relative inline-block">
            <span className="relative z-10">사용할 닉네임</span>
            <Highlight />
          </span>
          을
          <br /> 작성해주세요
        </h1>
        <p className="pb-10 pt-2 text-sm opacity-50">최대 15글자까지 입력할 수 있어요</p>
        <form className="relative flex-grow">
          <div className="h-10 w-full border-b-4 border-accent">
            <input
              className="h-full w-full text-lg font-semibold"
              value={nickName}
              onChange={(e) => changeNickName(e.target.value)}
            />
          </div>
          <div className="absolute bottom-0 w-full">
            <Button handleClick={handleNext}>
              다음
              <span>
                <Icon Component={CommonNext} size="sm" />
              </span>
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NickNameInput;
