type SessionItems = 'accessToken';

export const setSessionItem = (key: SessionItems, value: string) => {
  sessionStorage.setItem(key, JSON.stringify(value));
};

// TODO : 에러핸들링
export const getSessionItem = (key: SessionItems) => {
  const item = sessionStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

export const removeSessionItem = (key: SessionItems) => {
  sessionStorage.removeItem(key);
};
