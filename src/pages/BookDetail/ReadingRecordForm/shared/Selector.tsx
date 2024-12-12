import { useRef, useEffect, Dispatch, SetStateAction } from 'react';

type SelectorProps = {
  list: (string | number)[];
  selected: number | null;
  setSelected: Dispatch<SetStateAction<number | null>>;
};

const Selector = ({ list, selected, setSelected }: SelectorProps) => {
  const newList = ['', ...list, '', ''];
  const ref = useRef<HTMLUListElement>(null);
  const ITEM_HEIGHT = 40;

  const handleScroll = () => {
    if (ref.current) {
      const index = Math.floor((ref.current.scrollTop + ITEM_HEIGHT / 2) / ITEM_HEIGHT) + 1;

      if (newList[index] !== '') {
        setSelected(index);
      }
    }
  };

  useEffect(() => {
    if (ref.current && selected) {
      ref.current.scrollTop = selected * ITEM_HEIGHT - ITEM_HEIGHT;
    }
  }, [selected]);

  return (
    <ul
      ref={ref}
      onScroll={handleScroll}
      className="relative mt-6 h-[200px] w-full list-none overflow-y-scroll scroll-smooth p-0"
      style={{
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
        scrollbarWidth: 'none',
      }}
    >
      <div className="sticky top-[80px] box-border h-[40px] border-y-2 border-accent" />
      {newList.map((item, index) => (
        <li
          key={index}
          className={`flex h-[30px] snap-center items-center justify-center font-bold tracking-[.32px] h-[${ITEM_HEIGHT}px] ${
            index === selected ? 'opacity-100' : 'opacity-40'
          }`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};

export default Selector;
