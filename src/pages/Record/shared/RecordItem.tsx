type RecordItemProps = {
  icons?: React.ReactNode;
  title?: React.ReactNode;
  content?: React.ReactNode;
};

const RecordItem = ({ icons, title, content }: RecordItemProps) => {
  return (
    <div className="flex justify-between border-b border-main px-4 py-[0.875rem]">
      <span className="flex items-center">
        {icons}
        <p className="ml-2">{title}</p>
      </span>
      <span>{content}</span>
    </div>
  );
};

export default RecordItem;
