import type { SVGProps } from 'react';

const Pen = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <g stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} clipPath="url(#pen_svg__a)">
      <path d="m17.884 4.255 1.86 1.86a1 1 0 0 1 0 1.414l-2.476 2.475-3.28-3.28 2.467-2.469a1 1 0 0 1 1.429 0M17.263 10 13.99 6.728l-9.298 9.298 3.274 3.274z" />
      <path d="M3.55 20.459 8 19.329l-3.32-3.32z" />
    </g>
    <defs>
      <clipPath id="pen_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default Pen;
