import { useNavigate } from 'solid-app-router';
import { createSignal } from 'solid-js';
import { setNick } from '~/store/store';
export const Login = () => {
  const [text, setText] = createSignal('');
  const navigate = useNavigate();
  return (
    <div class='p-8'>
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
  );
};
