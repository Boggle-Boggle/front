import { SubmitHandler, useForm } from 'react-hook-form';
import { useLayerStore } from 'stores/useLayerStore';

import BookCover from 'components/BookCover';
import { BottomButton } from 'components/Button';
import { Header } from 'components/Header';
import { IconCirclePlus } from 'components/icons';

import { CoverImageUrlModal } from './shared/CoverImageUrlModal';
import { FormField } from './shared/FormField';

const MSG_ADD_CUSTOM_BOOK_PAGE_TITLE = '직접 등록하기';
const MSG_ADD_CUSTOM_BOOK_SUBMIT = '독서 기록 추가하기';
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

type BookForm = {
  coverImageUrl: string;
  title: string;
  author: string;
  publisher: string;
  isbn: string;
  totalPageCount: string;
  plot: string;
};

export const AddCustomBook = () => {
  const {
    control,
    handleSubmit,
    formState: { isValid },
    resetField,
    setValue,
    watch,
  } = useForm<BookForm>({
    mode: 'onChange',
    defaultValues: {
      coverImageUrl: '',
      title: '',
      author: '',
      publisher: '',
      isbn: '',
      totalPageCount: '',
      plot: '',
    },
  });
  const { push } = useLayerStore();
  const coverImageUrl = watch('coverImageUrl');

  const onSubmit: SubmitHandler<BookForm> = () => {};

  const handleSubmitCoverImageUrl = (imageUrl: string) => {
    setValue('coverImageUrl', imageUrl, { shouldDirty: true });
  };

  const handleOpenCoverImageUrlModal = () => {
    push({
      id: LAYER_ID_ADD_CUSTOM_BOOK_COVER_IMAGE_URL_MODAL,
      type: 'MODAL',
      component: <CoverImageUrlModal initialValue={coverImageUrl} onSubmit={handleSubmitCoverImageUrl} />,
    });
  };

  return (
    <>
      <Header withBack title={MSG_ADD_CUSTOM_BOOK_PAGE_TITLE} />

      <form
        id="add-custom-book-form"
        onSubmit={handleSubmit(onSubmit)}
        className="h-full overflow-y-auto px-mobile pb-4"
      >
        <div className="mx-auto mt-4 w-[6.25rem]">
          <BookCover
            className="w-full"
            url={coverImageUrl}
            shadowLeftBar
            rounded="sm"
            overlayBottomRight={
              <button
                type="button"
                onClick={handleOpenCoverImageUrlModal}
                aria-label="표지 추가"
                className="relative z-badge grid size-[2.25rem] place-items-center rounded-br-[0.25rem] rounded-tl-lg bg-primary text-neutral-0"
              >
                <IconCirclePlus className="size-6" />
              </button>
            }
          />
        </div>

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
              name="totalPageCount"
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
            name="plot"
            control={control}
            label={MSG_ADD_CUSTOM_BOOK_PLOT}
            placeholder={MSG_ADD_CUSTOM_BOOK_PLOT_PLACEHOLDER}
            multiline
          />
        </div>
      </form>

      <BottomButton form="add-custom-book-form" type="submit" onClick={handleSubmit(onSubmit)} disabled={!isValid}>
        {MSG_ADD_CUSTOM_BOOK_SUBMIT}
      </BottomButton>
    </>
  );
};

export default AddCustomBook;
