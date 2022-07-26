import { Component, Show } from 'solid-js';
import { ServerData } from '~/types/dto';

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
          <span>{JSON.stringify(p.data.rooms)}</span>
        </div>
        <div class='flex justify-between'>
          <label>Users</label>
          <span>{JSON.stringify(p.data.users)}</span>
        </div>
      </div>
    </Show>
  );
};
