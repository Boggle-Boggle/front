import Highlight from 'components/Highlight';
import ArrowRight from 'components/icons/ArrowRight';

type TitleProps = {
  text?: string;
  showMore?: boolean;
  onMoreClick?: () => void;
};

export function Title({ text = '가장 많이 읽힌 책', showMore = true, onMoreClick }: TitleProps) {
  return (
    <div className="flex w-full items-center justify-between px-mobile py-5">
      <Highlight text={text} className="text-title3" />
      {showMore ? (
        <button className="flex items-center gap-[3px] text-caption1 text-neutral-40" onClick={onMoreClick}>
          <span>더보기</span>
          <ArrowRight />
        </button>
      ) : null}
    </div>
  );
}
