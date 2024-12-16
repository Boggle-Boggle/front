const GridItem = () => {
  return (
    <div className="relative shadow-[2px_0_10px_0_rgba(0,0,0,0.5)]">
      <span className="absolute left-1 h-full w-[0.0625rem] bg-black opacity-50 blur-[2px]" />
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPTxyiWKkH0CSneLPcjdgmDNitxGVOQwkjww&s"
        alt="책 커버"
        className="z-20 h-36 w-[6.3rem] shadow-md"
      />
      <img
        src={`${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/shadow.png`}
        alt=""
        className="absolute -bottom-1 left-[6.8rem] z-50 -translate-x-1/2 opacity-95"
      />
      <img
        src={`${import.meta.env.VITE_IMG_BASE_URL || ''}/assets/Subtract.png`}
        alt=""
        className="absolute right-0 top-0 h-9 w-9"
      />
      <span className="absolute right-0 top-0 flex flex-col items-end pt-1 text-[0.7rem] leading-none text-white">
        <p className="text-[0.314rem] tracking-tighter">⭐️⭐️⭐️⭐️⭐️</p>
        5.0
      </span>
    </div>
  );
};

export default GridItem;
