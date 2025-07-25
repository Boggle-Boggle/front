import type { SVGProps } from 'react';

const CircleInfo = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11.95 15.83v-4.4" />
    <circle cx={11.95} cy={8.22} r={1} fill="currentColor" />
    <circle cx={12} cy={12} r={9.25} stroke="currentColor" strokeWidth={1.5} />
  </svg>
);
export default CircleInfo;
