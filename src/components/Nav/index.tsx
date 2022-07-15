import { Link } from 'solid-app-router';
export default function Nav() {
  return (
    <nav class='flex flex-col bg-yellow-100 border-r-yellow-500 min-h-screen'>
      <Link href='/subr' class='pt-2 pb-1 px-4'>
        Subr
      </Link>
      <Link href='/subr2' class='pt-2 pb-1 px-4'>
        Subr2
      </Link>
      <Link href='/subr3' class='pt-2 pb-1 px-4'>
        Subr3
      </Link>
    </nav>
  );
}
