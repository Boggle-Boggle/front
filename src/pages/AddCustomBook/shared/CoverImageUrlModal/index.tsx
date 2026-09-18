import { ChangeEvent, useState } from 'react';
import { useLayerStore } from 'stores/useLayerStore';

import { Button } from 'components/Button';
import { Input } from 'components/Input';
import { ContentModal } from 'components/Layer/ContentModal';

import { validateImageUrl } from './utils';

const MSG_ADD_CUSTOM_BOOK_COVER_IMAGE_URL_MODAL_TITLE = '이미지 URL로 입력하기';
const MSG_ADD_CUSTOM_BOOK_COVER_IMAGE_URL_MODAL_PLACEHOLDER = 'https://image.example.com/book-cover';
const MSG_ADD_CUSTOM_BOOK_COVER_IMAGE_URL_MODAL_SUBMIT = '완료하기';
const MSG_ADD_CUSTOM_BOOK_COVER_IMAGE_URL_INVALID = 'https://로 시작하는 이미지 URL을 입력해주세요.';
const MSG_ADD_CUSTOM_BOOK_COVER_IMAGE_URL_LOAD_FAILED = '이미지를 불러오지 못했습니다. 다른 URL을 입력해주세요.';

type CoverImageUrlModalProps = {
  initialValue: string;
  onSubmit: (imageUrl: string) => void;
};

export const CoverImageUrlModal = (props: CoverImageUrlModalProps) => {
  const { initialValue, onSubmit } = props;

  const [imageUrl, setImageUrl] = useState<string>(initialValue);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const { pop } = useLayerStore();

  const handleClose = () => {
    pop();
  };

  const handleChangeImageUrl = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setImageUrl(e.target.value);
    setErrorMessage('');
  };

  const handleClearImageUrl = () => {
    setImageUrl('');
    setErrorMessage('');
  };

  const handleSubmit = async () => {
    const trimmedImageUrl = imageUrl.trim();

    if (isValidating) return;

    setErrorMessage('');
    setIsValidating(true);
    const validationResult = await validateImageUrl(trimmedImageUrl);
    setIsValidating(false);

    if (validationResult !== 'valid') {
      setErrorMessage(
        validationResult === 'invalid-url'
          ? MSG_ADD_CUSTOM_BOOK_COVER_IMAGE_URL_INVALID
          : MSG_ADD_CUSTOM_BOOK_COVER_IMAGE_URL_LOAD_FAILED,
      );
      return;
    }

    onSubmit(trimmedImageUrl);
    pop();
  };

  return (
    <ContentModal
      title={MSG_ADD_CUSTOM_BOOK_COVER_IMAGE_URL_MODAL_TITLE}
      onClose={handleClose}
      footer={
        <Button onClick={handleSubmit} loading={isValidating}>
          {MSG_ADD_CUSTOM_BOOK_COVER_IMAGE_URL_MODAL_SUBMIT}
        </Button>
      }
    >
      <div className="flex flex-col gap-2">
        <Input
          value={imageUrl}
          onChange={handleChangeImageUrl}
          onClear={handleClearImageUrl}
          placeholder={MSG_ADD_CUSTOM_BOOK_COVER_IMAGE_URL_MODAL_PLACEHOLDER}
          state={errorMessage ? 'error' : 'default'}
        />
        {errorMessage && <p className="text-caption1 text-danger">{errorMessage}</p>}
      </div>
    </ContentModal>
  );
};
