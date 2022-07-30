import { createResource } from 'solid-js';
import { createStore } from 'solid-js/store';
import { getServer } from '~/service/get_server';
import { getUsers } from '~/service/get_users';
import { getRooms } from '~/service/get_rooms';

const [serverData, { refetch: rfServer }] = createResource(getServer, { initialValue: { name: '', type: '', url: '', voiceUrl: '', users: [], rooms: [] } });
const [users, { refetch: rfUsers }] = createResource(getUsers);
const [rooms, { refetch: rfRooms }] = createResource(getRooms);

export const refetchAllData = () => {
  console.log('refetching all data');
  rfServer();
  rfUsers();
  rfRooms();
};
export const [store, setStore] = createStore({
  nick: '',
  get serverData() {
    return serverData();
  },
  get rooms() {
    return rooms() || [];
  },
  get users() {
    return users() || [];
  },
  get loading() {
    return serverData.loading || rooms.loading || users.loading;
  },
});
