import { useQueryClient } from '@tanstack/react-query';

import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from 'components/Button';
import Header from 'components/Header';
import Icon from 'components/Icon';

import useDevice from 'hooks/useDevice';
import useNickNameInput from 'hooks/useNickNameInput';
import { isDuplicateNickname, updateNickname } from 'services/user';

import { CommonBack } from 'assets/icons';
import ProfileSvg from 'assets/img/profile.svg';

const EditNickname = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryClient = useQueryClient();

  const { isIOS } = useDevice();
  const { nickName, setNickName, updateNickName } = useNickNameInput();
  const { nickname } = location.state;

  const handleSave = async () => {
    const isDuplicated = await isDuplicateNickname(nickName);

    if (isDuplicated) {
      alert(`사용중인 닉네임입니다.\n다른 닉네임을 입력해주세요`);
      return;
    }
    await updateNickname(nickName);

    queryClient.invalidateQueries({ queryKey: ['myPage'] });

    navigate('/myPage');
  };

  useEffect(() => {
    setNickName(nickname);
  }, [nickname, setNickName]);

  return (
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
        <img className="mb-5 h-36 w-36 rounded-full bg-white object-cover shadow-lg" src={ProfileSvg} alt="" />
        <div className="my-7 h-10 w-full border-b-4 border-accent">
          <input
            className="h-full w-full text-center text-lg font-semibold"
            value={nickName}
            onChange={(e) => updateNickName(e.target.value)}
          />
          <p className="pt-2 opacity-70">최대 10글자/특수기호 사용 불가</p>
        </div>

        <div className="mt-auto flex w-full justify-center pb-7">
          <Button handleClick={handleSave} className="w-full text-white">
            저장하기
          </Button>
        </div>
      </section>
    </section>
  );
};

export default EditNickname;
