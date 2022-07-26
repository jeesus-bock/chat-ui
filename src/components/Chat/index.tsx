import { createStore } from 'solid-js/store';
import { useParams, useNavigate } from 'solid-app-router';
import { v4 } from 'uuid';
import { initWS, sendWSMsg } from '~/service/ws';
import type { Msg } from '~/service/ws';
import { InputBox } from '~/components/InputBox';
import { Lines } from '~/components/Lines';
import { Sidebar } from '~/components/Sidebar';
import { TopicBox } from '~/components/TopicBox';

import { createMemo, createSignal, onMount } from 'solid-js';
import { nick } from '~/store/store';
import { UserList } from '~/components/UserList';
export default function Chat() {
  const [msgs, setMsgs] = createStore([] as Array<Msg>);
  const [topic, setTopic] = createSignal('');
  const [users, setUsers] = createSignal([]);
  const id = v4();
  let sendWs = (type: string, msg: string) => {
    console.log('empty send', msg);
  };
  const room = createMemo(() => {
    const rp = useParams();
    console.log('tässä', rp.room);
    return rp.room;
  });

  const navigate = useNavigate();
  onMount(() => {
    if (!nick()) {
      navigate('/');
    }
  });

  sendWs = initWS(id, room(), nick(), (msg: Msg) => {
    console.log('Got ws msg', msg);
    if (msg.type === 'connected') {
      const data = JSON.parse(msg.msg);
      setTopic(data.topic);
      setUsers(data.users || []);
    }
    if (msg.type === 'topic') {
      setTopic(msg.msg);
      msg.msg = ' changed topic to: ' + msg.msg;
    }
    if (msg.type === 'leave') {
      setUsers(users().filter((u) => u != msg.msg));
      msg.msg = msg.msg + ' has left the room.';
    }
    if (msg.type === 'join') {
      setUsers([...users(), msg.msg]);
      msg.msg = msg.msg + ' has joined the room';
    }
    setMsgs([...msgs, msg]);
  });

  return (
    <main class='flex h-full w-full'>
      <Sidebar />
      <div class='flex flex-col flex-grow h-full'>
        <TopicBox room={room()} topic={topic()} />
        <Lines msgs={msgs} />
        <InputBox room={room()} id={id} send={sendWs} />
      </div>
      <UserList users={users()} />
    </main>
  );
}
