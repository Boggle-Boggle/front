import type { SVGProps } from 'react';

const ArrowUpFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <g clipPath="url(#arrow_up_filled_svg__a)">
      <path
        fill="currentColor"
        d="M21.53 17.075a.75.75 0 0 0 0-1.06l-9-9a.75.75 0 0 0-1.06 0l-9 9-.052.056a.75.75 0 0 0 .052 1.004c.144.144.332.127.521.13h18.181c.14-.007.27-.042.358-.13"
      />
    </g>
    <defs>
      <clipPath id="arrow_up_filled_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default ArrowUpFilled;
