import type { SVGProps } from 'react';

const Comment = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="none" viewBox="0 0 24 24" {...props}>
    <mask id="comment_svg__a" width={22} height={18} x={1.179} y={3.5} fill="#000" maskUnits="userSpaceOnUse">
      <path fill="#fff" d="M1.179 3.5h22v18h-22z" />
      <path d="M14.757 5.5a6.065 6.065 0 0 1 0 12.13H9.243l-3.308.87.444-1.59A6.065 6.065 0 0 1 9.243 5.5z" />
    </mask>
    <path
      fill="currentColor"
      d="M14.757 5.5V4zm6.064 6.065h1.5zm-6.064 6.065v1.5zm-5.514 0v-1.5H9.05l-.187.05zm-3.308.87-1.445-.404-.704 2.52 2.53-.665zm.444-1.59 1.445.404.323-1.157-1.058-.568zm-3.2-5.345h-1.5zM9.243 5.5V4zm5.514 0V7a4.565 4.565 0 0 1 4.564 4.565h3A7.565 7.565 0 0 0 14.757 4zm6.064 6.065h-1.5a4.565 4.565 0 0 1-4.564 4.565v3a7.565 7.565 0 0 0 7.564-7.564zm-6.064 6.065v-1.5H9.243v3h5.514zm-5.514 0-.381-1.45-3.309.87.382 1.45.381 1.45 3.309-.87zm-3.308.87 1.444.404.445-1.59-1.445-.404-1.445-.404-.444 1.59zm.444-1.59.71-1.321a4.56 4.56 0 0 1-2.41-4.024h-3a7.56 7.56 0 0 0 3.99 6.667zm-3.2-5.345h1.5A4.565 4.565 0 0 1 9.243 7V4a7.565 7.565 0 0 0-7.564 7.565zM9.243 5.5V7h5.514V4H9.243z"
      mask="url(#comment_svg__a)"
    />
    <path fill="#fff" d="M7.5 11h9v2h-9z" />
    <circle cx={8.5} cy={12} r={1} fill="currentColor" />
    <circle cx={12} cy={12} r={1} fill="currentColor" />
    <circle cx={15.5} cy={12} r={1} fill="currentColor" />
  </svg>
);
export default Comment;
