import { useLayerStore } from 'stores/useLayerStore';

import { NoticeModal } from 'components/Layer/NoticeModal';

import renewalNoticeImage from 'assets/notice/20261031_renewal-notice.png';

import { dismissMainRenewalNoticeForDay } from '../renewalNoticeStorage';

const MSG_RENEWAL_NOTICE_IMAGE =
  '빼곡이 새로워졌어요! 여러분이 더 쉽게, 더 즐겁게 쓸 수 있도록 빼곡이 싹 바뀌었습니다. 한눈에 쏙 들어오는 디자인과 새 기능들을 확인해보세요.';

export const MainRenewalNoticeModal = () => {
  const { pop } = useLayerStore();

  const handleDismissForDay = () => {
    dismissMainRenewalNoticeForDay();
    pop();
  };

  return (
    <NoticeModal onClose={pop} onDismiss={handleDismissForDay} dismissPeriod="day">
      <img src={renewalNoticeImage} alt={MSG_RENEWAL_NOTICE_IMAGE} className="h-full w-full object-cover" />
    </NoticeModal>
  );
};
