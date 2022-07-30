import { User } from '~/types';

export const chatApiUrl = import.meta.env.VITE_CHAT_API_URL || 'http://127.0.0.1:9393';

// Fetches the users array
export const getUsers = async (): Promise<Array<User>> => {
  const url = chatApiUrl + '/users';
  console.log('Fetching users', url);
  const data = await fetch(url);
  let js;
  try {
    js = await data.json();
  } catch (_) {
    const msg = await data.text();
    throw new Error(msg);
  }
  console.log('Users data', js);
  return js;
};
