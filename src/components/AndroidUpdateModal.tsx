import { RefObject } from 'react';

type AndroidUpdateModalProps = {
  dialogRef: RefObject<HTMLElement>;
};

const AndroidUpdateModal = (props: AndroidUpdateModalProps) => {
  const { dialogRef } = props;

  return (
    <section
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="android-update-title"
      aria-describedby="android-update-description"
      tabIndex={-1}
      className="w-full max-w-[26rem] rounded-2xl bg-white px-6 py-8 text-center shadow-xl outline-none"
    >
      <span className="rounded-full bg-main px-3 py-1 text-sm font-semibold text-text">서비스 업데이트 안내</span>
      <h1 id="android-update-title" className="mt-5 text-xl font-bold">
        새로운 빼곡을 준비하고 있어요
      </h1>
      <p id="android-update-description" className="mt-4 text-sm leading-6 text-sub">
        현재 서비스 업데이트를 진행 중이에요.
        <br />
        11월 2일(월)부터 다시 이용하실 수 있어요.
        <br />
        조금만 기다려 주세요.
      </p>
    </section>
  );
};

export default AndroidUpdateModal;
