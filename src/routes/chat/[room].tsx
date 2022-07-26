import { createEffect, createMemo, createSignal, Show } from 'solid-js';
import { useParams } from 'solid-app-router';
import Chat from '~/components/Chat';

export default function Room() {
  const [show, setShow] = createSignal(false);
  const room = createMemo(() => {
    const pr = useParams();
    return pr.room;
  });
  /*createEffect(() => {
    console.log(room());
    setShow(false);
    setTimeout(() => {
      setShow(true);
    }, 5000);
  });*/

  return (
    <>
      <Chat />
    </>
  );
}
