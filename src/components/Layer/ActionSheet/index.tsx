import useLayerStore from 'stores/useLayerStore';

import { BottomSheet } from '../BottomSheet';

type ActionSheetItem = {
  key: string;
  label: string;
  tone?: 'default' | 'destructive';
  selected?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
};

type ActionSheetProps = {
  items: ActionSheetItem[];
  cancelLabel?: string;
  onCancel?: () => void;
};

export const ActionSheet = (props: ActionSheetProps) => {
  const { items, cancelLabel = '취소', onCancel } = props;
  const { pop } = useLayerStore();

  const handleSelectItem = (item: ActionSheetItem) => () => {
    if (item.disabled) return;

    item.onSelect?.();
    pop();
  };

  const handleCancel = () => {
    onCancel?.();
    pop();
  };

  return (
    <BottomSheet>
      <ul className="flex w-full flex-col px-4">
        {items.map((item) => {
          const itemTextColorClassName =
            item.tone === 'destructive' ? 'text-danger' : item.selected ? 'text-primary' : 'text-neutral-100';

          return (
            <li key={item.key} className="border-b">
              <button
                type="button"
                onClick={handleSelectItem(item)}
                className={`w-full py-4 text-body1 ${itemTextColorClassName} `}
              >
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>

      <button type="button" onClick={handleCancel} className="h-[3.5rem] w-full text-body1 text-neutral-60">
        {cancelLabel}
      </button>
    </BottomSheet>
  );
};
