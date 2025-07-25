import type { SVGProps } from 'react';

const Trash = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M18.015 7.585v11.5a2.11 2.11 0 0 1-2 2.19h-8a2.11 2.11 0 0 1-2-2.19v-11.5M10.065 9.605v7.48M14.065 9.605v7.48M4.765 5.205h14.47M15.005 2.725h-5.61v2.48h5.61z"
    />
  </svg>
);
export default Trash;
