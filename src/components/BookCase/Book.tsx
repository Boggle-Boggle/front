type BookProps = {
  page: number;
  title: string;
};

const bookColors = ['bg-primary-light', 'bg-secondary', 'bg-secondary-light'];

export const Book = (props: BookProps) => {
  const { page, title } = props;
  const bgColorClass = bookColors[page % bookColors.length];

  const widthClass =
    page >= 500
      ? 'w-14'
      : page >= 400
        ? 'w-12'
        : page >= 300
          ? 'w-10'
          : page >= 200
            ? 'w-8'
            : page >= 100
              ? 'w-6'
              : 'w-4';

  const filteredTitle = title.replace(/[^a-zA-Z0-9가-힣]+/g, '').slice(0, page >= 400 ? 21 : page >= 200 ? 14 : 7);

  return (
    <div
      style={{
        boxShadow: 'inset 0px -1.11px 3.33px rgba(0, 0, 0, 0.25)',
        writingMode: 'vertical-lr',
        textOrientation: 'upright',
      }}
      className={`inline-flex h-[5.625rem] items-center justify-center rounded-sm py-1 ${widthClass} ${bgColorClass}`}
    >
      <span className="flex w-3 items-center justify-center text-center font-book text-[10px] leading-none text-neutral-100 opacity-40">
        {filteredTitle}
      </span>
    </div>
  );
};
