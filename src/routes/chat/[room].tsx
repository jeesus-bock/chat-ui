import { onMount } from 'solid-js';
import { store } from '~/store/store';
import Chat from '~/components/Chat';
import { useNavigate } from 'solid-app-router';

// Very basic view, maybe add conditional page about room info or something here later.
export default function Room() {
  // Navigate back to root if nick is not set before we mount the Chat
  if (!store.nick) {
    const navigate = useNavigate();
    console.log('no nick in store', store);
    navigate('/');
  }

  return <Chat />;
}
