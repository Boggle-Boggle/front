import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

import useDevice from 'hooks/useDevice';

import AndroidUpdateModal from './AndroidUpdateModal';
import IOSUpdateModal from './IOSUpdateModal';

const UpdateRequiredModal = () => {
  const { isIOS } = useDevice();
  const dialogRef = useRef<HTMLElement>(null);

  useEffect(() => {
    dialogRef.current?.focus();
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[5000] flex items-center justify-center bg-black/60 px-6">
      {isIOS ? <IOSUpdateModal dialogRef={dialogRef} /> : <AndroidUpdateModal dialogRef={dialogRef} />}
    </div>,
    document.body,
  );
};

export default UpdateRequiredModal;
