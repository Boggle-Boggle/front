import { useContext } from 'react';
import { DeviceContext } from 'stores/useDeviceStore';

const useDevice = () => useContext(DeviceContext);

export default useDevice;
