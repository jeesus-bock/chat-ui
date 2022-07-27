import { Component, For } from 'solid-js';
export const UserList: Component<{ users: Array<string> }> = (props) => {
  return (
    <div class='hidden p-4 border-l border-slate-500 bg-slate-100 items-center sm:flex flex-col'>
      <For each={props.users}>{(user) => <div class='p-4'>{user}</div>}</For>
    </div>
  );
};
