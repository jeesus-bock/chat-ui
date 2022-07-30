// @refresh reload
import { Links, Meta, Routes, Scripts } from 'solid-start/root';
import { ErrorBoundary } from 'solid-start/error-boundary';
import { Suspense, createResource, createEffect } from 'solid-js';
import { produce } from 'solid-js/store';
import { getServer } from './service/get_server';
import { setStore } from './store/store';
import './tailwind.css';
import { ServerData } from './types';

export default function Root() {
  // Get the /server end-point data, this is required for anything to work
  const [serverData] = createResource(getServer);
  createEffect(() => {
    console.log('Root updating store with serverData', serverData());
    setStore(
      produce((s) => {
        s.serverData = serverData() as ServerData;
      })
    );
  });
  return (
    <html lang='en' class='h-full'>
      <head>
        <meta charset='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <Meta />
        <Links />
      </head>
      <body class='w-full h-full overflow-hidden bg-stone-100'>
        <ErrorBoundary>
          <Suspense>
            <Routes />
          </Suspense>
        </ErrorBoundary>
        <Scripts />
      </body>
    </html>
  );
}
