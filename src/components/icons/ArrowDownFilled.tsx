import type { SVGProps } from 'react';

const ArrowDownFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <g clipPath="url(#arrow_down_filled_svg__a)">
      <path
        fill="currentColor"
        d="M2.47 6.925a.75.75 0 0 0 0 1.06l9 9a.75.75 0 0 0 1.06 0l9-9 .052-.056a.75.75 0 0 0-.052-1.004c-.144-.144-.332-.127-.521-.13H2.829c-.14.007-.271.042-.36.13"
      />
    </g>
    <defs>
      <clipPath id="arrow_down_filled_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default ArrowDownFilled;
