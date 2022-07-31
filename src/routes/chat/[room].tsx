import Chat from '~/components/Chat';
import { useNavigate } from 'solid-app-router';
import { useCtx } from '~/ctx';
// Very basic view, maybe add conditional page about room info or something here later.
export default function Room() {
  const [store] = useCtx();
  console.log('Room begin', store);
  // Navigate back to root if nick is not set before we mount the Chat
  if (!store.nick) {
    const navigate = useNavigate();
    console.log('no nick in store', store);
    navigate('/');
  }

  return <Chat />;
}
