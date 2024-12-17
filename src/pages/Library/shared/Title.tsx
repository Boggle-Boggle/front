type TitleProps = {
  message: string;
};

const Title = ({ message }: TitleProps) => {
  return (
    <header className="relative flex h-10 items-center justify-center text-lg font-semibold">
      {message}
      {message === '서재 편집' && <span className="absolute right-0 bg-slate-200 pr-4">편집</span>}
    </header>
  );
};

export default Title;
