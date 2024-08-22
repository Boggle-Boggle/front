export const formatDateAndTime = (dateTime: string) => {
  const [date, time] = dateTime.split('T');

  const [yy, mm, dd] = date.split('-');
  const [h, m, s] = time.split(':');

  return { yy, mm, dd, h, m, s };
};

export default formatDateAndTime;
