import { useRef } from 'react';

import Button from 'components/Button';

import { deleteAccount } from 'services/user';

import { DrawType } from 'types/user';

type DrawAccountProps = {
  drawType: DrawType | null;
  onNext: () => void;
};

const DrawAccount = ({ drawType, onNext }: DrawAccountProps) => {
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleDeleteAccount = async () => {
    const drawText = textRef.current?.value ?? null;

    if (drawType === null) return;
    await deleteAccount(drawType, drawText);

    onNext();
  };

  return (
    <>
      <h1 className="text-[2rem] font-semibold leading-[3rem]">
        정말 빼곡을
        <br />
        <span className="text-red opacity-85">탈퇴</span>
        하시겠습니까 ?
        <p className="pb-6 pt-2 text-base opacity-50">
          계정을 탈퇴하시면 저장된 책들과 작성한 독서노트 등 <br />
          모든 활동 정보가 삭제되며 복구가 어렵습니다.
        </p>
      </h1>

      <textarea
        ref={textRef}
        placeholder="(선택사항) 빼곡을 사용하시면서 불편하셨던 점을 얘기해주세요."
        className="h-32 w-full rounded-sm bg-main drop-shadow"
      />

      <Button handleClick={handleDeleteAccount}>네 탈퇴할게요</Button>
    </>
  );
};

export default DrawAccount;
