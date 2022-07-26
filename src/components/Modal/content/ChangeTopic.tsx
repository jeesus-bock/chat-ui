import { Component, createSignal } from 'solid-js';
import { sendWSMsg } from '~/service/ws';
export const ChangeTopic: Component<{ close: () => void }> = (p) => {
  const [topic, setTopic] = createSignal('');
  return (
    <div class='flex flex-col w-96'>
      <label class='mb-4'>Change topic</label>
      <input class='w-full mb-4' onInput={(e) => setTopic(e.currentTarget.value)} />
      <div class='flex justify-end w-full gap-x-4'>
        <button onClick={() => p.close()}>Cancel</button>
        <button
          onClick={() => {
            sendWSMsg('topic', topic());
            p.close();
          }}>
          OK
        </button>
      </div>
    </div>
  );
};
