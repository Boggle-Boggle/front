import Highlight from 'components/Highlight';
import ArrowRight from 'components/icons/ArrowRight';

type TitleProps = {
  text: string;
  onLoadMore?: () => void;
};

const MSG_SEARCH_MORE = '더보기';

export const Title = (props: TitleProps) => {
  const { text, onLoadMore } = props;

  return (
    <div className="flex w-full items-center justify-between px-mobile py-5">
      <Highlight text={text} className="text-title2" />
      {onLoadMore && (
        <button
          type="button"
          className="flex items-center gap-[3px] text-caption1 text-neutral-40"
          onClick={onLoadMore}
        >
          <span>{MSG_SEARCH_MORE}</span>
          <ArrowRight />
        </button>
      )}
    </div>
  );
};
