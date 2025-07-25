import type { SVGProps } from 'react';

const Bookmark = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m17.5 21.25-4.838-2.57a1 1 0 0 0-.87 0l-5.3 2.57a1 1 0 0 1-1.49-.94V5.1A2.09 2.09 0 0 1 7.082 3h9.838A2.09 2.09 0 0 1 19 5.1v15.21a1.05 1.05 0 0 1-1.5.94Z"
    />
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 11h8M12 7v7.86" />
  </svg>
);
export default Bookmark;
