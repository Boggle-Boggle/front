import { useLocation, useNavigate } from 'react-router-dom';

import Header from 'components/Header';

import useDevice from 'hooks/useDevice';

const Term = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isIOS } = useDevice();

  const { title, content } = location.state;
  return (
    <div className="h-full w-full bg-white">
      <Header
        title={title}
        rightBtn={<button type="button" aria-label="뒤로가기" onClick={() => navigate('/myPage')} />}
      />
      <p
        className={`${isIOS ? 'height-without-headerIOS' : 'height-without-headerAnd'} overflow-y-scroll whitespace-pre-wrap px-4`}
      >
        {content}
      </p>
    </div>
  );
};

export default Term;
