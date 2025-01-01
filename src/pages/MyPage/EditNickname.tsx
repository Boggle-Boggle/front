import { FaAngleLeft } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

import Button from 'components/Button';
import Header from 'components/Header';

import useNickNameInput from 'hooks/useNickNameInput';
import { updateNickname } from 'services/signup';

const EditNickname = () => {
  const navigate = useNavigate();
  const { nickName, updateNickName } = useNickNameInput();

  return (
    <section className="h-full bg-white">
      <Header leftBtn={<FaAngleLeft onClick={() => navigate(-1)} style={{ width: '24px', height: '24px' }} />} />
      <section className="height-content flex flex-col items-center px-8">
        <img
          className="mb-5 h-36 w-36 rounded-full bg-white shadow-lg"
          src="https://item.kakaocdn.net/do/b563e153db82fde06e1423472ccf192c960f4ab09fe6e38bae8c63030c9b37f9"
          alt=""
        />
        <div className="my-7 h-10 w-full border-b-4 border-accent">
          <input
            className="h-full w-full text-center text-lg font-semibold focus:outline-none"
            value={nickName}
            onChange={(e) => updateNickName(e.target.value)}
          />
        </div>

        <div className="mt-auto flex w-full justify-center pb-7">
          <Button handleClick={() => updateNickname(nickName)} className="w-full text-white">
            저장하기
          </Button>
        </div>
      </section>
    </section>
  );
};

export default EditNickname;
