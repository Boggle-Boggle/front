import { PointerEvent, SVGProps } from 'react';

type KeyboardDismissButtonProps = {
  label: string;
  bottomInset: number;
  onPointerDown: (event: PointerEvent<HTMLButtonElement>) => void;
};

const KeyboardDismissIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 32 32" fill="none" aria-hidden="true" {...props}>
    <rect x="4" y="5" width="24" height="15" rx="2.5" stroke="currentColor" strokeWidth="2.4" />
    <path
      d="M9 10h.01M13.5 10h.01M18 10h.01M22.5 10h.01M11.25 14h.01M15.75 14h.01M20.25 14h.01"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
    />
    <path d="M13 17h6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
    <path d="m11 24 5 5 5-5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const KeyboardDismissButton = (props: KeyboardDismissButtonProps) => {
  const { label, bottomInset, onPointerDown } = props;

  return (
    <div
      className="fixed inset-x-0 z-fixedBtn mx-auto flex max-w-mobile justify-end px-mobile"
      style={{ bottom: `calc(${bottomInset}px + 0.5rem)` }}
    >
      <button
        type="button"
        aria-label={label}
        onPointerDown={onPointerDown}
        className="grid size-11 place-items-center rounded-full bg-neutral-100 text-neutral-0 shadow-[0_0.25rem_1rem_rgba(0,0,0,0.18)]"
      >
        <KeyboardDismissIcon className="size-7" />
      </button>
    </div>
  );
};
