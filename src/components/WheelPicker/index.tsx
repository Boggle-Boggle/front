import { Wheel } from './Wheel';

export type PickerColumn = {
  key: string;
  items: { value: string | number; label: string }[];
  value: string | number;
  onChange: (value: string | number) => void;
};

type WheelPickerProps = {
  columns: PickerColumn[];
  height?: number;
  itemHeight?: number;
};

export const WheelPicker = (props: WheelPickerProps) => {
  const { columns, height = 200, itemHeight = 40 } = props;

  return (
    <div className="flex w-full overflow-hidden">
      {columns.map(({ items, key, value, onChange }) => (
        <Wheel items={items} value={value} onChange={onChange} height={height} itemHeight={itemHeight} key={key} />
      ))}
    </div>
  );
};
