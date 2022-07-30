import { useNavigate } from 'solid-app-router';
import { createEffect, createResource, createSignal, ErrorBoundary } from 'solid-js';
import { getServer } from '~/service/get_server';
import { store, setStore } from '~/store/store';
import { ServerBox } from '~/components/ServerBox/';
export const Login = () => {
  console.log('login here');
  const [text, setText] = createSignal('');
  const navigate = useNavigate();
  const [serverData] = createResource(true, getServer, { deferStream: true });
  createEffect(
    () => serverData,
    () => {
      console.log(serverData.loading);
      setStore({ ...store, serverData: serverData() });
      console.log('store', store);
    }
  );
  return (
    <div class='w-full h-full flex flex-col items-center justify-center bg-stone-100'>
      <ErrorBoundary fallback={(err) => <div class='bg-green-100'>{err}</div>}>
        <div class='flex flex-col bg-white shadow-md rounded-lg p-8'>
          <ServerBox data={store.serverData} />
          <input
            autofocus
            placeholder='Nickname...'
            class='w-48 max-w-full my-4'
            onInput={(e) => {
              setText(e.currentTarget.value);
            }}
            onkeydown={(e) => {
              console.log(e.key);
              if (e.key == 'Enter') {
                setStore({ ...store, nick: text() });
                navigate('/chat/main');
              }
            }}
          />
          <button
            onClick={() => {
              setStore({ ...store, nick: text() });
              navigate('/chat/main');
            }}
            class='button justify-self-end self-end'>
            Chat
          </button>
        </div>
      </ErrorBoundary>
    </div>
  );
};
