import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

const DeviceContext = createContext({ isIOS: false });

const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const { userAgent } = navigator;

    if (/iPhone/i.test(userAgent)) setIsIOS(true);
    else setIsIOS(false);
  }, []);

  const value = useMemo(() => ({ isIOS }), [isIOS]);

  return <DeviceContext.Provider value={value}>{children}</DeviceContext.Provider>;
};

export { DeviceContext, DeviceProvider };
