import { useNavigate } from 'solid-app-router';
import { createResource, createSignal, ErrorBoundary } from 'solid-js';
import { getServer } from '~/service/get_server';
import { setNick } from '~/store/store';
import { ServerBox } from '../ServerBox';
export const Login = () => {
  console.log('login here');
  const [text, setText] = createSignal('');
  const navigate = useNavigate();
  const [serverData] = createResource(true, getServer);
  return (
    <div class='p-8 w-full h-full flex flex-col items-center justify-center'>
      <ErrorBoundary fallback={(err) => <div class='bg-green-100'>{err}</div>}>
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
      </ErrorBoundary>
    </div>
  );
};
