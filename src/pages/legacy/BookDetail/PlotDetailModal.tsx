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
          title={<span className="opacity-70">책소개</span>}
          rightBtn={<button type="button" onClick={close} className="absolute right-3 top-3" aria-label="닫기" />}
        />

        <section className="h-[23rem] overflow-y-auto px-7 text-sm">{plot}</section>
      </section>
    </Modal>
  );
};

export default PlotDetailModal;
