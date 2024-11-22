export const formatDateAndTime = (dateTime: string) => {
  const [date, time] = dateTime.split('T');

  const [yy, mm, dd] = date.split('-');
  const [h, m, s] = time.split(':');

  return { yy, mm, dd, h, m, s };
};

export const formatBookJenre = (jenre: string) => {
  const formattedJenre = jenre.split('>');

  return formattedJenre[2];
};

export const formatDate = (year: number, month: number, day: number) => {
  const fullYear = 2000 + year;
  const paddedMonth = String(month).padStart(2, '0');
  const paddedDay = String(day).padStart(2, '0');

  return `${fullYear}-${paddedMonth}-${paddedDay}T00:00:00`;
};
