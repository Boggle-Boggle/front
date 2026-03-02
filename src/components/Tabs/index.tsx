type TabItem = {
  id: string;
  label: string;
  disabled?: boolean;
};

type TabsProps = {
  tabs: TabItem[];
  value: string;
  onChange: (id: string) => void;
  className?: string;
  ariaLabel?: string;
};

export const Tabs = (props: TabsProps) => {
  const { tabs, value, onChange, className = '', ariaLabel = 'tabs' } = props;

  if (tabs.length !== 2 && tabs.length !== 3) {
    return null;
  }

  const containerClassName = `w-full border-b border-neutral-20 ${className}`;
  const listClassName = 'flex w-full items-stretch overflow-hidden';
  const tabBaseClassName =
    'relative inline-flex flex-1 items-center justify-center border-b-2  py-[0.375rem] text-body1 transition-colors';
  const tabDisabledClassName = 'disabled:cursor-not-allowed disabled:opacity-40';

  const getTabTextClassName = (isSelected: boolean) => (isSelected ? 'text-neutral-100' : 'text-neutral-60');
  const getTabBorderClassName = (isSelected: boolean) => (isSelected ? 'border-neutral-100' : 'border-transparent');

  const handleTabClick = (tabId: string) => {
    onChange(tabId);
  };

  return (
    <div className={containerClassName}>
      <div role="tablist" aria-label={ariaLabel} className={listClassName}>
        {tabs.map((tab) => {
          const isSelected = tab.id === value;
          const tabClassName = [
            tabBaseClassName,
            getTabBorderClassName(isSelected),
            getTabTextClassName(isSelected),
            tabDisabledClassName,
          ].join(' ');

          const handleClick = () => {
            handleTabClick(tab.id);
          };

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              disabled={tab.disabled}
              className={tabClassName}
              onClick={handleClick}
            >
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
