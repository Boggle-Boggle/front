import type { SVGProps } from 'react';

const ArrowDown = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <g clipPath="url(#arrow_down_svg__a)">
      <path
        fill="currentColor"
        d="M2.418 7.974a.75.75 0 0 1 1.056-1.056l.056.052L12 15.44l8.47-8.47.056-.052a.75.75 0 0 1 1.056 1.056l-.052.056-9 9a.75.75 0 0 1-1.06 0l-9-9z"
      />
    </g>
    <defs>
      <clipPath id="arrow_down_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default ArrowDown;
