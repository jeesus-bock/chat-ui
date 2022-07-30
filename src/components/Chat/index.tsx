import { createStore } from 'solid-js/store';
import { useParams, useNavigate } from 'solid-app-router';
import { v4 } from 'uuid';
import { initWS } from '~/service/ws';
import type { Msg } from '~/service/ws';
import { getServer } from '~/service/get_server';
import { InputBox } from '~/components/InputBox';
import { Lines } from '~/components/Lines';
import { Sidebar } from '~/components/Sidebar';
import { TopicBox } from '~/components/TopicBox';

import { createMemo, createSignal, createResource, createEffect, onMount } from 'solid-js';
import { store, setStore } from '~/store/store';
import { UserList } from '~/components/UserList';

export default function Chat() {
  const [msgs, setMsgs] = createStore([] as Array<Msg>);
  const [topic, setTopic] = createSignal('');
  const [users, setUsers] = createSignal([]);
  const [serverData] = createResource(getServer);
  createEffect(
    () => serverData(),
    () => {
      console.log('serverData.loading', serverData.loading);
      console.log('serverData()', serverData());
      setStore({ ...store, serverData: serverData() });
    }
  );
  const id = v4();
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
    const rp = useParams();
    sendWs = initWS(id, rp.room, store.nick, (msg: Msg) => {
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
        // Remove the nick from users()
        setUsers(users().filter((u) => u != msg.msg));
        msg.msg = msg.msg + ' has left the room.';
      }
      if (msg.type === 'join') {
        // Add the nick to users() unless it's already there
        if (!users().includes(msg.msg)) {
          console.log('adding user', users, msg);
          setUsers([...users(), msg.msg]);
        }
        msg.msg = msg.msg + ' has joined the room';
      }
      setMsgs([...msgs, msg]);
    });
    return rp.room;
  });

  // initialize the navigator to jump back to / if the nick isn't set
  // TODO make it less harsh, maybe remember the nick?
  // maybe cookies here.
  const navigate = useNavigate();
  onMount(() => {
    if (!store.nick) {
      console.log('no nick in store', store);
      navigate('/');
    }
  });

  return (
    <main class='flex h-full w-full'>
      <Sidebar data={store.serverData} />
      <div class='flex flex-col flex-grow h-full w-full overflow-hidden'>
        <TopicBox room={room()} topic={topic()} data={store.serverData} send={getSendWs()} />
        <Lines msgs={filteredMsgs()} />
        <InputBox room={room()} id={id} send={getSendWs()} />
      </div>
      <UserList users={users()} />
    </main>
  );
}
