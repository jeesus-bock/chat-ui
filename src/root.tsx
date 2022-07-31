// @refresh reload
import { Links, Meta, Routes, Scripts } from 'solid-start/root';
import { ErrorBoundary } from 'solid-start/error-boundary';
import { Suspense } from 'solid-js';
import './tailwind.css';
import { CtxProvider } from './ctx';

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
            <CtxProvider>
              <Routes />
            </CtxProvider>
          </Suspense>
        </ErrorBoundary>

        <Scripts />
      </body>
    </html>
  );
}
