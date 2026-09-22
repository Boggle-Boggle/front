import type { SVGProps } from 'react';

const CircleBan = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <circle cx={12} cy={12} r={9.25} stroke="currentColor" strokeWidth={1.5} />
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.993 18.003 18 6" />
  </svg>
);

export default CircleBan;
