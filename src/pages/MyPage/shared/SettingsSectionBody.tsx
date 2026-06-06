import { ReactNode } from 'react';

type SettingsSectionBodyProps = {
  children: ReactNode;
};

const SettingsSectionBody = (props: SettingsSectionBodyProps) => {
  const { children } = props;

  return <div className="flex flex-col gap-2 px-mobile py-2">{children}</div>;
};

export default SettingsSectionBody;
