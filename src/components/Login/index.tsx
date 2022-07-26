import { useNavigate } from 'solid-app-router';
import { createEffect, createResource, createSignal, ErrorBoundary } from 'solid-js';
import { getServer } from '~/service/get_server';
import { setNick } from '~/store/store';
import { ServerBox } from '../ServerBox';
export const Login = () => {
  console.log('login here');
  const [text, setText] = createSignal('');
  const navigate = useNavigate();
  const [serverData] = createResource(true, getServer, { deferStream: true });
  createEffect(
    () => serverData(),
    () => {
      console.log(serverData.loading);
      console.log(serverData());
    }
  );
  return (
    <div class='w-full h-full flex flex-col items-center justify-center bg-stone-100'>
      <ErrorBoundary fallback={(err) => <div class='bg-green-100'>{err}</div>}>
        <div class='flex flex-col bg-white shadow-md rounded-lg p-8'>
          <ServerBox data={serverData()} />
          <input
            placeholder='Nickname...'
            class='w-48'
            onInput={(e) => {
              setText(e.currentTarget.value);
            }}
            onkeydown={(e) => {
              console.log(e.key);
              if (e.key == 'Enter') {
                setNick(text());
                navigate('/chat/huone');
              }
            }}
          />
          <button
            onClick={() => {
              setNick(text());
              navigate('/chat/huone');
            }}
            class='button'>
            Chat
          </button>
        </div>
      </ErrorBoundary>
    </div>
  );
};
