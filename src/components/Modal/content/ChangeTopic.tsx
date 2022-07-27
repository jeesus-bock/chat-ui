import { Component, createSignal } from 'solid-js';
import { SendWs } from '~/types';
export const ChangeTopic: Component<{ close: () => void; send: SendWs }> = (p) => {
  const [topic, setTopic] = createSignal('');
  return (
    <div class='flex flex-col w-96'>
      <label class='mb-4'>Change topic</label>
      <input class='w-full mb-4' onInput={(e) => setTopic(e.currentTarget.value)} />
      <div class='flex justify-end w-full gap-x-4'>
        <button onClick={() => p.close()}>Cancel</button>
        <button
          onClick={() => {
            p.send('topic', topic());
            p.close();
          }}>
          OK
        </button>
      </div>
    </div>
  );
};
