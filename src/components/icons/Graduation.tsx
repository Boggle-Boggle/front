import type { SVGProps } from 'react';

const Graduation = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.1 12v3.86a3.65 3.65 0 0 1-3.59 3.71H9.3a3.65 3.65 0 0 1-3.59-3.71v-4"
    />
    <path
      stroke="currentColor"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m11.47 4.85-8.06 3.6a1.12 1.12 0 0 0 0 2l8.06 3.6a1.13 1.13 0 0 0 .92 0l8.06-3.6a1.12 1.12 0 0 0 0-2l-8.06-3.6a1.13 1.13 0 0 0-.92 0Z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m12.61 9.47 7.05 1.25M20.18 18.29v-7.36"
    />
  </svg>
);
export default Graduation;
