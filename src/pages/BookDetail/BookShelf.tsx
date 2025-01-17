type BookShelfProps = {
  cover: string;
  title: string;
};

const BookShelf = ({ cover, title }: BookShelfProps) => {
  return (
    <section className="flex h-[30%] w-full flex-shrink-0 flex-col items-center">
      <div className="relative z-10 flex aspect-[210/297] h-full">
        <img src={cover} alt={`${title} 커버`} className="shadow-[3px_-2px_5px_0_rgba(0,0,0,0.3)]" />

        <img
          src={`${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/shadow.png`}
          alt=""
          className="absolute -bottom-[0.125rem] right-0 z-50 w-10 translate-x-8 opacity-95"
        />
        <span className="absolute left-[0.325rem] top-[3px] h-[calc(100%-6px)] w-[0.05rem] bg-black opacity-50 blur-[2px]" />
      </div>
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
