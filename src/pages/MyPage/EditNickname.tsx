import { useReducer } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Alert from 'components/Alert';
import Button from 'components/Button';
import Header from 'components/Header';
import Icon from 'components/Icon';

import useDevice from 'hooks/useDevice';
import useNickNameInput from 'hooks/useNickNameInput';

import { CommonBack } from 'assets/icons';
import ProfileImg from 'assets/img/profile.png';

const EditNickname = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { isIOS } = useDevice();
  const [isAlertActive, handleAlertActive] = useReducer((prev) => !prev, false);
  const { nickname } = location.state;
  const { nickName, changeNickName, saveNickName } = useNickNameInput(nickname, handleAlertActive, () => {
    navigate('/myPage');
  });

  return (
    <>
      {isAlertActive && (
        <Alert message={`사용중인 닉네임이에요 \n다른 닉네임을 입력해주세요`} onClose={handleAlertActive} />
      )}
      <section className="h-full overflow-hidden bg-white">
        <Header
          leftBtn={
            <button onClick={() => navigate(-1)} type="button" aria-label="뒤로가기">
              <Icon Component={CommonBack} />
            </button>
          }
        />
        <section
          className={`${isIOS ? 'height-without-headerIOS' : 'height-without-headerAnd'} flex flex-col items-center px-8`}
        >
          <img className="mb-5 h-36 w-36 rounded-full bg-white object-cover shadow-lg" src={ProfileImg} alt="" />
          <div className="my-7 h-10 w-full border-b-4 border-accent">
            <input
              className="h-full w-full text-center text-lg font-semibold"
              value={nickName}
              onChange={(e) => changeNickName(e.target.value)}
            />
            <p className="pt-2 opacity-70">최대 12글자까지 가능해요</p>
          </div>

          <div className="mt-auto flex w-full justify-center pb-7">
            <Button handleClick={saveNickName} className="w-full text-white">
              저장하기
            </Button>
          </div>
        </section>
      </section>
    </>
  );
};

export default EditNickname;
