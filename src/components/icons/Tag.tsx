import type { SVGProps } from 'react';

const Tag = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m18.435 16.58 2.315-2.31a2.09 2.09 0 0 0-.09-2.94L12.75 3.4a2.3 2.3 0 0 0-.89-.54 1.3 1.3 0 0 0-.48-.11h-.15l-5.56.09a1 1 0 0 0-1 1l-.01 1.38"
    />
    <path
      stroke="currentColor"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M10 4.94a1 1 0 0 0-.47-.11h-.17L3.82 5a1 1 0 0 0-.95.95l-.12 5.49v.15a1 1 0 0 0 .11.47c.102.335.284.64.53.89l7.83 7.83a2.08 2.08 0 0 0 2.93.07l4.62-4.62a2.08 2.08 0 0 0-.07-2.93l-7.83-7.83a2.16 2.16 0 0 0-.87-.53Z"
    />
    <path
      stroke="currentColor"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M6.81 10.36a1.33 1.33 0 1 0 0-2.66 1.33 1.33 0 0 0 0 2.66Z"
    />
  </svg>
);
export default Tag;
