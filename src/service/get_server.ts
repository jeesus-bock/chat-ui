export const chatApiUrl = import.meta.env.VITE_CHAT_API_URL || 'http://127.0.0.1:9393';

// Fetches the server data object
export const getServer = async () => {
  console.log('Fetching server data');
  const data = await (await fetch(chatApiUrl + '/server/')).json();
  console.log('Server data', data);
  return data;
};
