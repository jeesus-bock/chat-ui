import Chat from '~/components/Chat';
import { useNavigate, useParams } from 'solid-app-router';
import { useCtx } from '~/ctx';
import { initWS } from '~/service/ws';
import { Msg } from '~/service/ws';
import { isServer } from 'solid-js/web';
import { createEffect } from 'solid-js';
// Very basic view, maybe add conditional page about room info or something here later.
export default function Room() {
  const [store, { setMsgs, setSendWs, setWsState, refetchAllData, setHistoryLoading, setRoom }] = useCtx();
  console.log('Room begin', store);
  const rp = useParams();

  // Navigate back to root if nick is not set before we mount the Chat
  if (!store.nick) {
    const navigate = useNavigate();
    console.log('no nick in store', store);
    navigate('/');
    return;
  }
  console.log('Room() setting sendWS', store.nick);
  if (!isServer) {
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
    createEffect(() => {
      console.log('changed to', rp.room);
      if (rp.room) {
        setRoom(rp.room);
        if (Array.isArray(store.users) && !store.users.find((u) => u.nick == store.nick)?.rooms.includes(rp.room)) {
          if (store.wsState) {
            store.sendWs('join', '', rp.room);
          }
        }
      }
    });
  }
  return (
    <>
      <Chat />
    </>
  );
}
