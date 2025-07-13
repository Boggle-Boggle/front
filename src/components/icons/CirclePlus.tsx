import type { SVGProps } from 'react';

const CirclePlus = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <rect width={18.5} height={18.5} x={2.75} y={2.75} stroke="currentColor" strokeWidth={1.5} rx={9.25} />
    <path
      fill="currentColor"
      d="M11.75 6.25a.75.75 0 0 1 .75.75v4.24h4.25l.077.004a.75.75 0 0 1 0 1.492l-.077.004H12.5V17a.75.75 0 0 1-1.5 0v-4.26H6.75a.75.75 0 0 1 0-1.5H11V7a.75.75 0 0 1 .75-.75"
    />
  </svg>
);
export default CirclePlus;
