import { Suspense } from 'solid-js';
import { Login } from '~/components/Login';

export default () => {
  return (
    <Suspense fallback={<div>Loading..</div>}>
      <Login />
    </Suspense>
  );
};
