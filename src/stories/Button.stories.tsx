import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from 'components/refactor/Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    onClick: { action: 'clicked' },
    disabled: { control: 'boolean' },
    type: {
      control: { type: 'select' },
      options: ['button', 'submit'],
    },
    width: {
      control: { type: 'select' },
      options: ['long', 'short'],
    },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium'],
    },
    variant: {
      control: { type: 'select' },
      options: ['primary', 'grey', 'primaryLine', 'warning'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

const buttonArgs: React.ComponentProps<typeof Button> = {
  onClick: () => {},
  children: 'Button',
  variant: 'primary',
  size: 'small',
  width: 'short',
  disabled: false,
  type: 'submit',
};

export const Default: Story = {
  args: {
    ...buttonArgs,
  },
};

// export const SmallButtons: StoryFn<typeof Button> = (args) => (
//   <div style={{ display: 'flex', gap: '8px' }}>
//     <Button {...args} variant="primary" size="small">
//       Primary Small
//     </Button>
//     <Button {...args} variant="grey" size="small">
//       Grey Small
//     </Button>
//     <Button {...args} variant="warning" size="small">
//       Warning Small
//     </Button>
//   </div>
// );
