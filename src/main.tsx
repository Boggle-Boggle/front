import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { DeviceProvider } from 'stores/useDeviceStore';

import Loading from 'pages/Loading';

import AppRouter from './router';
import './main.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: import.meta.env.MODE === 'production',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DeviceProvider>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loading />}>
          <AppRouter />
        </Suspense>
      </QueryClientProvider>
    </DeviceProvider>
  </StrictMode>,
);
