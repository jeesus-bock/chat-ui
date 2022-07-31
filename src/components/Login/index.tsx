import { useNavigate } from 'solid-app-router';
import { createSignal, ErrorBoundary, Show } from 'solid-js';
import { ServerBox } from '~/components/ServerBox/';
import { trimName } from '~/utils/names';
import { produce } from 'solid-js/store';
import { isServer } from 'solid-js/web';
import { useCtx } from '~/ctx';
import { ServerData, User, Room } from '~/types';
export const Login = () => {
  const [store, { setNick: setStoreNick }] = useCtx();
  console.log('Login here', store);
  const [nick, setNick] = createSignal('');
  const navigate = useNavigate();
  const trimAndSetNick = (n: string) => {
    console.log('trimmed', trimName(n));
    setNick(trimName(n));
  };
  const login = () => {
    setStoreNick(nick());
    navigate('/chat/main');
  };
  return (
    <div class='w-full h-full flex flex-col items-center justify-center bg-stone-100'>
      <div class='flex flex-col bg-white shadow-md rounded-lg p-8'>
        <Show when={store.serverData}>
          <ServerBox />
        </Show>
        <input
          autofocus
          placeholder='Nickname...'
          class='w-48 max-w-full my-4'
          value={nick()}
          onInput={(e) => {
            trimAndSetNick(e.currentTarget.value);
          }}
          onkeydown={(e) => {
            console.log(e.key);
            if (e.key == 'Enter') {
              login();
            }
          }}
        />
        <button
          onClick={() => {
            login();
          }}
          class='button justify-self-end self-end'>
          Chat
        </button>
      </div>
    </div>
  );
};
