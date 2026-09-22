import type { SVGProps } from 'react';

const Time = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 1.5a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17m0 1.75a.75.75 0 0 1 .75.75v5.25H18a.75.75 0 0 1 0 1.5h-6a.75.75 0 0 1-.75-.75V6a.75.75 0 0 1 .75-.75"
    />
  </svg>
);

export default Time;
