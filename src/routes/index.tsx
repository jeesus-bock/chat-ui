import { Suspense, onMount } from 'solid-js';
import { Login } from '~/components/Login';
import { initWS } from '~/service/ws';
import { isServer } from 'solid-js/web';
import { Msg } from '~/service/ws';

import { useCtx } from '~/ctx';

export default () => {
  const [store, { setMsgs, setSendWs, setWsState, refetchAllData, setHistoryLoading, setRoom }] = useCtx();

  onMount(() => {
    console.log('[room].tsx onMount');
    refetchAllData();
  });
  if (!isServer) {
    console.log('index.tsx creating ws');
    setSendWs(
      initWS(
        store.id,
        store.nick,
        (msg: Msg) => {
          console.log('Got ws msg', msg);
          if (msg.type === 'leave') {
            // Remove the nick from users()
            msg.msg = msg.msg + ' has left the room.';
          }
          if (msg.type === 'join') {
            // Add the nick to users() unless it's already there
            msg.msg = msg.msg + ' has joined the room';
          }
          if (msg.type === 'nick') {
            msg.msg = ' is now known as ' + msg.msg;
          }
          if (msg.type === 'start_history') setHistoryLoading(msg.to, true);
          if (msg.type === 'end_history') setHistoryLoading(msg.to, false);
          if (msg.type != 'msg' && msg.type != 'start_history') {
            if (!store.historyLoading.get(msg.to)) {
              refetchAllData();
            }
          }
          setMsgs([...store.msgs, msg]);
        },
        () => {
          setWsState(1);
        }
      )
    );
  }
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Login />
    </Suspense>
  );
};
