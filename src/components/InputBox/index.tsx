import { Component, createSignal } from 'solid-js';
import { AudioRec } from '../AudioRec';
export const InputBox: Component<{ room: string; id: string; send: (type: string, msg: string) => void }> = (p) => {
  const [text, setText] = createSignal('');
  return (
    <div class='w-full flex bg-stone-200 gap-x-4 p-4 border-t border-gray-500'>
      <input
        data-testid='input'
        class='flex-grow border-stone-600'
        placeholder='type a message...'
        onInput={(e) => {
          setText(e.currentTarget.value);
        }}
      />
      <button
        class='mr-4'
        onClick={() => {
          console.log('Sending WS', text());
          p.send('msg', text());
        }}>
        Send
      </button>
      <AudioRec room={p.room} id={p.id} />
    </div>
  );
};
