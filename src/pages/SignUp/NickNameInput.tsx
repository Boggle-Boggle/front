import Header from 'components/Header';
import { IconCircleCancelFilled } from 'components/icons';
import { BottomButton } from 'components/refactor/Button';
import Highlight from 'components/refactor/Highlight';

type NickNameInputProps = {
  nickName: string;
  changeNickName: (name: string) => void;
  saveNickName: () => void;
};

const NickNameInput = ({ nickName, changeNickName, saveNickName }: NickNameInputProps) => {
  return (
    <>
      <Header title="회원가입" leftBtn />
      <section className="h-full px-mobile">
        <h1 className="mt-10 whitespace-pre-line text-h1">
          <Highlight>빼곡에서 사용하실</Highlight>
          {'\n'}
          <Highlight>닉네임을 만들어주세요</Highlight>
        </h1>
        <p className="mb-6 pt-2 text-body2 text-warning">
          ⚠️ 다른 이용자에게 불쾌감을 줄 수 있는 단어나 욕설, 선정적 표현은 신고가 누적 될 경우 닉네임이 변경 될 수
          있어요.
        </p>

        <form className="relative" id="nicknameForm">
          <input
            className="h-10 w-full border-b-[1px] border-neutral-60 placeholder:text-neutral-40"
            placeholder="닉네임을 입력해주세요"
            value={nickName}
            onChange={(e) => changeNickName(e.target.value)}
          />
          <IconCircleCancelFilled className="absolute right-2 top-1/2 size-icon-md -translate-y-1/2" />
        </form>

        <BottomButton onClick={saveNickName} type="submit" form="nicknameForm">
          다음으로
        </BottomButton>
      </section>
    </>
  );
};

export default NickNameInput;
