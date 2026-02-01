import BackButton from './BackButton';

type HeaderProps = {
  title?: React.ReactNode;
  leftBtn?: React.ReactNode;
  rightBtn?: React.ReactNode;
  withBack?: boolean;
  withSpacer?: boolean;
  transparent?: boolean;
};

const Header = ({
  title,
  leftBtn,
  rightBtn,
  withBack = false,
  withSpacer = true,
  transparent = false,
}: HeaderProps) => {
  const transparentClass = transparent ? 'bg-transparent' : 'bg-neutral-0';
  return (
    <>
      <div
        className={`fixed z-header grid h-header w-full max-w-mobile grid-cols-[1fr_auto_1fr] items-center pt-safe-top ${transparentClass}`}
      >
        <div className="flex justify-start">
          {withBack && <BackButton />}
          {leftBtn}
        </div>
        <h1 className="truncate px-2 text-center text-body1">{title}</h1>
        <div className="flex justify-end">{rightBtn}</div>
      </div>

      {withSpacer && <div className="mt-safe-top h-header" />}
    </>
  );
};

export default Header;
