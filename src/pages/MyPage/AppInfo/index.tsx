import { Header } from 'components/Header';

import { SectionHeader } from '../shared/SectionHeader';
import { SectionLink } from '../shared/SectionLink';

const MSG_APP_INFO_TITLE = '앱 정보';
const MSG_APP_INFO_TERMS_SECTION = '어플 사용 약관';
const MSG_APP_INFO_SERVICE_TERMS = '서비스 이용약관';

const AppInfo = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Header title={MSG_APP_INFO_TITLE} withBack />

      <div className="min-h-0 flex-1 overflow-y-auto pb-safe-bottom">
        <SectionHeader title={MSG_APP_INFO_TERMS_SECTION} />
        <div className="pt-2">
          <SectionLink label={MSG_APP_INFO_SERVICE_TERMS} onClick={() => {}} />
        </div>
      </div>
    </div>
  );
};

export default AppInfo;
