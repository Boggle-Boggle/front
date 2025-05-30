import useDevice from 'hooks/useDevice';

type HeaderProps = {
  leftBtn?: JSX.Element;
  title?: JSX.Element | string;
  rightBtn?: JSX.Element;
  backgroundColor?: string;
};

const Header = ({ leftBtn, title, rightBtn, backgroundColor }: HeaderProps) => {
  const { isIOS } = useDevice();

  return (
    <div
      className={` ${isIOS ? 'h-headerIOS pt-[47px]' : 'h-headerAnd items-center'} ${backgroundColor ? `fixed m-auto max-w-screen-sm ${backgroundColor}` : 'sticky'} z-30 grid w-full grid-cols-[30px_auto_30px] px-[9px]`}
    >
      <span className={`justify-self-start ${leftBtn ? '' : 'invisible'}`}>{leftBtn}</span>
      <span className="w-full justify-self-center px-2 text-center font-semibold">{title}</span>
      <span className={`justify-self-end ${rightBtn ? '' : 'invisible'}`}>{rightBtn}</span>
    </div>
  );
};

export default Header;
