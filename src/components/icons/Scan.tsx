import type { SVGProps } from 'react';

const Scan = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.035 2.73h4.22a2 2 0 0 1 2 2v4.25M8.975 21.27h-4.23a2 2 0 0 1-2-2v-4.41M8.975 2.73h-4.23a2 2 0 0 0-2 2v4.25M14.975 21.27h4.26a2 2 0 0 0 2-2v-4.41M7.435 7.55h9.09M11.985 18.07V7.76"
    />
  </svg>
);
export default Scan;
