import { Component, For, Show, Signal } from 'solid-js';
import { useCtx } from '~/ctx';

export const ServerBox: Component = (p) => {
  const [store] = useCtx();
  console.log('ServerBox', store);
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
                  {r.name}{' '}
                  <span class='inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full'>{r.users.length}</span>
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
