import { useNavigate } from 'react-router-dom';

import IconButton from 'components/Button/IconButton';
import { IconArrowLeft } from 'components/icons';

type BackButtonProps = {
  onClick?: () => void;
};

const BackButton = ({ onClick }: BackButtonProps) => {
  const navigate = useNavigate();

  return <IconButton onClick={onClick || (() => navigate(-1))} label="뒤로가기" icon={IconArrowLeft} />;
};

export default BackButton;
