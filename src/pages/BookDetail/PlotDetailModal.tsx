import { FaXmark } from 'react-icons/fa6';

import Header from 'components/Header';
import Modal from 'components/Modal';

type PlotDetailModalProps = {
  isOpen: boolean;
  close: () => void;
  scrollPos: number;
  plot: string;
};

const PlotDetailModal = ({ plot, isOpen, close, scrollPos }: PlotDetailModalProps) => {
  return (
    <Modal onClose={close} isOpen={isOpen} scrollPos={scrollPos} hasCloseMark={false}>
      <section className="h-[30rem] w-80">
        <Header
          title={<span className="opacity-70">줄거리</span>}
          rightBtn={<FaXmark style={{ width: '24px', height: '24px', opacity: '70%' }} onClick={close} />}
        />

        <section className="h-[23rem] overflow-y-auto px-7 text-sm">{plot}</section>
      </section>
    </Modal>
  );
};

export default PlotDetailModal;
