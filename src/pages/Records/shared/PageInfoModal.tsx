import { ChangeEvent, useState } from 'react';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { ContentModal } from 'components/Layer/ContentModal';

type PageInfoModalProps = {
  onClose: () => void;
};

const MSG_PAGE_INFO_TITLE = '페이지 정보 수정';
const MSG_PAGE_INFO_LABEL = '총 페이지 수 (선택)';
const MSG_PAGE_INFO_PLACEHOLDER = '페이지 정보를 가져올 수 없습니다';
const MSG_PAGE_INFO_HELP = '* 현재 알라딘에 등록된 페이지 수입니다';
const MSG_MODAL_DONE = '완료';

export const PageInfoModal = (props: PageInfoModalProps) => {
  const { onClose } = props;
  const [pageCount, setPageCount] = useState<string>('');

  const handleChangePageCount = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setPageCount(e.target.value);
  };

  const handleClearPageCount = () => {
    setPageCount('');
  };

  return (
    <ContentModal title={MSG_PAGE_INFO_TITLE} onClose={onClose} modalClassName="w-[calc(100%-3rem)]">
      <div className="flex flex-col gap-5">
        <label htmlFor="total-page-count" className="text-body1">
          {MSG_PAGE_INFO_LABEL}
        </label>

        <Input
          id="total-page-count"
          value={pageCount}
          onChange={handleChangePageCount}
          onClear={handleClearPageCount}
          type="number"
          placeholder={MSG_PAGE_INFO_PLACEHOLDER}
        />
        <p className="text-end text-caption1 text-neutral-60">{MSG_PAGE_INFO_HELP}</p>
      </div>
      <Button onClick={() => {}}>{MSG_MODAL_DONE}</Button>
    </ContentModal>
  );
};
