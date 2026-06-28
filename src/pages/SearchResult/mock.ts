export const hasReadingRecordMock = async (isbn: string): Promise<number | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isRegistered = parseInt(isbn.split('-')[2], 10) % 2 !== 0;
      resolve(isRegistered ? 123 : null);
    }, 200);
  });
};
