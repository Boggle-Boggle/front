import type { SVGProps } from 'react';

const Book = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M12.17 19.44V6.94s8.83-4.94 8.4 0v9a2 2 0 0 1-1.91 2s-4 .08-6.33 1.55a.1.1 0 0 1-.094.018.1.1 0 0 1-.066-.068Z"
    />
    <path
      stroke="currentColor"
      strokeMiterlimit={10}
      strokeWidth={1.51}
      d="M12.17 19.46V7s-8.84-5-8.4 0v9.1a2.07 2.07 0 0 0 1.92 2s4.08-.1 6.37 1.42a.07.07 0 0 0 .073.004.07.07 0 0 0 .037-.064Z"
    />
  </svg>
);
export default Book;
