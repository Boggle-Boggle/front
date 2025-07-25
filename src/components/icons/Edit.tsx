import type { SVGProps } from 'react';

const Edit = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.015 10.988v6.74a1.84 1.84 0 0 1-1.85 1.84h-10.9a1.85 1.85 0 0 1-1.86-1.84V6.888a1.85 1.85 0 0 1 1.86-1.84h6.74M17.912 5.139l.975.976a1 1 0 0 1 0 1.414l-1.654 1.654-2.39-2.39 1.619-1.619a1 1 0 0 1 1.414 0z"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m8.055 13.578 6.79-6.79 2.39 2.39-6.79 6.79"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m8.045 13.568-.83 3.25 3.25-.83"
    />
  </svg>
);
export default Edit;
