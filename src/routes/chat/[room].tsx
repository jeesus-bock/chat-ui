import { createEffect, createMemo, createSignal, Show } from 'solid-js';
import { useParams } from 'solid-app-router';
import Chat from '~/components/Chat';

export default function Room() {
  const [show, setShow] = createSignal(false);
  const chatView = createMemo(() => {
    const pr = useParams();
    console.log('params', pr);
    return <Chat />;
  });

  return <>{chatView()}</>;
}
