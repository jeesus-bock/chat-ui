import { Room } from '~/types';

export const chatApiUrl = import.meta.env.VITE_CHAT_API_URL || 'http://127.0.0.1:9393';

// Fetches the users array
export const getRooms = async (): Promise<Array<Room>> => {
  const url = chatApiUrl + '/rooms';
  console.log('Fetching rooms', url);
  const data = await fetch(url);
  let js;
  try {
    js = await data.json();
  } catch (_) {
    const msg = await data.text();
    throw new Error(msg);
  }
  console.log('Rooms data', js);
  return js;
};
