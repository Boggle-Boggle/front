import { SVGProps } from 'react';

const CheckMark = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 11" fill="none" {...props}>
    <path
      d="M13.7765 0.668086C14.0711 0.427777 14.5058 0.44524 14.7804 0.719844C15.055 0.994447 15.0725 1.42917 14.8321 1.72375L14.7804 1.78039L6.78039 9.78039C6.50579 10.055 6.07107 10.0725 5.77648 9.83215L5.71984 9.78039L0.719844 4.78039L0.668086 4.72375C0.427777 4.42917 0.44524 3.99445 0.719844 3.71984C0.994447 3.44524 1.42917 3.42778 1.72375 3.66809L1.78039 3.71984L6.25012 8.18957L13.7198 0.719844L13.7765 0.668086Z"
      fill="white"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CheckMark;
