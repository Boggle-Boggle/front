type ContentItemProps = {
  children: React.ReactNode;
};

const ContentItem = ({ children }: ContentItemProps) => {
  return <li className="flex h-12 items-center justify-between border-b-[1px] border-b-main px-4">{children}</li>;
};

export default ContentItem;
