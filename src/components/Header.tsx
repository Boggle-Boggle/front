type HeaderProps = {
  leftBtn?: JSX.Element;
  title?: JSX.Element | string;
  rightBtn?: JSX.Element;
  hasBackground?: boolean;
};

const Header = ({ leftBtn, title, rightBtn, hasBackground = false }: HeaderProps) => {
  return (
    <div
      className={` ${hasBackground ? 'fixed' : 'sticky'} z-30 grid h-16 w-full grid-cols-[100px_auto_100px] items-center px-3`}
    >
      <span className={`justify-self-start ${leftBtn ? '' : 'invisible'}`}>{leftBtn}</span>
      <span className="tex w-full justify-self-center text-center font-semibold">{title}</span>
      <span className={`justify-self-end ${rightBtn ? '' : 'invisible'}`}>{rightBtn}</span>
    </div>
  );
};

export default Header;
