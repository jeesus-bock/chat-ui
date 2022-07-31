import { Component, createSignal } from 'solid-js';
import { trimName } from '~/utils/names';
import { useCtx } from '~/ctx';
export const ChangeNick: Component<{ close: () => void }> = (p) => {
  const [nick, setNick] = createSignal('');
  const [store] = useCtx();

  const trimAndSetNick = (n: string) => {
    setNick(trimName(n));
  };
  const changeNick = () => {
    store.sendWs('nick', nick(), '*');
    p.close();
  };
  return (
    <div class='flex flex-col'>
      <label class='mb-4'>Change nick</label>
      <input
        class='w-full mb-4'
        onInput={(e) => trimAndSetNick(e.currentTarget.value)}
        value={nick()}
        onkeydown={(e) => {
          if (e.key == 'Enter') {
            changeNick();
          }
        }}
      />
      <div class='flex justify-end w-full gap-x-4'>
        <button onClick={() => p.close()}>Cancel</button>
        <button
          onClick={() => {
            changeNick();
          }}>
          OK
        </button>
      </div>
    </div>
  );
};
