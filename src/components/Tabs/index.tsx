type TabItem = {
  id: string;
  label: string;
  step?: string;
  disabled?: boolean;
};

type TabsProps = {
  tabs: TabItem[];
  value: string;
  onChange: (id: string) => void;
  variant?: 'default' | 'step';
  layout?: 'equal' | 'scroll';
  size?: 'sm' | 'md';
  className?: string;
  ariaLabel?: string;
};

export const Tabs = (props: TabsProps) => {
  const {
    tabs,
    value,
    onChange,
    variant = 'default',
    layout = 'equal',
    size = 'md',
    className = '',
    ariaLabel = 'tabs',
  } = props;

  if (tabs.length === 0) return null;

  const isStepVariant = variant === 'step';
  const isScrollLayout = layout === 'scroll' && !isStepVariant;

  const containerBaseClassName = isStepVariant ? 'w-full' : 'w-full border-b border-neutral-20';
  const listBaseClassName = isStepVariant ? 'relative flex w-full items-start' : 'flex w-full items-stretch';
  const listLayoutClassName = isScrollLayout ? 'overflow-x-auto' : 'overflow-hidden';
  const listScrollbarClassName = isScrollLayout
    ? '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'
    : '';

  const tabBaseClassName = 'relative inline-flex items-center justify-center transition-colors';
  const tabEqualLayoutClassName = layout === 'equal' ? 'flex-1' : 'shrink-0';
  const tabPaddingClassName =
    layout === 'equal' ? (size === 'sm' ? 'py-2' : 'py-3') : size === 'sm' ? 'px-3 py-2' : 'px-4 py-3';
  const tabTextClassName = size === 'sm' ? 'text-caption1' : 'text-body1';
  const tabDisabledClassName = 'disabled:cursor-not-allowed disabled:opacity-40';

  const tabBorderBaseClassName = isStepVariant ? '' : 'border-b-2';

  const stepButtonBaseClassName = 'relative z-10 flex w-full flex-col items-center';
  const stepGapClassName = size === 'sm' ? 'gap-1.5' : 'gap-2';
  const stepNumberClassName = size === 'sm' ? 'text-caption1' : 'text-body1';
  const stepLabelClassName = size === 'sm' ? 'text-caption1' : 'text-body1';
  const stepTrackBaseClassName = 'absolute left-0 right-0 h-[2px] rounded-full bg-neutral-20';
  const stepTrackTopClassName = size === 'sm' ? 'top-7' : 'top-8';
  const stepTrackActiveClassName = 'absolute left-0 top-0 h-full rounded-full bg-neutral-100';

  const getTabTextClassName = (isSelected: boolean) => {
    if (isSelected) return 'text-neutral-100';

    return 'text-neutral-60';
  };

  const getTabBorderClassName = (isSelected: boolean) => {
    if (isSelected) return 'border-neutral-100';

    return 'border-transparent';
  };

  const handleTabClick = (tabId: string) => {
    onChange(tabId);
  };

  const selectedIndex = tabs.findIndex((tab) => tab.id === value);
  const safeSelectedIndex = selectedIndex < 0 ? 0 : selectedIndex;
  const stepProgressPercent = tabs.length <= 1 ? 0 : Math.min(100, (safeSelectedIndex / (tabs.length - 1)) * 100);

  return (
    <div className={`${containerBaseClassName} ${className}`}>
      <div
        role="tablist"
        aria-label={ariaLabel}
        className={`${listBaseClassName} ${listLayoutClassName} ${listScrollbarClassName}`}
      >
        {isStepVariant && (
          <div className={`${stepTrackBaseClassName} ${stepTrackTopClassName}`}>
            <div className={stepTrackActiveClassName} style={{ width: `${stepProgressPercent}%` }} />
          </div>
        )}
        {tabs.map((tab) => {
          const isSelected = tab.id === value;
          const tabTextStateClassName = getTabTextClassName(isSelected);
          const tabBorderStateClassName = getTabBorderClassName(isSelected);
          const tabClassName = `${tabBaseClassName} ${tabBorderBaseClassName} ${tabEqualLayoutClassName} ${tabPaddingClassName} ${tabTextClassName} ${tabBorderStateClassName} ${tabTextStateClassName} ${tabDisabledClassName}`;
          const stepButtonClassName = `${stepButtonBaseClassName} ${stepGapClassName} ${tabDisabledClassName}`;
          const stepNumberTextClassName = `${stepNumberClassName} ${tabTextStateClassName}`;
          const stepLabelTextClassName = `${stepLabelClassName} ${tabTextStateClassName}`;

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
              className={isStepVariant ? stepButtonClassName : tabClassName}
              onClick={handleClick}
            >
              {isStepVariant ? (
                <>
                  <span className={stepNumberTextClassName}>{tab.step ?? tab.label}</span>
                  {tab.step && <span className={stepLabelTextClassName}>{tab.label}</span>}
                </>
              ) : (
                tab.label
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
