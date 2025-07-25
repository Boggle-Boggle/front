import { useReducer } from 'react';

import Alert from 'components/Alert';

import useDevice from 'hooks/useDevice';

const EditNickname = () => {
  const { isIOS } = useDevice();
  const [isAlertActive, handleAlertActive] = useReducer((prev) => !prev, false);
  // const { nickName, changeNickName, saveNickName } = useNickNameInput(nickname, handleAlertActive, () => {
  //   navigate('/myPage');
  // });

  return (
    <>
      {isAlertActive && (
        <Alert message={`사용중인 닉네임이에요 \n다른 닉네임을 입력해주세요`} onClose={handleAlertActive} />
      )}
      <section className="h-full overflow-hidden bg-white">
        <section
          className={`${isIOS ? 'height-without-headerIOS' : 'height-without-headerAnd'} flex flex-col items-center px-8`}
        >
          <div className="my-7 h-10 w-full border-b-4 border-accent">
            {/* <input
              className="h-full w-full text-center text-lg font-semibold"
              value={nickName}
              onChange={(e) => changeNickName(e.target.value)}
            /> */}
            <p className="pt-2 opacity-70">최대 12글자까지 가능해요</p>
          </div>

          <div className="mt-auto flex w-full justify-center pb-7">
            {/* <Button handleClick={saveNickName} className="w-full text-white">
              저장하기
            </Button> */}
          </div>
        </section>
      </section>
    </>
  );
};

export default EditNickname;
