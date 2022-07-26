export const chatApiUrl = import.meta.env.VITE_CHAT_API_URL || 'ws://127.0.0.1:9393';

export const postImage = (id: string, room: string, body: FormData) => {
  return fetch(chatApiUrl + '/upload/' + id + '/' + room, { method: 'POST', body: body });
};
