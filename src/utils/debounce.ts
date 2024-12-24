const searchDebounce = (func: () => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;

  return () => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func();
    }, delay);
  };
};

export default searchDebounce;
