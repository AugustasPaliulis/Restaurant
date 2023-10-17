import * as React from "react";
const Hamburger = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#FFFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3.75 12h16.5M3.75 6h16.5M3.75 18h16.5"
    />
  </svg>
);
export default Hamburger;
