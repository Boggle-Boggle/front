import { useNavigate } from 'react-router-dom';

import { Header } from 'components/Header';

import { TERM_ID, TERMS_OF_SERVICE_TITLE, PRIVACY_POLICY_TITLE } from 'constants/terms';

import { SectionHeader } from '../shared/SectionHeader';
import { SectionLink } from '../shared/SectionLink';
import { SectionValue } from '../shared/SectionValue';

const MSG_ABOUT_TITLE = '앱 정보';
const MSG_ABOUT_TERMS_SECTION = '어플 사용 약관';
const MSG_ABOUT_APP_INFO_SECTION = '앱 정보';
const MSG_ABOUT_VERSION = '버전 정보';
const MSG_ABOUT_VERSION_VALUE = '버전 1.0.6';
const MSG_ABOUT_WEB = '웹으로 이동하기';

const About = () => {
  const navigate = useNavigate();

  const handleClickTermsDetail = (termId: number) => {
    navigate(`/terms/${termId}`);
  };

  return (
    <div className="flex h-full w-full flex-col">
      <Header title={MSG_ABOUT_TITLE} withBack />

      <div className="min-h-0 flex-1 overflow-y-auto pb-safe-bottom">
        <SectionHeader title={MSG_ABOUT_TERMS_SECTION} />
        <div className="flex flex-col pb-10 pt-2">
          <SectionLink
            label={TERMS_OF_SERVICE_TITLE}
            onClick={() => handleClickTermsDetail(TERM_ID.TERMS_OF_SERVICE)}
          />
          <SectionLink label={PRIVACY_POLICY_TITLE} onClick={() => handleClickTermsDetail(TERM_ID.PRIVACY_POLICY)} />
        </div>

        <SectionHeader title={MSG_ABOUT_APP_INFO_SECTION} />
        <div className="flex flex-col pt-2">
          <SectionValue label={MSG_ABOUT_VERSION} value={MSG_ABOUT_VERSION_VALUE} />
          <SectionLink label={MSG_ABOUT_WEB} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default About;
