import { Header } from 'components/Header';

import { isAppleDevice } from 'utils/platform';

import { EXTERNAL_LINK } from 'constants/externalLinks';

import { SectionHeader } from '../shared/SectionHeader';
import { SectionLink } from '../shared/SectionLink';

const MSG_SUPPORT_TITLE = '고객센터';
const MSG_SUPPORT_CUSTOMER_CENTER_SECTION = '빼곡 고객센터';
const MSG_SUPPORT_FEEDBACK_SECTION = '어플 사용경험 공유';
const MSG_SUPPORT_FAQ = '자주 묻는 질문';
const MSG_SUPPORT_CONTACT = '문의하기';
const MSG_SUPPORT_FEEDBACK = '앱 평가하기';

const Support = () => {
  const handleClickFaq = () => window.location.assign(EXTERNAL_LINK.FAQ);

  const handleClickContact = () => window.location.assign(EXTERNAL_LINK.INQUIRY);

  const handleClickFeedback = () =>
    window.location.assign(isAppleDevice() ? EXTERNAL_LINK.APP_STORE_REVIEW : EXTERNAL_LINK.GOOGLE_PLAY);

  return (
    <div className="flex h-full w-full flex-col">
      <Header title={MSG_SUPPORT_TITLE} withBack />

      <SectionHeader title={MSG_SUPPORT_CUSTOMER_CENTER_SECTION} />
      <SectionLink label={MSG_SUPPORT_FAQ} onClick={handleClickFaq} />
      <SectionLink label={MSG_SUPPORT_CONTACT} onClick={handleClickContact} isLast />

      <SectionHeader title={MSG_SUPPORT_FEEDBACK_SECTION} />
      <SectionLink label={MSG_SUPPORT_FEEDBACK} onClick={handleClickFeedback} />
    </div>
  );
};

export default Support;
