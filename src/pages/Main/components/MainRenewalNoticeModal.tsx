import { useLayerStore } from 'stores/useLayerStore';

import { NoticeModal } from 'components/Layer/NoticeModal';

import renewalNoticeImage from 'assets/notice/20261031_renewal-notice.png';

import { STORAGE_KEY } from 'constants/storage';

const DAY_IN_MS = 24 * 60 * 60 * 1000;
const MSG_RENEWAL_NOTICE_IMAGE =
  '빼곡이 새로워졌어요! 여러분이 더 쉽게, 더 즐겁게 쓸 수 있도록 빼곡이 싹 바뀌었습니다. 한눈에 쏙 들어오는 디자인과 새 기능들을 확인해보세요.';

export const MainRenewalNoticeModal = () => {
  const { pop } = useLayerStore();

  const handleDismissForDay = () => {
    window.localStorage.setItem(STORAGE_KEY.MAIN_RENEWAL_NOTICE_DISMISSED_UNTIL, String(Date.now() + DAY_IN_MS));
    pop();
  };

  return (
    <NoticeModal onClose={pop} onDismiss={handleDismissForDay} dismissPeriod="day">
      <img src={renewalNoticeImage} alt={MSG_RENEWAL_NOTICE_IMAGE} className="h-full w-full object-cover" />
    </NoticeModal>
  );
};
