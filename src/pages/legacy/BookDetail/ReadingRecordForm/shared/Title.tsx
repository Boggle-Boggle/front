type TitleProps = {
  message: string;
};

const Title = ({ message }: TitleProps) => {
  return <p className="text-lg font-bold">{message}</p>;
};

export default Title;
