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
      className={` ${isIOS ? 'h-headerIOS pt-[47px]' : 'h-headerAnd items-center'} ${backgroundColor ? `fixed ${backgroundColor}` : 'sticky'} z-30 grid w-full grid-cols-[30px_auto_30px] px-2`}
    >
      <span className={`justify-self-start ${leftBtn ? '' : 'invisible'}`}>{leftBtn}</span>
      <span className="tex w-full justify-self-center text-center font-semibold">{title}</span>
      <span className={`justify-self-end ${rightBtn ? '' : 'invisible'}`}>{rightBtn}</span>
    </div>
  );
};

export default Header;
