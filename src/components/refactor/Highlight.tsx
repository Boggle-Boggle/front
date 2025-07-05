type HighlightProps = {
  children: React.ReactNode;
};

const Highlight = ({ children }: HighlightProps) => {
  return (
    <span className="relative">
      <span className="z-highlight relative">{children}</span>
      <span className="absolute bottom-0 left-0 h-[13px] w-full bg-primary opacity-50" />
      <span className="absolute bottom-0 right-0 h-[13px] w-1 bg-primary opacity-50" />
    </span>
  );
};

export default Highlight;
