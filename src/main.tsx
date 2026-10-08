import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import ReactDOM from 'react-dom/client';
import { DeviceProvider } from 'stores/useDeviceStore';

import { applyStoredThemeColor } from 'utils/theme';

import AppRouter from './router';
import './main.css';

applyStoredThemeColor();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: import.meta.env.MODE === 'production',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <DeviceProvider>
    <QueryClientProvider client={queryClient}>
      <AppRouter />
    </QueryClientProvider>
  </DeviceProvider>,
);
