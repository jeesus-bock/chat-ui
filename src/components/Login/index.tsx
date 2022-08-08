import { useNavigate } from 'solid-app-router';
import { createMemo, createResource, createSignal, ErrorBoundary, Show } from 'solid-js';
import { ServerBox } from '~/components/ServerBox/';
import { trimName } from '~/utils/names';
import { useCtx } from '~/ctx';
import { refetchRouteData } from 'solid-start/data/createRouteData';
import { mdiRefresh } from '@mdi/js';

export const Login = () => {
  const [store, { setNick: setStoreNick, refetchAllData }] = useCtx();
  const [nick, setNick] = createSignal('');

  const navigate = useNavigate();
  const trimAndSetNick = (n: string) => {
    setNick(trimName(n));
  };

  const login = () => {
    console.log('Login/login()');
    setStoreNick(nick());
    console.log('Navigating to chat, nick: ', nick());
    navigate('/chat/main');
  };
  const serverBox = createMemo(() => {
    console.log('returning serverbox');
    if (store && store.serverData) {
      return <ServerBox />;
    } else {
      return <div>else</div>;
    }
  });
  return (
    <div class='w-full h-full flex flex-col items-center justify-center bg-stone-100'>
      <div class='flex flex-col bg-white shadow-md rounded-lg p-8 relative'>
        <div class='absolute right-0 top-2'>
          <svg
            class='w-8 h-8 fill-gray-300 cursor-pointer'
            onClick={() => {
              console.log('got click', store);
              refetchAllData();
              refetchRouteData();
            }}>
            <path d={mdiRefresh} />
          </svg>
        </div>
        {serverBox()}
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
