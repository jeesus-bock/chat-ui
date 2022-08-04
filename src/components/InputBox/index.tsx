import { Component, createSignal } from 'solid-js';
import { useCtx } from '~/ctx';
import { SendWs } from '~/types';
import { AudioRec } from '../AudioRec';
export const InputBox: Component<{ room: string }> = (p) => {
  const [text, setText] = createSignal('');
  const [store] = useCtx() || [{ sendWs: () => {}, id: '0-0-0-0' }];
  console.log('InputBox store:', store);
  return (
    <div class='w-full flex flex-wrap bg-stone-200 gap-x-4 p-4 border-t border-gray-500'>
      <input
        autofocus
        data-testid='input'
        class='flex-grow border-stone-600'
        placeholder='type a message...'
        onInput={(e) => {
          setText(e.currentTarget.value);
        }}
        onkeydown={(e) => {
          if (e.key == 'Enter') {
            store.sendWs('msg', text(), p.room);
            setText('');
          }
        }}
        value={text()}
      />
      <button
        class='mr-4'
        onClick={() => {
          console.log('Sending WS', text());
          store.sendWs('msg', text(), p.room);
          setText('');
        }}>
        Send
      </button>
      <AudioRec room={p.room} id={store.id} />
    </div>
  );
};
