import { SubmitHandler, useForm } from 'react-hook-form';

import BookCover from 'components/BookCover';
import { BottomButton } from 'components/Button';
import { Header } from 'components/Header';
import { IconCirclePlus } from 'components/icons';

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

type BookForm = {
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
    register,
    handleSubmit,
    formState: { isValid },
    resetField,
  } = useForm<BookForm>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      author: '',
      publisher: '',
      isbn: '',
      totalPageCount: '',
      plot: '',
    },
  });

  const onSubmit: SubmitHandler<BookForm> = () => {};

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
            url=""
            shadowLeftBar
            rounded="sm"
            overlayBottomRight={
              <button
                type="button"
                aria-label="표지 추가"
                className="grid size-[2.25rem] place-items-center rounded-br-[0.25rem] rounded-tl-lg bg-primary text-neutral-0"
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
            />
          </div>

          <FormField
            name="plot"
            label={MSG_ADD_CUSTOM_BOOK_PLOT}
            placeholder={MSG_ADD_CUSTOM_BOOK_PLOT_PLACEHOLDER}
            register={register}
            variant="textarea"
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
