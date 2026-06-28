import type { PageMeta } from 'api.types';

export const getNextPageParam = (pageMeta: PageMeta) => {
  const { page, size, total } = pageMeta;

  if (page * size >= total) return undefined;

  return page + 1;
};
