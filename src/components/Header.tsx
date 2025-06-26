type HeaderProps = {
  leftBtn?: React.ReactNode;
  title?: React.ReactNode;
  rightBtn?: React.ReactNode;
  withSpacer?: boolean;
};

const Header = ({ leftBtn, title, rightBtn, withSpacer = true }: HeaderProps) => {
  return (
    <>
      <div className="pt-safe-top px-mobile fixed z-50 grid h-12 w-full grid-cols-[48px_auto_48px] items-center">
        <span className={`justify-self-start ${leftBtn || 'invisible'}`}>{leftBtn}</span>
        <span className="w-full justify-self-center px-2 text-center font-semibold">{title}</span>
        <span className={`justify-self-end ${rightBtn || 'invisible'}`}>{rightBtn}</span>
      </div>
      <div className={`pt-safe-top ${withSpacer && 'h-12'}`} />
    </>
  );
};

export default Header;
