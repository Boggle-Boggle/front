import api from '.';

export const isDuplicateNickname = async (nickname: string) => {
  const response = await api.get(`/user/nickname?nickname=${nickname}`);

  return response.data.data as boolean;
};
