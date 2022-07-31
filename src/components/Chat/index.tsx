import { createStore } from 'solid-js/store';
import { useParams, useNavigate } from 'solid-app-router';
import { useCtx } from '~/ctx';
import { v4 } from 'uuid';
import { initWS } from '~/service/ws';
import type { Msg } from '~/service/ws';
import { InputBox } from '~/components/InputBox';
import { Lines } from '~/components/Lines';
import { Sidebar } from '~/components/Sidebar';
import { TopicBox } from '~/components/TopicBox';

import { createMemo, createSignal, createEffect, onMount } from 'solid-js';
import { UserList } from '~/components/UserList';

export default function Chat() {
  const [store, { refetchAllData }] = useCtx();
  const [msgs, setMsgs] = createStore([] as Array<Msg>);
  const [topic, setTopic] = createSignal('');
  const [users, setUsers] = createSignal([]);
  const id = v4();
  const rp = useParams();
  let sendWs = (type: string, msg: string) => {
    // Debug code to understand the reactivity.
    console.log('empty send', type, msg);
  };

  const getSendWs = () => {
    return sendWs;
  };
  const filteredMsgs = createMemo(() => {
    // only show messages to given room, this could be prettier.
    return msgs.filter((msg) => msg.to === room());
  });
  // room memo also gives sendWs a new value, ie the sending function
  // for the room that was just joined (the memo triggers on path param change)
  // Maybe use an effect for this...
  const room = createMemo(() => {
    console.log('Memo returning room', rp.room);
    return rp.room;
  });
  createEffect(() => {
    sendWs = initWS(id, rp.room, store.nick, (msg: Msg) => {
      console.log('Got ws msg', msg);
      if (msg.type === 'connected') {
        const data = JSON.parse(msg.msg);
        setTopic(data.topic);
        setUsers(data.users || []);
        refetchAllData();
      }
      if (msg.type === 'topic') {
        setTopic(msg.msg);
        msg.msg = ' changed topic to: ' + msg.msg;
        refetchAllData();
      }
      if (msg.type === 'leave') {
        // Remove the nick from users()
        setUsers(users().filter((u) => u != msg.msg));
        msg.msg = msg.msg + ' has left the room.';
        refetchAllData();
      }
      if (msg.type === 'join') {
        // Add the nick to users() unless it's already there
        if (!users().includes(msg.msg)) {
          console.log('adding user', users, msg);
          setUsers([...users(), msg.msg]);
          refetchAllData();
        }
        msg.msg = msg.msg + ' has joined the room';
      }
      setMsgs([...msgs, msg]);
    });
  });

  return (
    <main class='flex h-full w-full'>
      <Sidebar />
      <div class='flex flex-col flex-grow h-full w-full overflow-hidden'>
        <TopicBox room={room()} topic={topic()} send={getSendWs()} />
        <Lines msgs={filteredMsgs()} />
        <InputBox room={room()} id={id} send={getSendWs()} />
      </div>
      <UserList users={users()} />
    </main>
  );
}
