import type { SVGProps } from 'react';

const User = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="m15.57 13.75.21.005a3.637 3.637 0 0 1 3.445 3.63v.553l-.008.156c-.027.255-.13.497-.296.694l-.075.083a1.3 1.3 0 0 1-.916.379H6a1.296 1.296 0 0 1-1.249-1.157l-.006-.155v-.173l.006-.218a4.026 4.026 0 0 1 3.801-3.791l.198-.006z"
    />
    <circle cx={12} cy={8} r={3.25} stroke="currentColor" strokeWidth={1.5} />
  </svg>
);
export default User;
