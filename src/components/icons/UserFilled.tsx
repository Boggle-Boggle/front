import type { SVGProps } from 'react';

const UserFilled = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="m19.975 17.955-.01.202A2.046 2.046 0 0 1 17.93 20H5.976a2.046 2.046 0 0 1-1.972-1.847l-.01-.198v-.216l.008-.234A4.776 4.776 0 0 1 8.747 13h6.843l.217.006a4.385 4.385 0 0 1 4.168 4.38z"
    />
    <circle cx={12} cy={8} r={4} fill="currentColor" />
  </svg>
);
export default UserFilled;
