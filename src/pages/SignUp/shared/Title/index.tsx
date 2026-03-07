import Highlight from 'components/Highlight';

type TitleProps = {
  text: string;
  align?: 'left' | 'center';
};

export const Title = (props: TitleProps) => {
  const { text, align = 'left' } = props;
  const lines = text.split('\n');

  const alignClass = align === 'center' ? 'text-center' : 'text-left';

  return (
    <h1 className={`mt-10 whitespace-pre-line text-h1 ${alignClass}`}>
      {lines.map((line) => {
        return (
          <span key={line} className="block">
            <Highlight text={line} />
          </span>
        );
      })}
    </h1>
  );
};
