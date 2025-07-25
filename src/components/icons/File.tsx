import type { SVGProps } from 'react';

const File = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <g
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      clipPath="url(#file_svg__a)"
    >
      <path d="M17.565 8.745h-3.31a.81.81 0 0 1-.81-.81v-3.31a.81.81 0 0 1 1.37-.61l3.3 3.3a.81.81 0 0 1-.55 1.43" />
      <path d="M18.435 8.095v10.38a1.76 1.76 0 0 1-1.77 1.76h-9.33a1.76 1.76 0 0 1-1.77-1.76V5.535a1.77 1.77 0 0 1 1.77-1.77h6.8" />
    </g>
    <defs>
      <clipPath id="file_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default File;
