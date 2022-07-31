import { createSignal, createContext, useContext, createResource, Context } from 'solid-js';
import { produce } from 'solid-js/store';
import { createStore } from 'solid-js/store';
import { getServer } from '~/service/get_server';
import { getUsers } from '~/service/get_users';
import { getRooms } from '~/service/get_rooms';

import { ServerData, Room, User } from '~/types';
const RootContext = createContext();

export function CtxProvider(props) {
  const [serverData, { refetch: rfServer }] = createResource(getServer);
  const [users, { refetch: rfUsers }] = createResource(getUsers);
  const [rooms, { refetch: rfRooms }] = createResource(getRooms);

  const refetchAllData = () => {
    console.log('refetching all data');
    rfServer();
    rfUsers();
    rfRooms();
  };
  const [store, setStore] = createStore({
    nick: '',
    get serverData() {
      return serverData();
    },
    get rooms() {
      return [...(rooms() || [])].sort((a, b) => a.name.localeCompare(b.name));
    },
    get users() {
      return users() || [];
    },
    get loading() {
      return serverData.loading || rooms.loading || users.loading;
    },
  });
  const setNick = (n: string) => {
    setStore(
      produce((s) => {
        s.nick = n;
      })
    );
  };
  const state = [
    store,
    {
      refetchAllData,
      setStore,
      setNick,
    },
  ];

  return <RootContext.Provider value={state}>{props.children}</RootContext.Provider>;
}

export function useCtx(): State {
  return useContext<State>(RootContext as Context<State>);
}

type State = [
  {
    nick: string;
    readonly serverData: ServerData;
    readonly rooms: Room[];
    readonly users: User[];
    readonly loading: boolean;
  },
  {
    refetchAllData: () => void;
    setStore: any;
    setNick: (n: string) => void;
  }
];
