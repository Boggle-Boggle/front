import shadow from 'assets/library/shadow.png';

type BookShelfProps = {
  cover: string;
  title: string;
};

const BookShelf = ({ cover, title }: BookShelfProps) => {
  return (
    <section className="flex h-48 flex-shrink-0 flex-col items-center">
      <div className="relative z-10 flex aspect-[210/297] h-full">
        <img
          src={cover}
          alt={`${title} 커버`}
          className="absolute bottom-0 z-10 h-full w-40 shadow-[3px_2px_5px_0_rgba(0,0,0,0.3)]"
        />
        <img src={shadow} alt="" className="absolute -bottom-[0.125rem] right-0 z-50 w-10 translate-x-9 opacity-95" />
        <span className="absolute left-[0.325rem] top-0 z-20 h-[calc(100%-6px)] w-[0.05rem] bg-black opacity-50 blur-[2px]" />
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
