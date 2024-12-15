import { useEffect } from 'react';

const Loading = () => {
  useEffect(() => {
    const img = new Image();
    img.src = `${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/Spinner.gif`;
  }, []);

  return (
    <section className="absolute left-0 top-0 flex h-full w-full items-center justify-center">
      <img src={`${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/Spinner.gif`} alt="로딩중" className="w-14" />
    </section>
  );
};

export default Loading;
