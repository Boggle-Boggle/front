import type { SVGProps } from 'react';

const Capture = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.951 3h4.104A1.946 1.946 0 0 1 21 4.942v4.126M9.058 21H4.945A1.946 1.946 0 0 1 3 19.058v-4.281M9.058 3H4.945A1.947 1.947 0 0 0 3 4.942v4.126M14.893 21h4.143a1.946 1.946 0 0 0 1.945-1.942v-4.281"
    />
    <circle cx={12} cy={12} r={4} stroke="currentColor" strokeWidth={2} />
  </svg>
);
export default Capture;
