type HighlightProps = {
  text: string;
  className?: string;
};

const Highlight = ({ text, className }: HighlightProps) => {
  return (
    <span className={`relative inline-block ${className ?? ''}`}>
      <span className="relative z-highlight">{text}</span>
      <span className="pointer-events-none absolute bottom-0 left-0 h-3 w-full bg-primary opacity-50" />
      <span className="pointer-events-none absolute bottom-0 right-0 h-3 w-1 bg-primary opacity-50" />
    </span>
  );
};

export default Highlight;
