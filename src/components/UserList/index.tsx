import { Component, For } from 'solid-js';
import { useCtx } from '~/ctx';
export const UserList: Component = () => {
  const [store] = useCtx();
  return (
    <div class='hidden p-4 border-l border-slate-500 bg-slate-100 items-center sm:flex flex-col'>
      <For each={store.users}>{(user) => <div class='p-4'>{user.nick}</div>}</For>
    </div>
  );
};
