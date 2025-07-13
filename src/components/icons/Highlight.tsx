import type { SVGProps } from 'react';

const Highlight = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="currentColor"
      strokeWidth={1.5}
      d="M17.806 3.664a1 1 0 0 1 1.414 0l1.116 1.115a1 1 0 0 1 0 1.415l-1.823 1.822-2.53-2.53zM11.304 16.237l7.083-8.094-2.53-2.53-8.094 7.083m3.541 3.54-3.54-3.54m3.54 3.54-1.946 1.082a.5.5 0 0 1-.597-.083l-1.996-1.996a.5.5 0 0 1-.083-.597l1.081-1.946"
    />
    <path
      fill="currentColor"
      d="m7.818 17.81-1.655-1.655a.5.5 0 0 0-.765.068l-1.565 2.262a.5.5 0 0 0 .242.755l1.17.421a1 1 0 0 0 .858-.086l1.621-.984a.5.5 0 0 0 .094-.781"
    />
  </svg>
);
export default Highlight;
