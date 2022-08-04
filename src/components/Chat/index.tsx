import { useParams, useNavigate } from 'solid-app-router';
import { useCtx } from '~/ctx';

import { InputBox } from '~/components/InputBox';
import { Lines } from '~/components/Lines';
import { Sidebar } from '~/components/Sidebar';
import { TopicBox } from '~/components/TopicBox';

import { createMemo } from 'solid-js';
import { UserList } from '~/components/UserList';

export default function Chat() {
  const [store] = useCtx();

  const rp = useParams();
  const topic = createMemo(() => {
    for (const r of store.rooms) {
      if (r.name == rp.room) {
        return r.topic;
      }
      return 'No topic set';
    }
  });
  const users = createMemo(() => {
    for (const r of store.rooms) {
      if (r.name == rp.room) {
        return r.users;
      }
      return [];
    }
  });
  const filteredMsgs = createMemo(() => {
    // only show messages to room on view.
    return store.msgs.filter((msg) => msg.to === rp.room);
  });

  return (
    <main class='flex h-full w-full'>
      <Sidebar />
      <div class='flex flex-col flex-grow h-full w-full overflow-hidden'>
        <TopicBox room={rp.room} topic={topic()} />
        <Lines msgs={filteredMsgs()} />
        <InputBox room={rp.room} />
      </div>
      <UserList />
    </main>
  );
}
