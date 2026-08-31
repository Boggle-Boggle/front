export const getBookThickness = (page: number) => {
  if (page >= 500) return { px: 56, className: 'w-14' };
  if (page >= 400) return { px: 48, className: 'w-12' };
  if (page >= 300) return { px: 40, className: 'w-10' };
  if (page >= 200) return { px: 32, className: 'w-8' };
  if (page >= 100) return { px: 24, className: 'w-6' };
  return { px: 16, className: 'w-4' };
};
