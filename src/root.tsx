// @refresh reload
import { Links, Meta, Routes, Scripts } from 'solid-start/root';
import { ErrorBoundary } from 'solid-start/error-boundary';
import { Suspense, createResource, createEffect } from 'solid-js';
import './tailwind.css';

export default function Root() {
  // Get the /server end-point data, this is required for anything to work

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
