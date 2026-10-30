import { RefObject } from 'react';

type MaintenanceModalProps = {
  dialogRef: RefObject<HTMLElement>;
};

const MaintenanceModal = (props: MaintenanceModalProps) => {
  const { dialogRef } = props;

  return (
    <section
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="maintenance-title"
      aria-describedby="maintenance-description"
      tabIndex={-1}
      className="w-full max-w-[26rem] rounded-2xl bg-white px-6 py-8 text-center shadow-xl outline-none"
    >
      <span className="rounded-full bg-main px-3 py-1 text-sm font-semibold text-text">서버 점검 중</span>
      <h1 id="maintenance-title" className="mt-5 text-xl font-bold">
        더 나은 빼곡을 준비하고 있어요
      </h1>
      <p id="maintenance-description" className="mt-4 text-sm leading-6 text-sub">
        새로운 버전을 위한 서버 점검을 진행 중이에요.
        <br />
        업데이트가 완료되면 다시 이용하실 수 있어요.
      </p>
    </section>
  );
};

export default MaintenanceModal;
