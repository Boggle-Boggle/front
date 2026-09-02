import { getBookThickness } from './utils';

type BookProps = {
  page: number;
  title: string;
  onClick?: () => void;
};

const bookColors = ['bg-primary-light', 'bg-secondary', 'bg-secondary-light'];

export const Book = (props: BookProps) => {
  const { page, title, onClick } = props;
  const bgColorClass = bookColors[page % bookColors.length];

  const { className: widthClass } = getBookThickness(page);

  const filteredTitle = title.replace(/[^a-zA-Z0-9가-힣]+/g, '').slice(0, page >= 400 ? 21 : page >= 200 ? 14 : 7);

  return (
    <button
      type="button"
      style={{
        boxShadow: 'inset 0px -1.11px 3.33px rgba(0, 0, 0, 0.25)',
        writingMode: 'vertical-lr',
        textOrientation: 'upright',
      }}
      onClick={onClick}
      className={`inline-flex h-[5.625rem] items-center justify-center rounded-sm p-0 m-0 border-0 outline-none cursor-pointer ${widthClass} ${bgColorClass}`}
    >
      <span className="flex w-3 items-center justify-center text-center font-book text-[10px] leading-none text-neutral-100 opacity-40">
        {filteredTitle}
      </span>
    </button>
  );
};
