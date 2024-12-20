export const formatDateAndTime = (dateTime: string) => {
  const [date, time] = dateTime.split('T');

  const [yy, mm, dd] = date.split('-');
  const [h, m, s] = time.split(':');

  return { yy, mm, dd, h, m, s };
};

export const formatDateTimeToDate = (dateTime: string) => {
  const date = dateTime.split('T')[0];

  const [yy, mm, dd] = date.split('-');

  return `${yy}.${mm}.${dd}`;
};

export const formatBookGenre = (Genre: string) => {
  const formattedGenre = Genre.split('>');

  return formattedGenre[2];
};

export const formatDate = (year: number, month: number, day: number) => {
  const fullYear = 2000 + year;
  const paddedMonth = String(month).padStart(2, '0');
  const paddedDay = String(day).padStart(2, '0');

  return `${fullYear}-${paddedMonth}-${paddedDay}T00:00:00`;
};
