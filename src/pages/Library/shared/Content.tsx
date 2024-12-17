type ContentProps = {
  children: React.ReactNode;
};
const Content = ({ children }: ContentProps) => {
  return <ol className="mt-4 rounded-[10px] bg-white">{children}</ol>;
};

export default Content;
