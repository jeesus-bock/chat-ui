import { Component, For, Show, Signal } from 'solid-js';
import { store } from '~/store/store';

export const ServerBox: Component = (p) => {
  console.log('ServerBox');
  return (
    <div class='flex flex-col'>
      <div class='flex justify-between'>
        <label>Name</label>
        <span>{store.serverData.name}</span>
      </div>
      <div class='flex justify-between'>
        <label>Rooms</label>
        <div class='flex flex-col items-end'>
          <For each={store.rooms}>
            {(r) => {
              return (
                <span>
                  {r.name} ({r.users.length})
                </span>
              );
            }}
          </For>
        </div>
      </div>
      <div class='flex justify-between'>
        <label>Users</label>
        <div class='flex flex-col items-end'>
          <For each={store.users}>
            {(u) => {
              return <span>{u.nick}</span>;
            }}
          </For>
        </div>
      </div>
    </div>
  );
};
