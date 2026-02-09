import Highlight from 'components/Highlight';

const ContinueExploringSection = () => {
  return (
    <div className="w-full px-mobile pb-10 pt-6">
      <div className="relative overflow-hidden rounded-2xl bg-neutral-5 px-5 py-6">
        <p className="text-title3">
          <Highlight text="빼곡에서 계속 책을 살펴보세요" />
        </p>
        <p className="mt-2 text-caption1 text-neutral-40">관심사에 맞는 책을 이어서 추천해드려요.</p>
        <button className="mt-4 rounded-full bg-primary px-4 py-2 text-caption1 text-white">계속 보기</button>
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/20" />
      </div>
    </div>
  );
};

export default ContinueExploringSection;
