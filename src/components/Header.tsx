import { useNavigate } from 'react-router-dom';

import { IconArrowLeft } from 'components/icons';

type HeaderProps = {
  leftBtn?: boolean | React.ReactNode;
  title?: React.ReactNode;
  rightBtn?: React.ReactNode;
  withSpacer?: boolean;
};

const Header = ({ leftBtn, title, rightBtn, withSpacer = true }: HeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="fixed z-header grid h-12 w-full max-w-mobile grid-cols-[48px_auto_48px] items-center px-mobile pt-safe-top">
        {leftBtn === true ? (
          <IconArrowLeft className="size-icon-md" onClick={() => navigate(-1)} />
        ) : (
          <span className={`justify-self-start ${leftBtn || 'invisible'}`}>{leftBtn}</span>
        )}
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
