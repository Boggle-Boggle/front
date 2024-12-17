type ContentItemProps = {
  children: React.ReactNode;
};

const ContentItem = ({ children }: ContentItemProps) => {
  return (
    <li className="flex h-12 list-none items-center justify-between border-b-[1px] border-b-main px-4 opacity-70">
      {children}
    </li>
  );
};

export default ContentItem;
