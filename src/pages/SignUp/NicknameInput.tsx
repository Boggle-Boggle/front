import useNicknameStore from 'stores/useNicknameStore';
import useToastStore from 'stores/useToastStore';

import Header from 'components/Header';
import { IconCircleCancelFilled } from 'components/icons';
import { BottomButton } from 'components/Button';
import IconButton from 'components/Button/IconButton';
import Highlight from 'components/refactor/Highlight';

import useInput from 'hooks/useInput';
import validateNickname from 'utils/validateNickname';

import NICKNAME_RULE from 'constants/index';

type NicknameInputProps = {
  onPrev: () => void;
  onNext: () => void;
};

const NicknameInput = ({ onPrev, onNext }: NicknameInputProps) => {
  const { setNickname } = useNicknameStore();
  const { addToast } = useToastStore();
  const { input, setInput, inputRef, clear } = useInput();

  const handleNext = () => {
    if (input === '') return;

    if (!validateNickname(input)) {
      addToast({ type: 'error', description: '벨리데이션 검증 실패' });
      return;
    }

    setNickname(input); // 전역 유저 상태에 추가
    onNext();
  };

  return (
    <>
      <Header title="회원가입" prev={onPrev} />
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

        <form className="flex h-10 w-full border-b-[1px] border-neutral-40" id="nicknameForm">
          <input
            className="flex-1 placeholder:text-neutral-40"
            placeholder="닉네임을 입력해주세요"
            maxLength={NICKNAME_RULE.MAX}
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <IconButton onClick={clear} size="small" label="입력된 검색어 삭제">
            <IconCircleCancelFilled className="size-icon-md" />
          </IconButton>
        </form>
        <p className="pt-1 text-caption1 text-neutral-40">글자수 한글 15자/영문 45자 제한</p>

        <BottomButton onClick={handleNext} type="submit" form="nicknameForm" disabled={!input.length}>
          다음으로
        </BottomButton>
      </section>
    </>
  );
};

export default NicknameInput;
