import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { useLayerStore } from 'stores/useLayerStore';
import { useToastStore } from 'stores/useToastStore';

import BookCover from 'components/BookCover';
import { BottomButton } from 'components/Button';
import { Header } from 'components/Header';
import { IconCirclePlus } from 'components/icons';
import { AddRecordStatusBottomSheet } from 'pages/BookDetail/AddRecordStatusBottomSheet';

import type { Book, CustomBookDto } from 'types';

import { CoverImageUrlModal } from './shared/CoverImageUrlModal';
import { FormField } from './shared/FormField';

const MSG_ADD_CUSTOM_BOOK_PAGE_TITLE = '직접 등록하기';
const MSG_EDIT_CUSTOM_BOOK_PAGE_TITLE = '내가 등록한 책 정보 수정하기';
const MSG_ADD_CUSTOM_BOOK_SUBMIT = '독서 기록 추가하기';
const MSG_EDIT_CUSTOM_BOOK_SUBMIT = '수정 완료하기';
const MSG_EDIT_CUSTOM_BOOK_UNAVAILABLE = '책 정보 수정 API가 아직 연결되지 않았습니다.';
const MSG_ADD_CUSTOM_BOOK_TITLE = '책 제목';
const MSG_ADD_CUSTOM_BOOK_TITLE_PLACEHOLDER = '책 제목을 입력해주세요';
const MSG_ADD_CUSTOM_BOOK_AUTHOR = '저자 이름';
const MSG_ADD_CUSTOM_BOOK_AUTHOR_PLACEHOLDER = '저자 이름을 입력해주세요';
const MSG_ADD_CUSTOM_BOOK_PUBLISHER = '출판사';
const MSG_ADD_CUSTOM_BOOK_PUBLISHER_PLACEHOLDER = '출판사를 입력해주세요';
const MSG_ADD_CUSTOM_BOOK_ISBN = 'ISBN';
const MSG_ADD_CUSTOM_BOOK_ISBN_PLACEHOLDER = 'ISBN 코드';
const MSG_ADD_CUSTOM_BOOK_TOTAL_PAGE = '총 페이지 수';
const MSG_ADD_CUSTOM_BOOK_TOTAL_PAGE_PLACEHOLDER = '총 페이지 수';
const MSG_ADD_CUSTOM_BOOK_PLOT = '작품 소개/줄거리';
const MSG_ADD_CUSTOM_BOOK_PLOT_PLACEHOLDER = '작품 소개/줄거리 입력해주세요';
const MIN_TOTAL_PAGE_COUNT = 1;
const MAX_TOTAL_PAGE_COUNT = 99999;
const LAYER_ID_ADD_CUSTOM_BOOK_COVER_IMAGE_URL_MODAL = 'add-custom-book-cover-image-url-modal';

/**
 * 직접 도서추가 폼 입력 상태 타입 (전역 Book에서 필요한 필드를 취하고, 폼 내 문자열 바인딩이 요구되는 필드만 재정의)
 */
export type EditCustomBookState = {
  mode: 'edit';
  recordId: string | number;
  customBook: CustomBookDto;
};

type BookForm = Omit<
  Pick<Book, 'title' | 'author' | 'publisher' | 'coverUrl' | 'totalPages' | 'description'>,
  'coverUrl' | 'totalPages' | 'description'
> & {
  coverUrl: string;
  totalPages: string;
  description: string;
  isbn: string;
};

export const AddCustomBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToast } = useToastStore();

  const editState = location.state as EditCustomBookState | null;
  const isEditMode = editState?.mode === 'edit';
  const editCustomBook = isEditMode ? editState.customBook : undefined;

  const {
    control,
    handleSubmit,
    formState: { isValid },
    resetField,
    setValue,
    trigger,
    watch,
  } = useForm<BookForm>({
    mode: 'onChange',
    defaultValues: {
      coverUrl: editCustomBook?.coverUrl ?? '',
      title: editCustomBook?.title ?? '',
      author: editCustomBook?.author ?? '',
      publisher: editCustomBook?.publisher ?? '',
      isbn: editCustomBook?.isbn ?? '',
      totalPages: editCustomBook?.totalPages ? String(editCustomBook.totalPages) : '',
      description: editCustomBook?.description ?? '',
    },
  });
  const { push } = useLayerStore();
  const coverUrl = watch('coverUrl');

  useEffect(() => {
    if (isEditMode) trigger();
  }, [isEditMode, trigger]);

  const onSubmit: SubmitHandler<BookForm> = (formData) => {
    if (isEditMode) {
      addToast({ type: 'info', description: MSG_EDIT_CUSTOM_BOOK_UNAVAILABLE });
      return;
    }

    push({
      id: 'add-custom-book-status-bottom-sheet',
      component: (
        <AddRecordStatusBottomSheet
          onSubmit={(status) => {
            navigate('/records/new', {
              state: {
                customBook: {
                  title: formData.title.trim(),
                  author: formData.author.trim(),
                  publisher: formData.publisher.trim() || undefined,
                  isbn: formData.isbn.trim() || undefined,
                  totalPages: formData.totalPages ? parseInt(formData.totalPages, 10) : undefined,
                  coverUrl: formData.coverUrl.trim() || undefined,
                  description: formData.description.trim() || undefined,
                  mediaType: 'BOOK',
                },
                status,
              },
            });
          }}
        />
      ),
    });
  };

  const handleSubmitCoverImageUrl = (imageUrl: string) => {
    setValue('coverUrl', imageUrl, { shouldDirty: true });
  };

  const handleOpenCoverImageUrlModal = () => {
    push({
      id: LAYER_ID_ADD_CUSTOM_BOOK_COVER_IMAGE_URL_MODAL,
      component: <CoverImageUrlModal initialValue={coverUrl} onSubmit={handleSubmitCoverImageUrl} />,
    });
  };

  return (
    <>
      <Header withBack title={isEditMode ? MSG_EDIT_CUSTOM_BOOK_PAGE_TITLE : MSG_ADD_CUSTOM_BOOK_PAGE_TITLE} />

      <form
        id="add-custom-book-form"
        onSubmit={handleSubmit(onSubmit)}
        className="h-full overflow-y-auto px-mobile pb-4"
      >
        <button
          type="button"
          onClick={handleOpenCoverImageUrlModal}
          aria-label="표지 추가"
          className="mx-auto mt-4 block w-[6.25rem]"
        >
          <BookCover
            className="w-full"
            url={coverUrl}
            variant="mockup"
            rounded="sm"
            overlayBottomRight={
              <span className="relative z-badge grid size-[2.25rem] place-items-center rounded-br-[0.25rem] rounded-tl-lg bg-primary text-neutral-0">
                <IconCirclePlus className="size-6" />
              </span>
            }
          />
        </button>

        <div className="flex flex-col gap-5 pt-8">
          <FormField
            name="title"
            control={control}
            resetField={resetField}
            label={MSG_ADD_CUSTOM_BOOK_TITLE}
            placeholder={MSG_ADD_CUSTOM_BOOK_TITLE_PLACEHOLDER}
            required
          />

          <FormField
            name="author"
            control={control}
            resetField={resetField}
            label={MSG_ADD_CUSTOM_BOOK_AUTHOR}
            placeholder={MSG_ADD_CUSTOM_BOOK_AUTHOR_PLACEHOLDER}
            required
          />

          <FormField
            name="publisher"
            control={control}
            resetField={resetField}
            label={MSG_ADD_CUSTOM_BOOK_PUBLISHER}
            placeholder={MSG_ADD_CUSTOM_BOOK_PUBLISHER_PLACEHOLDER}
          />

          <div className="flex gap-2">
            <FormField
              name="isbn"
              control={control}
              resetField={resetField}
              label={MSG_ADD_CUSTOM_BOOK_ISBN}
              placeholder={MSG_ADD_CUSTOM_BOOK_ISBN_PLACEHOLDER}
            />

            <FormField
              name="totalPages"
              control={control}
              resetField={resetField}
              label={MSG_ADD_CUSTOM_BOOK_TOTAL_PAGE}
              placeholder={MSG_ADD_CUSTOM_BOOK_TOTAL_PAGE_PLACEHOLDER}
              type="number"
              min={MIN_TOTAL_PAGE_COUNT}
              max={MAX_TOTAL_PAGE_COUNT}
            />
          </div>

          <FormField
            name="description"
            control={control}
            label={MSG_ADD_CUSTOM_BOOK_PLOT}
            placeholder={MSG_ADD_CUSTOM_BOOK_PLOT_PLACEHOLDER}
            multiline
          />
        </div>
      </form>

      <BottomButton form="add-custom-book-form" type="submit" onClick={handleSubmit(onSubmit)} disabled={!isValid}>
        {isEditMode ? MSG_EDIT_CUSTOM_BOOK_SUBMIT : MSG_ADD_CUSTOM_BOOK_SUBMIT}
      </BottomButton>
    </>
  );
};

export default AddCustomBook;
