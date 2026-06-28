import { BottomButton, IconButton } from 'components/Button';
import { Header } from 'components/Header';
import { IconCancel } from 'components/icons';

import NICKNAME_RULE from 'constants/index';

import { Description } from '../shared/Description';
import { Title } from '../shared/Title';

type NicknameStepProps = {
  nickname: string;
  onChangeNickname: (nickname: string) => void;
  onNext: () => void;
};

const MSG_SIGNUP_HEADER_TITLE = '회원가입';
const MSG_SIGNUP_NICKNAME_TITLE = '빼곡에서 사용하실\n닉네임을 만들어주세요!';
const MSG_SIGNUP_NICKNAME_DESCRIPTION =
  '다른 이용자에게 불쾌감을 줄 수 있는 단어나 욕설, 선정적 표현은 신고가 누적 될 경우 닉네임이 변경 될 수 있어요.';
const MSG_SIGNUP_NICKNAME_PLACEHOLDER = '닉네임을 입력해주세요';
const MSG_SIGNUP_NICKNAME_LIMIT = '글자수 한글 15자/영문 45자 제한';
const MSG_SIGNUP_NICKNAME_NEXT = '다음으로';
const MSG_SIGNUP_NICKNAME_CLEAR_LABEL = '닉네임 입력 초기화';

export const NicknameStep = (props: NicknameStepProps) => {
  const { nickname, onChangeNickname, onNext } = props;

  const handleChangeNickname = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeNickname(event.target.value);
  };

  const handleClearNickname = () => onChangeNickname('');

  return (
    <>
      <Header title={MSG_SIGNUP_HEADER_TITLE} withBack />
      <section className="h-full px-mobile">
        <Title text={MSG_SIGNUP_NICKNAME_TITLE} />
        <Description text={MSG_SIGNUP_NICKNAME_DESCRIPTION} tone="warning" />

        {/* 닉네임 인풋 */}
        <div className="mt-6 flex h-10 w-full border-b border-neutral-40">
          <input
            className="flex-1 placeholder:text-neutral-40"
            placeholder={MSG_SIGNUP_NICKNAME_PLACEHOLDER}
            maxLength={NICKNAME_RULE.MAX}
            value={nickname}
            onChange={handleChangeNickname}
          />
          {nickname && (
            <IconButton
              onClick={handleClearNickname}
              label={MSG_SIGNUP_NICKNAME_CLEAR_LABEL}
              icon={IconCancel}
              size="sm"
            />
          )}
        </div>

        {/* 인풋 description */}
        <p className="pt-1 text-caption2 text-neutral-40">{MSG_SIGNUP_NICKNAME_LIMIT}</p>
      </section>

      <BottomButton onClick={onNext} disabled={!nickname.length}>
        {MSG_SIGNUP_NICKNAME_NEXT}
      </BottomButton>
    </>
  );
};
