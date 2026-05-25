const ALADIN_SEARCH_URL = 'https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=All&SearchWord=';

export const getAladinSearchUrl = (title: string) => `${ALADIN_SEARCH_URL}${encodeURIComponent(title)}`;
