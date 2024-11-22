type SubTitleProps = {
  message: string;
};

const SubTitle = ({ message }: SubTitleProps) => {
  return <p className="mb-6 mt-2 whitespace-pre-line text-[13px] opacity-60">{message}</p>;
};

export default SubTitle;
