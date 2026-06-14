import { Header } from 'components/Header';

import { SectionHeader } from '../shared/SectionHeader';
import { SectionLink } from '../shared/SectionLink';
import { SectionValue } from '../shared/SectionValue';

const MSG_ABOUT_TITLE = '앱 정보';
const MSG_ABOUT_TERMS_SECTION = '어플 사용 약관';
const MSG_ABOUT_APP_INFO_SECTION = '앱 정보';
const MSG_ABOUT_SERVICE_TERMS = '서비스 이용약관';
const MSG_ABOUT_PRIVACY_POLICY = '개인정보 처리 방침';
const MSG_ABOUT_VERSION = '버전 정보';
const MSG_ABOUT_VERSION_VALUE = '버전 1.0.6';
const MSG_ABOUT_WEB = '웹으로 이동하기';

const About = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Header title={MSG_ABOUT_TITLE} withBack />

      <div className="min-h-0 flex-1 overflow-y-auto pb-safe-bottom">
        <SectionHeader title={MSG_ABOUT_TERMS_SECTION} />
        <div className="py-2">
          <SectionLink label={MSG_ABOUT_SERVICE_TERMS} onClick={() => {}} />
          <SectionLink label={MSG_ABOUT_PRIVACY_POLICY} onClick={() => {}} />
        </div>

        <SectionHeader title={MSG_ABOUT_APP_INFO_SECTION} />
        <div className="py-2">
          <SectionValue label={MSG_ABOUT_VERSION} value={MSG_ABOUT_VERSION_VALUE} />
          <SectionLink label={MSG_ABOUT_WEB} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default About;
