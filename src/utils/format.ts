export const formatBookGenre = (Genre: string) => {
  const formattedGenre = Genre.split('>');

  return formattedGenre[2];
};

export const getHttpsLink = (link: string) => {
  const [http, domain] = link.split('://');

  return `${http}s://${domain}`;
};
