import { Component, createSignal } from 'solid-js';
import { SendWs } from '~/types';
export const ChangeNick: Component<{ close: () => void; send: SendWs }> = (p) => {
  const [nick, setNick] = createSignal('');
  return (
    <div class='flex flex-col'>
      <label class='mb-4'>Change nick</label>
      <input class='w-full mb-4' onInput={(e) => setNick(e.currentTarget.value)} />
      <div class='flex justify-end w-full gap-x-4'>
        <button onClick={() => p.close()}>Cancel</button>
        <button
          onClick={() => {
            p.send('nick', nick());
            p.close();
          }}>
          OK
        </button>
      </div>
    </div>
  );
};
