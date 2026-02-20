import '../src/main.css';

import { Preview } from '@storybook/react-vite';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: ['Components', ['Button', 'Checkbox', 'Radio', 'Switch', 'Icons']],
      },
    },
  },
};

export default preview;
