import { createContext, ReactNode, useMemo, useState } from 'react';

const DeviceContext = createContext({ isIOS: false });

const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [isIOS] = useState<boolean>(() => /iPhone/i.test(navigator.userAgent));

  const value = useMemo(() => ({ isIOS }), [isIOS]);

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
};

export { DeviceContext, DeviceProvider };
