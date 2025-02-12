import alert from 'assets/img/alert.svg';

import Button from './Button';

type AlertProps = {
  message: string;
  onClose: () => void;
};

const Alert = ({ message, onClose }: AlertProps) => {
  return (
    <div className="absolute flex h-full w-full items-center justify-center">
      <div className="absolute top-0 z-40 h-full w-full bg-black opacity-40" role="presentation" />
      <section className="z-50 mx-auto w-[75%] rounded-md bg-white px-6 py-6 text-center">
        <img src={alert} alt="" className="m-auto" />
        <p className="mb-7 mt-5 text-lg font-semibold">{message}</p>
        <Button handleClick={onClose}>확인</Button>
      </section>
    </div>
  );
};

export default Alert;
