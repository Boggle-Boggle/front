import { ReactNode, useEffect, useRef, useState } from 'react';

import { IconButton } from 'components/Button';
import { IconCircleInfo } from 'components/icons';

type PopoverProps = {
  content: ReactNode;
  placement?: 'left' | 'center' | 'right';
  defaultOpen?: boolean;
};

const MSG_POPOVER_INFO_BUTTON_LABEL = '정보 팝오버 열기';

export const Popover = (props: PopoverProps) => {
  const { content, placement = 'center', defaultOpen = false } = props;

  const [internalOpen, setInternalOpen] = useState<boolean>(defaultOpen);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const placementClass =
    placement === 'left' ? 'left-0' : placement === 'right' ? 'right-0' : 'left-1/2 -translate-x-1/2';
  const arrowAlignClass =
    placement === 'left' ? 'justify-start' : placement === 'right' ? 'justify-end' : 'justify-center';
  const arrowPaddingClass = placement === 'left' ? 'pl-2' : placement === 'right' ? 'pr-2' : '';
  const popoverPaddingClass = placement === 'left' ? '-left-[5px]' : placement === 'right' ? '-right-[5px]' : '';

  const handleToggle = () => setInternalOpen((prev) => !prev);

  const handleOutsideClick = (event: MouseEvent) => {
    if (!containerRef.current) return;
    if (containerRef.current.contains(event.target as Node)) return;

    setInternalOpen(false);
  };

  useEffect(() => {
    if (!internalOpen) return;

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [internalOpen]);

  return (
    <div className="bg-slate-0 relative flex" ref={containerRef}>
      <IconButton icon={IconCircleInfo} label={MSG_POPOVER_INFO_BUTTON_LABEL} onClick={handleToggle} size="sm" />
      {internalOpen && (
        <div
          className={`absolute top-full ${placementClass} ${popoverPaddingClass}`}
          style={{ filter: 'drop-shadow(0px 2px 8px #0000001F)' }}
        >
          {/* Arrow */}
          <div className={`flex pt-1 ${arrowAlignClass} ${arrowPaddingClass}`}>
            <svg
              className="h-[9px] w-fit text-neutral-0"
              viewBox="0 0 12 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path d="M6 0L0 9H12L6 0Z" fill="currentColor" />
            </svg>
          </div>
          {/* Tooltip */}
          <div className="w-max whitespace-nowrap rounded-lg bg-neutral-0 p-2 text-caption1 text-neutral-100">
            {content}
          </div>
        </div>
      )}
    </div>
  );
};
