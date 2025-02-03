import Icon from 'components/Icon';

import { CommonNext } from 'assets/icons';

type ContentItemProps = {
  children: string;
  handleClick?: () => void;
};

const ContentItem = ({ children, handleClick }: ContentItemProps) => {
  return (
    <li key={children}>
      <button
        className="flex h-12 w-full items-center justify-between border-b-[1px] border-b-main px-4"
        type="button"
        onClick={handleClick}
      >
        {children}
        <Icon Component={CommonNext} size="xs" style={{ opacity: '50%' }} />
      </button>
    </li>
  );
};

export default ContentItem;
