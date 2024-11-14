type BookShelfProps = {
  cover: string;
  title: string;
};

const BookShelf = ({ cover, title }: BookShelfProps) => {
  return (
    <section className="flex w-full flex-col items-center">
      <img src={cover} alt={`${title} 커버`} className="z-10 h-[234px] w-[167px]" />
      <div className="relative w-full">
        <div
          style={{ clipPath: 'polygon(10% 0%, 80% 0%, 10000000% 100%, 0% 100%)' }}
          className="absolute -top-8 right-0 h-8 w-full bg-gradient-to-b from-[#C1BEBD] via-[#D6D3D3] via-80% to-[#E7E4E4]"
        />
        <div className="h-5 w-full bg-gradient-to-b from-[#E7E4E4] via-[#D6D3D3] via-60% to-[#C1BEBD]" />
      </div>
    </section>
  );
};

export default BookShelf;
