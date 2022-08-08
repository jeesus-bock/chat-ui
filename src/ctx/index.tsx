import { createContext, useContext, createResource, Context, createEffect } from 'solid-js';
import { produce } from 'solid-js/store';
import { createStore } from 'solid-js/store';
import { getServer } from '~/service/get_server';
import { getUsers } from '~/service/get_users';
import { getRooms } from '~/service/get_rooms';
import type { Msg } from '~/service/ws';
import { ServerData, Room, User, SendWs } from '~/types';
import { v4 } from '@lukeed/uuid';
const RootContext = createContext();

export function CtxProvider(props) {
  const [serverData, { refetch: rfServer }] = createResource(getServer);
  const [users, { refetch: rfUsers }] = createResource(getUsers);
  const [rooms, { refetch: rfRooms }] = createResource(getRooms);
  const [msgs, setMsgs] = createStore([] as Array<Msg>);

  //const serverData = createServerData(getServer);

  const refetchAllData = () => {
    console.log('refetching all data');
    rfServer();
    rfUsers();
    rfRooms();
  };
  const [store, setStore] = createStore({
    nick: '',
    room: 'main',
    sendWs: (type: string, msg: string, to: string) => {
      console.log('no-op ws send: ', type, msg, to);
    },
    wsState: 0,
    id: v4(),
    historyLoading: new Map<string, boolean>(),
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
    get msgs() {
      return msgs || [];
    },
  });
  const setNick = (n: string) => {
    setStore(
      produce((s) => {
        s.nick = n;
      })
    );
  };
  const setRoom = (r: string) => {
    setStore(
      produce((s) => {
        s.room = r;
      })
    );
  };
  const setSendWs = (fn: SendWs) => {
    setStore(
      produce((s) => {
        s.sendWs = fn;
      })
    );
  };
  const setWsState = (state: number) => {
    setStore(
      produce((s) => {
        s.wsState = state;
      })
    );
  };
  const setHistoryLoading = (room: string, loading: boolean) => {
    setStore(
      produce((s) => {
        s.historyLoading.set(room, loading);
      })
    );
  };

  // Create the websocket sender function to share on context

  const state = [
    store,
    {
      refetchAllData,
      setStore,
      setNick,
      setRoom,
      setMsgs,
      setSendWs,
      setWsState,
      setHistoryLoading,
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
    room: string;
    id: string;
    historyLoading: Map<string, boolean>;
    sendWs: SendWs;
    wsState: number;
    readonly msgs: Msg[];
    readonly serverData: ServerData;
    readonly rooms: Room[];
    readonly users: User[];
    readonly loading: boolean;
  },
  {
    refetchAllData: () => void;
    setStore: any;
    setNick: (n: string) => void;
    setRoom: (r: string) => void;
    setMsgs: any;
    setSendWs: (fn: SendWs) => void;
    setWsState: (state: number) => void;
    setHistoryLoading: (room: string, loading: boolean) => void;
  }
];
