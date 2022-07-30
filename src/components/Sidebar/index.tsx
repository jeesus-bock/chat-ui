import { Link, useNavigate } from 'solid-app-router';
import { Component, createSignal, For, Show } from 'solid-js';
import { store } from '~/store/store';
import { trimName } from '~/utils/names';

import { Room } from '~/types/';
export const Sidebar: Component = () => {
  const [newRoom, setNewRoom] = createSignal('');
  const navigate = useNavigate();
  const trimSetNewRoom = (room: string) => {
    setNewRoom(trimName(room));
  };
  return (
    <nav class='hidden sm:flex flex-col h-full bg-zinc-100 border-r border-zinc-500 min-h-screen'>
      <Show when={!store.loading} fallback={<div>Loadind!</div>}>
        <For each={(store.rooms as Array<Room>).sort((a, b) => a.name.localeCompare(b.name))}>
          {(r) => {
            return (
              <Link href={'/chat/' + r.name} class='pt-2 pb-1 px-4'>
                {r.name} ({r.users.length})
              </Link>
            );
          }}
        </For>
      </Show>
      <div class='flex flex-col gap-y-4 justify-self-end'>
        <input onInput={(e) => trimSetNewRoom(e.currentTarget.value)} value={newRoom()} placeholder='Channel name' class='mx-4 mt-auto' />
        <button onClick={() => navigate('/chat/' + newRoom())} class='mx-4'>
          Add channel
        </button>
      </div>
    </nav>
  );
};
