import { RefObject } from 'react';

const APP_STORE_URL = 'https://apps.apple.com/kr/app/id6742702941';

type IOSUpdateModalProps = {
  dialogRef: RefObject<HTMLElement>;
};

const IOSUpdateModal = (props: IOSUpdateModalProps) => {
  const { dialogRef } = props;

  return (
    <section
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="ios-update-title"
      aria-describedby="ios-update-description"
      tabIndex={-1}
      className="w-full max-w-[26rem] rounded-2xl bg-white px-6 py-8 text-center shadow-xl outline-none"
    >
      <span className="rounded-full bg-main px-3 py-1 text-sm font-semibold text-text">필수 업데이트</span>
      <h1 id="ios-update-title" className="mt-5 text-xl font-bold">
        새로운 빼곡으로 업데이트해 주세요
      </h1>
      <p id="ios-update-description" className="mt-4 text-sm leading-6 text-sub">
        빼곡이 새로운 버전으로 업데이트되었어요.
        <br />
        앱을 최신 버전으로 업데이트해 주세요.
      </p>
      <a
        href={APP_STORE_URL}
        className="mt-8 flex h-12 items-center justify-center rounded-lg bg-text font-semibold text-white"
      >
        App Store 바로가기
      </a>
    </section>
  );
};

export default IOSUpdateModal;
