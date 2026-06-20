import { ChangeEvent, useState } from 'react';
import { useLayerStore } from 'stores/useLayerStore';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { ContentModal } from 'components/Layer/ContentModal';

const MSG_ADD_CUSTOM_BOOK_COVER_IMAGE_URL_MODAL_TITLE = '이미지 URL로 입력하기';
const MSG_ADD_CUSTOM_BOOK_COVER_IMAGE_URL_MODAL_PLACEHOLDER = '내용을 입력해주세요';
const MSG_ADD_CUSTOM_BOOK_COVER_IMAGE_URL_MODAL_SUBMIT = '완료하기';

type CoverImageUrlModalProps = {
  initialValue: string;
  onSubmit: (imageUrl: string) => void;
};

export const CoverImageUrlModal = (props: CoverImageUrlModalProps) => {
  const { initialValue, onSubmit } = props;

  const [imageUrl, setImageUrl] = useState<string>(initialValue);
  const { pop } = useLayerStore();

  const isSubmitDisabled = imageUrl.trim().length === 0;

  const handleClose = () => {
    pop();
  };

  const handleChangeImageUrl = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setImageUrl(e.target.value);
  };

  const handleClearImageUrl = () => {
    setImageUrl('');
  };

  const handleSubmit = () => {
    const trimmedImageUrl = imageUrl.trim();

    if (!trimmedImageUrl) return;

    onSubmit(trimmedImageUrl);
    pop();
  };

  return (
    <ContentModal
      title={MSG_ADD_CUSTOM_BOOK_COVER_IMAGE_URL_MODAL_TITLE}
      onClose={handleClose}
      footer={
        <Button onClick={handleSubmit} disabled={isSubmitDisabled}>
          {MSG_ADD_CUSTOM_BOOK_COVER_IMAGE_URL_MODAL_SUBMIT}
        </Button>
      }
    >
      <div className="flex flex-col gap-6">
        <Input
          value={imageUrl}
          onChange={handleChangeImageUrl}
          onClear={handleClearImageUrl}
          placeholder={MSG_ADD_CUSTOM_BOOK_COVER_IMAGE_URL_MODAL_PLACEHOLDER}
        />
      </div>
    </ContentModal>
  );
};
