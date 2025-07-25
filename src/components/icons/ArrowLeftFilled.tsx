import type { SVGProps } from 'react';

const ArrowLeftFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <g clipPath="url(#arrow_left_filled_svg__a)">
      <path
        fill="currentColor"
        d="M17.075 2.47a.75.75 0 0 0-1.06 0l-9 9a.75.75 0 0 0 0 1.06l9 9 .056.052a.75.75 0 0 0 1.004-.052c.144-.144.127-.332.13-.521V2.829c-.007-.14-.042-.271-.13-.36"
      />
    </g>
    <defs>
      <clipPath id="arrow_left_filled_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default ArrowLeftFilled;
