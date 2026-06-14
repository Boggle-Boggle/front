import { Header } from 'components/Header';

import { SectionHeader } from '../shared/SectionHeader';
import { SectionLink } from '../shared/SectionLink';

const MSG_SUPPORT_TITLE = '고객센터';
const MSG_SUPPORT_CUSTOMER_CENTER_SECTION = '빼곡 고객센터';
const MSG_SUPPORT_FEEDBACK_SECTION = '어플 사용경험 공유';
const MSG_SUPPORT_FAQ = '자주 묻는 질문';
const MSG_SUPPORT_CONTACT = '문의하기';
const MSG_SUPPORT_FEEDBACK = '앱 사용 경험 / 오류 알려주기';

const Support = () => {
  const handleClickFaq = () => {};

  const handleClickContact = () => {};

  const handleClickFeedback = () => {};

  return (
    <div className="flex h-full w-full flex-col">
      <Header title={MSG_SUPPORT_TITLE} withBack />

      <div className="min-h-0 flex-1 overflow-y-auto pb-safe-bottom pt-10">
        <SectionHeader title={MSG_SUPPORT_CUSTOMER_CENTER_SECTION} />
        <div className="flex flex-col pt-2">
          <SectionLink label={MSG_SUPPORT_FAQ} onClick={handleClickFaq} />
          <SectionLink label={MSG_SUPPORT_CONTACT} onClick={handleClickContact} />
        </div>

        <div className="pt-10">
          <SectionHeader title={MSG_SUPPORT_FEEDBACK_SECTION} />
          <div className="pt-2">
            <SectionLink label={MSG_SUPPORT_FEEDBACK} onClick={handleClickFeedback} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
