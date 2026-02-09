import Highlight from 'components/Highlight';
import ArrowRight from 'components/icons/ArrowRight';

type TitleProps = {
  text: string;
  onLoadMore?: () => void;
};

const Title = ({ text, onLoadMore }: TitleProps) => {
  return (
    <div className="flex w-full items-center justify-between px-mobile py-5">
      <Highlight text={text} className="text-title3" />
      {onLoadMore && (
        <button
          type="button"
          className="flex items-center gap-[3px] text-caption1 text-neutral-40"
          onClick={onLoadMore}
        >
          <span>더보기</span>
          <ArrowRight />
        </button>
      )}
    </div>
  );
};

export default Title;
