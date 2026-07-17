import type { SVGProps } from 'react';

const CircleDeleteFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <circle cx={12} cy={12} r={10} fill="currentColor" />
    <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 12h10" />
  </svg>
);
export default CircleDeleteFilled;
