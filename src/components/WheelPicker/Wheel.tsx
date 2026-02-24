import { useEffect, useRef, useState } from 'react';

type WheelItem = {
  value: string | number;
  label: string;
};

type WheelProps = {
  items: WheelItem[];
  value: string | number;
  onChange: (value: string | number) => void;
  height?: number;
  itemHeight?: number;
};

export const Wheel = (props: WheelProps) => {
  const { items, value, onChange, height = 200, itemHeight = 40 } = props;
  const [isScrolling, setIsScrolling] = useState<boolean>(false);

  const listRef = useRef<HTMLUListElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isInitializedRef = useRef<boolean>(false);

  const visibleItemCount = Math.floor(height / itemHeight);
  const paddingCount = Math.floor(visibleItemCount / 2);

  const paddingItems = Array.from({ length: paddingCount }).map((_, i) => ({
    value: `pad-${i}`,
    label: '',
    isPadding: true,
  }));

  const displayItems = [...paddingItems, ...items.map((item) => ({ ...item, isPadding: false })), ...paddingItems];

  const handleScroll = () => {
    if (!listRef.current) return;

    setIsScrolling(true);
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    const { scrollTop } = listRef.current;
    const selectedIndex = Math.floor((scrollTop + itemHeight / 2) / itemHeight);
    const clampedIndex = Math.max(0, Math.min(selectedIndex, items.length - 1));
    const selectedItem = items[clampedIndex];

    if (selectedItem && selectedItem.value !== value) {
      onChange(selectedItem.value);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 150);
  };

  useEffect(() => {
    if (!listRef.current || isScrolling) return;

    const selectedIndex = items.findIndex((item) => item.value === value);
    if (selectedIndex !== -1) {
      const targetScrollTop = selectedIndex * itemHeight;

      if (!isInitializedRef.current) {
        listRef.current.scrollTop = targetScrollTop;
        isInitializedRef.current = true;
        return;
      }

      if (Math.abs(listRef.current.scrollTop - targetScrollTop) > 1) {
        listRef.current.scrollTo({
          top: targetScrollTop,
          behavior: 'smooth',
        });
      }
    }
  }, [value, items, itemHeight, isScrolling]);

  return (
    <div className="relative w-full flex-1 overflow-hidden" style={{ height }}>
      <div
        className="pointer-events-none absolute left-0 z-10 w-full border-y border-gray-200"
        style={{
          top: '50%',
          transform: 'translateY(-50%)',
          height: itemHeight,
        }}
      />

      <ul
        ref={listRef}
        onScroll={handleScroll}
        className="h-full w-full snap-y snap-mandatory overflow-y-scroll scroll-smooth [&::-webkit-scrollbar]:hidden"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {displayItems.map((item, index) => {
          const isSelected = !item.isPadding && item.value === value;

          return (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={`${item.value}-${index}`}
              className={`flex snap-center items-center justify-center transition-opacity duration-200 ${
                item.isPadding ? '' : 'cursor-pointer'
              } ${isSelected ? 'font-bold opacity-100' : 'opacity-40'}`}
              style={{ height: itemHeight }}
            >
              <button
                type="button"
                onClick={() => {
                  if (!item.isPadding && item.value !== value) {
                    onChange(item.value);
                  }
                }}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
