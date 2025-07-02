type HeaderProps = {
  leftBtn?: React.ReactNode;
  title?: React.ReactNode;
  rightBtn?: React.ReactNode;
  withSpacer?: boolean;
};

const Header = ({ leftBtn, title, rightBtn, withSpacer = true }: HeaderProps) => {
  return (
    <>
      <div className="fixed z-50 grid h-12 w-full grid-cols-[48px_auto_48px] items-center px-mobile pt-safe-top">
        <span className={`justify-self-start ${leftBtn || 'invisible'}`}>{leftBtn}</span>
        <span className="text-body1 w-full justify-self-center px-2 text-center">{title}</span>
        <span className={`justify-self-end ${rightBtn || 'invisible'}`}>{rightBtn}</span>
      </div>
      {withSpacer && (
        <div className="pt-safe-top">
          <div className="h-12" />
        </div>
      )}
    </>
  );
};

export default Header;
