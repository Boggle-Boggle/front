import type { SVGProps } from 'react';

const Headphone = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5.56 16.14v-6a6.37 6.37 0 0 1 6.37-6.39H12a6.37 6.37 0 0 1 6.37 6.37v6.5A2.33 2.33 0 0 1 16 19h-2"
    />
    <path
      stroke="currentColor"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M18.37 9.79h1.81a1 1 0 0 1 1 1v4.35a1 1 0 0 1-1 1h-1.81zM5.46 16.14H3.75a1 1 0 0 1-1-1v-4.35a1 1 0 0 1 1-1h1.81v6.25a.1.1 0 0 1-.1.1ZM12.18 20.77a1.82 1.82 0 1 0 0-3.64 1.82 1.82 0 0 0 0 3.64Z"
    />
  </svg>
);
export default Headphone;
