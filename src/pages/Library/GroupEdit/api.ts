import { api } from 'api';
import type { ApiSuccessResponse } from 'api.types';

import type { BookshelfItem } from 'pages/Records/shared/api';

export type RenameBookshelfRequest = {
  bookshelfId: number;
  name: string;
};

export const renameBookshelf = async (params: RenameBookshelfRequest) => {
  const { bookshelfId, name } = params;
  const response = await api.put<ApiSuccessResponse<BookshelfItem>>(`/v2/bookshelves/${bookshelfId}`, { name });

  return response.data.data;
};
