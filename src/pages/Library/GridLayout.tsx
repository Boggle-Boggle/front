import { LibraryBook } from 'types/library';

import GridItem from './GridItem';

type GridLayoutProps = {
  allBooks: LibraryBook[];
};

const GridLayout = ({ allBooks }: GridLayoutProps) => {
  const chunkedBooks = [];
  for (let i = 0; i < allBooks.length; i += 3) {
    chunkedBooks.push(allBooks.slice(i, i + 3));
  }

  while (chunkedBooks.length < 4) {
    chunkedBooks.push([]);
  }

  return chunkedBooks.map((books) => (
    <section
      style={{ height: window.innerHeight * 0.18 }}
      className="relative flex w-full items-end justify-end shadow-[20px_30px_40px_rgba(0,0,0,0.15)]"
    >
      <div className="z-10 mb-5 grid h-[7rem] w-full grid-cols-3 items-end gap-12 px-7">
        {books[0] && <GridItem book={books[0]} />}
        {books[1] && <GridItem book={books[1]} />}
        {books[2] && <GridItem book={books[2]} />}
      </div>
      <div className="absolute bottom-3 h-5 w-full bg-gradient-to-b from-[#C1BEBD] via-[#D6D3D3] via-80% to-[#E7E4E4]" />
      <div className="absolute bottom-0 h-3 w-full bg-gradient-to-b from-[#E7E4E4] via-[#D6D3D3] via-60% to-[#C1BEBD]" />
    </section>
  ));
};

export default GridLayout;
