import { Link, useNavigate } from 'solid-app-router';
import { Component, createSignal, For, Show } from 'solid-js';
import { store } from '~/store/store';
import { trimName } from '~/utils/names';

import { Room, ServerData } from '~/types/';
export const Sidebar: Component = () => {
  const [newRoom, setNewRoom] = createSignal('');
  const navigate = useNavigate();
  const trimSetNewRoom = (room: string) => {
    setNewRoom(trimName(room));
  };
  return (
    <nav class='hidden sm:flex flex-col bg-zinc-100 border-r border-zinc-500 min-h-screen'>
      <Show when={!!store.serverData}>
        <For each={store.serverData.rooms as Array<Room>}>
          {(r) => {
            return (
              <Link href={'/chat/' + decodeURI(r.name)} class='pt-2 pb-1 px-4'>
                {decodeURI(r.name)}
              </Link>
            );
          }}
        </For>
      </Show>
      <input onInput={(e) => trimSetNewRoom(e.currentTarget.value)} value={newRoom()} placeholder='Channel name' class='mx-4 my-4' />
      <button onClick={() => navigate('/chat/' + newRoom())} class='mx-4'>
        Add channel
      </button>
    </nav>
  );
};
