import { Button } from 'components/Button';
import { Checkbox } from 'components/Checkbox';
import { Header } from 'components/Header';
import { BackButton } from 'components/Header/BackButton';
import { IconArrowRight } from 'components/icons';

import { Description } from '../shared/Description';
import { Title } from '../shared/Title';

type TermItem = {
  id: number;
  title: string;
  required: boolean;
};

type TermsStepProps = {
  agreedTermIds: number[];
  onChangeAgreedTermIds: (ids: number[]) => void;
  onPrev: () => void;
  onNext: () => void;
};

const TERMS: TermItem[] = [
  { id: 1, title: '개인정보처리방침', required: true },
  { id: 2, title: '이용약관', required: true },
];

const MSG_SIGNUP_HEADER_TITLE = '회원가입';
const MSG_SIGNUP_TERMS_TITLE = '빼곡에 가입하시려면\n이용약관에 동의해주세요!';
const MSG_SIGNUP_TERMS_DESCRIPTION = '회원가입을 마치기 전에 빼곡의 이용약관을 확인해주세요';
const MSG_SIGNUP_TERMS_AGREE_ALL = '모든 약관에 동의합니다';
const MSG_SIGNUP_TERMS_REQUIRED = '필수';
const MSG_SIGNUP_TERMS_SUBMIT = '회원가입 완료하기';

export const TermsStep = (props: TermsStepProps) => {
  const { agreedTermIds, onChangeAgreedTermIds, onPrev, onNext } = props;

  const requiredTermIds = TERMS.filter((term) => term.required).map((term) => term.id);
  const isCompleteEnabled = requiredTermIds.every((id) => agreedTermIds.includes(id));

  const handleToggleAll = () => onChangeAgreedTermIds(TERMS.map((term) => term.id));

  const handleClickSubmit = () => {
    if (!isCompleteEnabled) return;

    onNext();
  };

  return (
    <>
      <Header title={MSG_SIGNUP_HEADER_TITLE} leftBtn={<BackButton onClick={onPrev} />} />

      <section className="flex h-full flex-col justify-between px-mobile">
        <div>
          <Title text={MSG_SIGNUP_TERMS_TITLE} />
          <Description text={MSG_SIGNUP_TERMS_DESCRIPTION} />
        </div>

        <div>
          <Button onClick={handleToggleAll} variant="primaryLine">
            {MSG_SIGNUP_TERMS_AGREE_ALL}
          </Button>

          <ul className="mb-3 ml-1.5 mt-4">
            {TERMS.map((term, index) => {
              const isChecked = agreedTermIds.includes(term.id);
              const detailButtonClass = 'flex items-center gap-1 text-title3 text-neutral-100';
              const itemBorderClass = index === TERMS.length - 1 ? '' : 'border-b border-neutral-10';

              return (
                <li key={term.id} className={`flex h-12 items-center justify-between ${itemBorderClass}`}>
                  <div className="flex items-center gap-2">
                    {term.required && (
                      <span className="text-body2 font-bold text-danger">{MSG_SIGNUP_TERMS_REQUIRED}</span>
                    )}

                    <button type="button" className={detailButtonClass} onClick={() => term.id}>
                      {term.title}
                      <IconArrowRight className="size-4" />
                    </button>
                  </div>

                  <Checkbox
                    id={`signup-term-${term.id}`}
                    checked={isChecked}
                    onChange={() => term.id}
                    size="regular"
                    variant="color"
                  />
                </li>
              );
            })}
          </ul>
          <Button onClick={handleClickSubmit} disabled={!isCompleteEnabled} className="mt-4">
            {MSG_SIGNUP_TERMS_SUBMIT}
          </Button>
        </div>
      </section>
    </>
  );
};
