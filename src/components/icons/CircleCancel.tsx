import type { SVGProps } from 'react';

const CircleCancel = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <g clipPath="url(#circle_cancel_svg__a)">
      <rect width={18.5} height={18.5} x={2.75} y={2.75} stroke="currentColor" strokeWidth={1.5} rx={9.25} />
      <path
        fill="currentColor"
        d="M16.066 7.934a.75.75 0 0 1 0 1.06l-2.998 3 3.005 3.004.052.058a.75.75 0 0 1-1.056 1.055l-.057-.052-3.005-3.005-3.012 3.012a.75.75 0 0 1-1.06-1.06l3.011-3.013-3.005-3.005a.75.75 0 0 1 1.06-1.06l3.006 3.004 2.998-2.998a.75.75 0 0 1 1.06 0"
      />
    </g>
    <defs>
      <clipPath id="circle_cancel_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default CircleCancel;
