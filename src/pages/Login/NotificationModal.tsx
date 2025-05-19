import { createPortal } from 'react-dom';

import Icon from 'components/Icon';

import { CommonCancel } from 'assets/icons';

type NotificationModalProps = {
  isOpen: boolean;
  close: () => void;
};

const NotificationModal = ({ close }: NotificationModalProps) => {
  return createPortal(
    <div
      onClick={close}
      className="fixed inset-0 z-[5000] m-auto flex max-w-screen-sm items-center justify-center bg-black/40"
      role="presentation"
    >
      <div className="relative w-5/6 rounded-md bg-white px-5 py-6 shadow-lg">
        <p className="text-center text-lg font-semibold">
          서비스 이용에 불편을 드려
          <br />
          진심으로 사과드립니다
        </p>
        <p className="white-space-pre-line mt-4 text-sm opacity-70">
          안녕하세요.
          <br />
          &lt;빼곡 - 독서기록앱&gt;을 운영하고 있는 빼곡팀입니다.
          <div className="h-2" />
          지난밤 예상치 못한 서버 이슈로 인해 일부 사용자 데이터가 손실되는 심각한 문제가 발생했습니다. <br />
          무엇보다도 소중한 데이터를 믿고 맡겨주신 사용자분들께 큰 실망과 불편을 드리게 되어 진심으로 사과드립니다.
          <div className="h-2" />
          이 상황을 해결하기 위해 [사용자 데이터 복구 지원]을 통해 사용자분들의 불편함을 해소해 드리고자 합니다.
          <br />
          문의 메일(
          <a href="mailto:bbaegok@gmail.com" className="font-semibold text-blue-600 underline">
            bbaegok@gmail.com
          </a>
          )로 엑셀 등의 형식으로 기존 데이터를 보내주시면, 직접 확인하여 최대한 빠르게 복구해드리겠습니다.{' '}
          <div className="h-2" />
          향후 이런 일이 반복되지 않도록, 더욱 안전한 시스템을 만드는데 주력하겠습니다. <br />
          불편함 속에서도 이해해주시고 기다려주신 모든 분들께 다시 한번 고개 숙여 사과드립니다.
          <div className="h-3" />
          빼곡팀 일동 드림.
        </p>

        <button type="button" onClick={close} className="absolute right-3 top-3" aria-label="닫기">
          <Icon Component={CommonCancel} size="sm" />
        </button>
      </div>
    </div>,
    document.getElementById('modal') as HTMLElement,
  );
};

export default NotificationModal;
