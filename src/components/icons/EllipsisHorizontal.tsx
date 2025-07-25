import type { SVGProps } from 'react';

const EllipsisHorizontal = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      stroke="currentColor"
      strokeMiterlimit={10}
      strokeWidth={1.17}
      d="M19 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM11 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0ZM3 12a1 1 0 1 0 2 0 1 1 0 0 0-2 0Z"
    />
  </svg>
);
export default EllipsisHorizontal;
