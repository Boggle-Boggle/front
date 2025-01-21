import { useQueryClient } from '@tanstack/react-query';

import { useEffect } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { useLocation, useNavigate } from 'react-router-dom';

import Button from 'components/Button';
import Header from 'components/Header';

import useDevice from 'hooks/useDevice';
import useNickNameInput from 'hooks/useNickNameInput';
import { isDuplicateNickname, updateNickname } from 'services/user';

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
      <Header leftBtn={<FaAngleLeft onClick={() => navigate(-1)} style={{ width: '24px', height: '24px' }} />} />
      <section
        className={`${isIOS ? 'height-without-headerIOS' : 'height-without-headerAnd'} flex flex-col items-center px-8`}
      >
        <img
          className="mb-5 h-36 w-36 rounded-full bg-white shadow-lg"
          src="https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c960f4ab09fe6e38bae8c63030c9b37f9"
          alt=""
        />
        <div className="my-7 h-10 w-full border-b-4 border-accent">
          <textarea
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
