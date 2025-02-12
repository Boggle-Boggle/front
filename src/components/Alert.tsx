import alert from 'assets/img/alert.svg';

import Button from './Button';

type AlertProps = {
  message: string;
  onClose: () => void;
};

const Alert = ({ message, onClose }: AlertProps) => {
  return (
    <div className="fixed right-0 top-0 z-[60] flex h-full w-full items-center justify-center">
      <div className="absolute top-0 h-full w-full bg-black opacity-40" role="presentation" />
      <section className="z-[70] mx-auto w-[75%] rounded-md bg-white px-6 py-6 text-center">
        <img src={alert} alt="" className="m-auto" />
        <p className="mb-7 mt-5 whitespace-pre-line text-lg font-semibold">{message}</p>
        <Button handleClick={onClose}>확인</Button>
      </section>
    </div>
  );
};

export default Alert;
