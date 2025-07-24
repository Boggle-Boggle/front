type BookProps = {
  page: number;
  title: string;
};

const Book = ({ page, title }: BookProps) => {
  const colors = ['bg-primary-light', 'bg-secondary', 'bg-secondary-light'];
  const bgColorClass = colors[page % colors.length];

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
      style={{ boxShadow: 'inset 0px -1.11px 3.33px rgba(0, 0, 0, 0.25)', writingMode: 'vertical-lr' }}
      className={`inline-flex h-full justify-center rounded-sm py-2 ${widthClass} ${bgColorClass}`}
    >
      <span className="flex w-full items-center justify-center text-center font-book text-[10px] opacity-40">
        {filteredTitle}
      </span>
    </div>
  );
};

export default Book;
