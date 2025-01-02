import { BiX } from 'react-icons/bi';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from 'components/Header';

const Term = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { title, content } = location.state;
  return (
    <div className="h-full w-full bg-white">
      <Header
        title={title}
        rightBtn={<BiX style={{ width: '28px', height: '28px' }} onClick={() => navigate('/myPage')} />}
      />
      <p className="height-content overflow-y-scroll whitespace-pre-wrap px-4">{content}</p>
    </div>
  );
};

export default Term;
