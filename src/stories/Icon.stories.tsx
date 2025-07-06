import type { Meta } from '@storybook/react-vite';

import * as Icons from 'components/icons';

const meta: Meta = {
  title: 'Components/Icons',
};

export default meta;

export const MiniIcons = () => {
  return (
    <div className="grid grid-cols-7 gap-10 p-12">
      {Object.entries(Icons).map(([name, IconComponent]) => (
        <div>
          <div
            key={name}
            className="flex flex-col items-center rounded-lg bg-neutral-20 py-4 text-center text-sm text-neutral-80"
          >
            <IconComponent style={{ width: 16, height: 16 }} />
          </div>
          <div className="mt-2 text-center text-sm">{name}</div>
        </div>
      ))}
    </div>
  );
};

export const MediumIcons = () => {
  return (
    <div className="grid grid-cols-7 gap-10 p-12">
      {Object.entries(Icons).map(([name, IconComponent]) => (
        <div>
          <div
            key={name}
            className="flex flex-col items-center rounded-lg bg-neutral-20 py-4 text-center text-sm text-neutral-80"
          >
            <IconComponent style={{ width: 24, height: 24 }} />
          </div>
          <div className="mt-2 text-center text-sm">{name}</div>
        </div>
      ))}
    </div>
  );
};

export const LargeIcons = () => {
  return (
    <div className="grid grid-cols-7 gap-10 p-12">
      {Object.entries(Icons).map(([name, IconComponent]) => (
        <div>
          <div
            key={name}
            className="flex flex-col items-center rounded-lg bg-neutral-20 py-4 text-center text-sm text-neutral-80"
          >
            <IconComponent style={{ width: 32, height: 32 }} />
          </div>
          <div className="mt-2 text-center text-sm">{name}</div>
        </div>
      ))}
    </div>
  );
};

export const ColorIcons = () => {
  return (
    <div className="grid grid-cols-7 gap-10 p-12">
      {Object.entries(Icons).map(([name, IconComponent]) => (
        <div>
          <div
            key={name}
            className="flex flex-col items-center rounded-lg bg-neutral-20 py-4 text-center text-sm text-neutral-80"
          >
            <IconComponent style={{ width: 24, height: 24, color: '#8bcfa7' }} />
          </div>
          <div className="mt-2 text-center text-sm">{name}</div>
        </div>
      ))}
    </div>
  );
};
