import type { Meta, StoryObj } from '@storybook/react-vite';

import { ComponentProps, useEffect, useState } from 'react';

import { SegmentedControl, type SegmentedControlOptions } from './index';

type ReadingProgressType = 'PAGE' | 'PERCENTAGE';

const READING_PROGRESS_OPTIONS: SegmentedControlOptions<ReadingProgressType> = {
  left: { value: 'PAGE', label: '쪽' },
  right: { value: 'PERCENTAGE', label: '%' },
};

const meta = {
  title: 'Components/SegmentedControl',
  component: SegmentedControl<ReadingProgressType>,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
  },
} satisfies Meta<typeof SegmentedControl<ReadingProgressType>>;

export default meta;
type Story = StoryObj<typeof meta>;

const segmentedControlArgs: ComponentProps<typeof SegmentedControl<ReadingProgressType>> = {
  options: READING_PROGRESS_OPTIONS,
  value: 'PAGE',
  onChange: () => {},
  ariaLabel: '독서량 입력 단위',
};

export const Default: Story = {
  args: {
    ...segmentedControlArgs,
  },
  render: (args) => {
    const [value, setValue] = useState<ReadingProgressType>(args.value);

    useEffect(() => {
      setValue(args.value);
    }, [args.value]);

    const handleChange = (nextValue: ReadingProgressType) => {
      setValue(nextValue);
      args.onChange(nextValue);
    };

    return <SegmentedControl {...args} value={value} onChange={handleChange} />;
  },
};
