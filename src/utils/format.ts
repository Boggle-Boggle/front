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
  const fullYear = year > 2000 ? year : 2000 + year;
  const paddedMonth = String(month).padStart(2, '0');
  const paddedDay = String(day).padStart(2, '0');

  return `${fullYear}-${paddedMonth}-${paddedDay}T00:00:00`;
};

export const generateDate = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return { year, month, day };
};

export const getHttpsLink = (link: string) => {
  const [http, domain] = link.split('://');

  return `${http}s://${domain}`;
};

export const isValidDate = (year: number, month: number, day: number) => {
  const newYear = year < 2000 ? 2000 + year : year;
  const date = new Date(newYear, month - 1, day);

  const result = date.getFullYear() === newYear && date.getMonth() === month - 1 && date.getDate() === day;

  return result;
};
