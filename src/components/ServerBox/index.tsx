import { Component, For, Show } from 'solid-js';
import { ServerData } from '~/types';

export const ServerBox: Component<{ data: ServerData }> = (p) => {
  console.log('ServerBox', p ? p.data : 'none');
  return (
    <Show when={p && p.data}>
      <div class='flex flex-col'>
        <div class='flex justify-between'>
          <label>Name</label>
          <span>{p.data.name}</span>
        </div>
        <div class='flex justify-between'>
          <label>Rooms</label>
          <div class='flex flex-col items-end'>
            <For each={p.data.rooms.map((u) => u.name)}>
              {(r) => {
                return <span>{r}</span>;
              }}
            </For>
          </div>
        </div>
        <div class='flex justify-between'>
          <label>Users</label>
          <div class='flex flex-col items-end'>
            <For each={p.data.users.map((u) => u.nick)}>
              {(u) => {
                return <span>{u}</span>;
              }}
            </For>
          </div>
        </div>
      </div>
    </Show>
  );
};
