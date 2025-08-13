import { isValidElement } from 'react';
import { useNavigate } from 'react-router-dom';

import { IconArrowLeft } from 'components/icons';

import IconButton from './refactor/Button/IconButton';

type HeaderProps = {
  prev?: () => void;
  title?: React.ReactNode;
  rightBtn?: React.ReactNode;
  withSpacer?: boolean;
};

const Header = ({ prev, title, rightBtn, withSpacer = true }: HeaderProps) => {
  const navigate = useNavigate();

  const isTwoRightBtn = isValidElement(rightBtn) && Array.isArray(rightBtn?.props.children);

  return (
    <>
      <div className="fixed z-header flex h-12 w-full max-w-mobile items-center pt-safe-top">
        <IconButton onClick={prev || (() => navigate(-1))} label="뒤로가기">
          <IconArrowLeft className="size-icon-md" />
        </IconButton>
        {isTwoRightBtn && <div className="w-12" />}

        <span className="grow truncate px-2 text-center text-body1">{title}</span>

        <div className={`${rightBtn || 'invisible'} ${isTwoRightBtn ? 'h-12 w-24' : 'size-12'} flex`}>{rightBtn}</div>
      </div>

      {withSpacer && <div className="mt-safe-top h-12" />}
    </>
  );
};

export default Header;
