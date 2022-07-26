import { Link } from 'solid-app-router';
import { dcWs } from '~/service/ws';
export const Sidebar = () => {
  return (
    <nav class='flex flex-col bg-zinc-100 border-r border-zinc-500 min-h-screen' onClick={() => dcWs()}>
      <Link href='/chat/huone2' class='pt-2 pb-1 px-4'>
        Huone2
      </Link>
      <Link href='/chat/huone' class='pt-2 pb-1 px-4'>
        Huone
      </Link>
      <Link href='/chat/huone3' class='pt-2 pb-1 px-4'>
        Huone3
      </Link>
    </nav>
  );
};
