type HeaderProps = {
  leftBtn?: React.ReactNode;
  title?: React.ReactNode;
  rightBtn?: React.ReactNode;
  withSpacer?: boolean;
};

const Header = ({ leftBtn, title, rightBtn, withSpacer = true }: HeaderProps) => {
  return (
    <>
      <div className="z-header fixed grid h-12 w-full max-w-mobile grid-cols-[48px_auto_48px] items-center px-mobile pt-safe-top">
        <span className={`justify-self-start ${leftBtn || 'invisible'}`}>{leftBtn}</span>
        <span className="w-full justify-self-center px-2 text-center text-body1">{title}</span>
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
