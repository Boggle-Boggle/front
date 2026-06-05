import { IconArrowRight } from 'components/icons';

type SettingListItemProps = {
  title: string;
  description: string;
  onClick: () => void;
};

const SettingListItem = (props: SettingListItemProps) => {
  const { title, description, onClick } = props;

  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-20 w-full items-center gap-2 border-b border-neutral-20 px-mobile first:border-t"
    >
      <div className="flex h-11 min-w-0 flex-1 flex-col justify-start gap-[0.125rem] text-left">
        <p className="text-body1 text-neutral-100">{title}</p>
        <p className="text-caption1 text-neutral-60">{description}</p>
      </div>
      <IconArrowRight className="size-icon-md text-neutral-40" />
    </button>
  );
};

export default SettingListItem;
