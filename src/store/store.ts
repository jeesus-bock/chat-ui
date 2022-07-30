import { createStore } from 'solid-js/store';
import { Room, ServerData, User } from '~/types';

export const [store, setStore] = createStore({ nick: '', serverData: { name: '', type: '', url: '', voiceUrl: '', users: [] as Array<User>, rooms: [] as Array<Room> } });
