type BubbleType = {
  text: string;
};

const Bubble = ({ text }: BubbleType) => {
  const baseClass =
    'relative w-20 h-9 -translate-x-1/2 left-1/2  rounded-lg border border-neutral-40 bg-neutral-0 flex items-center justify-center';

  const beforeClass =
    'before:content-[""] before:absolute before:top-[-9px] before:left-8 ' +
    'before:border-solid before:border-x-8 before:border-b-8 before:border-t-0 ' +
    'before:border-neutral-40 before:border-x-transparent before:z-0';

  const afterClass =
    'after:content-[""] after:absolute after:top-[-8px] after:left-8 ' +
    'after:border-solid after:border-x-8 after:border-b-8 after:border-t-0 ' +
    'after:border-neutral-0 after:border-x-transparent after:z-10';

  return (
    <div className="absolute -bottom-12">
      <div className={`${baseClass} ${beforeClass} ${afterClass}`}>
        <span className="text-caption1 text-black">{text}</span>
      </div>
    </div>
  );
};

export default Bubble;
