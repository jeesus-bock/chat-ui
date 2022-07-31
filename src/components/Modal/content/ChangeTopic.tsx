import { Component, createSignal } from 'solid-js';
import { useCtx } from '~/ctx';
export const ChangeTopic: Component<{ close: () => void }> = (p) => {
  const [topic, setTopic] = createSignal('');
  const [store] = useCtx();
  const changeTopic = () => {
    store.sendWs('topic', topic(), store.room);
    p.close();
  };
  return (
    <div class='flex flex-col w-96'>
      <label class='mb-4'>Change topic</label>
      <input
        class='w-full mb-4'
        onInput={(e) => setTopic(e.currentTarget.value)}
        onkeydown={(e) => {
          if (e.key == 'Enter') {
            changeTopic();
          }
        }}
      />
      <div class='flex justify-end w-full gap-x-4'>
        <button onClick={() => p.close()}>Cancel</button>
        <button
          onClick={() => {
            changeTopic();
          }}>
          OK
        </button>
      </div>
    </div>
  );
};
