export type TabItem<T extends string> = {
  id: T;
  label: string;
  disabled?: boolean;
};

type TabsProps<T extends string> = {
  tabs: TabItem<T>[];
  value: T;
  onChange: (id: T) => void;
  className?: string;
  ariaLabel?: string;
};

export const Tabs = <T extends string>(props: TabsProps<T>) => {
  const { tabs, value, onChange, className = '', ariaLabel = 'tabs' } = props;

  if (tabs.length !== 2 && tabs.length !== 3) {
    return null;
  }

  const containerClassName = `w-full border-b border-neutral-20 ${className}`;
  const listClassName = 'relative flex w-full items-stretch overflow-hidden';
  const tabBaseClassName =
    'relative z-10 inline-flex flex-1 items-center justify-center py-[0.375rem] text-body1 transition-colors';
  const tabDisabledClassName = 'disabled:cursor-not-allowed disabled:opacity-40';
  const activeTabIndex = tabs.findIndex((tab) => tab.id === value);
  const indicatorWidth = `${100 / tabs.length}%`;
  const indicatorTranslate = `${Math.max(activeTabIndex, 0) * 100}%`;

  const getTabTextClassName = (isSelected: boolean) => (isSelected ? 'text-neutral-100' : 'text-neutral-60');

  const handleTabClick = (tabId: T) => {
    onChange(tabId);
  };

  return (
    <div className={containerClassName}>
      <div role="tablist" aria-label={ariaLabel} className={listClassName}>
        {tabs.map((tab) => {
          const isSelected = tab.id === value;
          const tabClassName = [tabBaseClassName, getTabTextClassName(isSelected), tabDisabledClassName].join(' ');

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
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 h-0.5 bg-neutral-100 transition-transform duration-200 ease-out"
          style={{
            width: indicatorWidth,
            transform: `translateX(${indicatorTranslate})`,
          }}
        />
      </div>
    </div>
  );
};
