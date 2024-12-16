import GridItem from './GridItem';

const Grid = () => {
  const map = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  return map.map(() => (
    <section className="mb-14 mt-3 flex w-full flex-col items-center shadow-2xl">
      <section className="z-10 flex w-full justify-between px-7">
        <GridItem />
        <GridItem />
        <GridItem />
      </section>
      <div className="relative w-full">
        <div className="absolute -top-2 right-0 h-5 w-full bg-gradient-to-b from-[#C1BEBD] via-[#D6D3D3] via-80% to-[#E7E4E4]" />
        <div className="absolute top-3 h-3 w-full bg-gradient-to-b from-[#E7E4E4] via-[#D6D3D3] via-60% to-[#C1BEBD]" />
      </div>
    </section>
  ));
};

export default Grid;
