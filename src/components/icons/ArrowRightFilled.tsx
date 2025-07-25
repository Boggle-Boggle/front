import type { SVGProps } from 'react';

const ArrowRightFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <g clipPath="url(#arrow_right_filled_svg__a)">
      <path
        fill="currentColor"
        d="M6.925 21.53a.75.75 0 0 0 1.06 0l9-9a.75.75 0 0 0 0-1.06l-9-9-.056-.052a.75.75 0 0 0-1.004.052c-.144.144-.127.332-.13.521v18.181c.007.14.042.27.13.358"
      />
    </g>
    <defs>
      <clipPath id="arrow_right_filled_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default ArrowRightFilled;
