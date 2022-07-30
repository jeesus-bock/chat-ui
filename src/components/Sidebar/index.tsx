import { Link, useNavigate } from 'solid-app-router';
import { Component, createSignal, For, Show } from 'solid-js';

import { ServerData } from '~/types/';
export const Sidebar: Component<{ data: ServerData }> = (props) => {
  const [newChan, setNewChan] = createSignal('');
  const navigate = useNavigate();
  return (
    <nav class='hidden sm:flex flex-col bg-zinc-100 border-r border-zinc-500 min-h-screen'>
      <Show when={!!props.data}>
        <For each={props.data.rooms}>
          {(r) => {
            return (
              <Link href={'/chat/' + decodeURI(r.name)} class='pt-2 pb-1 px-4'>
                {decodeURI(r.name)}
              </Link>
            );
          }}
        </For>
      </Show>
      <input onInput={(e) => setNewChan(e.currentTarget.value)} placeholder='Channel name' class='mx-4 my-4' />
      <button onClick={() => navigate('/chat/' + newChan())} class='mx-4'>
        Add channel
      </button>
    </nav>
  );
};
