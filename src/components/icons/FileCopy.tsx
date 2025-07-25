import type { SVGProps } from 'react';

const FileCopy = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.56}
      d="M17.39 19.44v.3a1.8 1.8 0 0 1-1.82 1.77H5.91a1.81 1.81 0 0 1-1.83-1.77v-13A1.8 1.8 0 0 1 5.91 5h.57"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.05 7.47h-3.31a.81.81 0 0 1-.81-.81V3.35a.81.81 0 0 1 1.37-.61l3.3 3.3a.81.81 0 0 1-.55 1.43"
    />
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.92 6.82V17.2a1.76 1.76 0 0 1-1.77 1.76H8.82a1.76 1.76 0 0 1-1.77-1.76V4.26a1.77 1.77 0 0 1 1.77-1.77h6.8"
    />
  </svg>
);
export default FileCopy;
