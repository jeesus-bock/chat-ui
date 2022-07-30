import { useNavigate } from 'solid-app-router';
import { createSignal, ErrorBoundary } from 'solid-js';
import { store, setStore } from '~/store/store';
import { ServerBox } from '~/components/ServerBox/';
import { trimName } from '~/utils/names';
import { produce } from 'solid-js/store';
export const Login = () => {
  console.log('Login here');
  const [nick, setNick] = createSignal('');
  const navigate = useNavigate();
  const trimAndSetNick = (n: string) => {
    console.log('trimmed', trimName(n));
    setNick(trimName(n));
  };
  const login = () => {
    setStore(
      produce((s) => {
        s.nick = nick();
      })
    );
    navigate('/chat/main');
  };
  return (
    <div class='w-full h-full flex flex-col items-center justify-center bg-stone-100'>
      <ErrorBoundary fallback={(err) => <div class='bg-green-100'>{err}</div>}>
        <div class='flex flex-col bg-white shadow-md rounded-lg p-8'>
          <ServerBox data={store.serverData} />
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
      </ErrorBoundary>
    </div>
  );
};
