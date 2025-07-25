import type { SVGProps } from 'react';

const ArrowRight = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <g clipPath="url(#arrow_right_svg__a)">
      <path
        fill="currentColor"
        d="M8.03 21.53a.75.75 0 1 1-1.06-1.06L15.44 12 6.97 3.53l-.052-.056a.75.75 0 0 1 1.056-1.056l.056.052 9 9a.75.75 0 0 1 0 1.06z"
      />
    </g>
    <defs>
      <clipPath id="arrow_right_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default ArrowRight;
