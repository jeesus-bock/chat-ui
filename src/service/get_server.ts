export const chatApiUrl = import.meta.env.VITE_CHAT_API_URL || 'http://127.0.0.1:9393';

// Fetches the server data object
export const getServer = async () => {
  const url = chatApiUrl + '/server';
  console.log('Fetching server data', url);
  const data = await fetch(url);
  let js;
  try {
    js = await data.json();
  } catch (_) {
    const msg = await data.text();
    console.log('Server text', msg);
    return msg;
  }
  console.log('Server data', js);
  return js;
};
