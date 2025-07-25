import type { SVGProps } from 'react';

const CircleCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <circle cx={12} cy={12} r={9.25} stroke="currentColor" strokeWidth={1.5} />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m8.02 12.86 2.51 2.51M16.66 9.24l-6.09 6.09"
    />
  </svg>
);
export default CircleCheck;
