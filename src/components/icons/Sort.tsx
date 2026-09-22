import type { SVGProps } from 'react';

const Sort = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17.54 19.17V8.21M17.47 19.24l-3.7-3.83M21.24 15.39l-3.7 3.82M2.78 4.75h16.49M2.75 12h10.51M2.75 19h6.5"
    />
  </svg>
);

export default Sort;
