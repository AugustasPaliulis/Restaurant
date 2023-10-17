import * as React from "react";
const Cross = (props) => (
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
      d="m18.75 5.25-13.5 13.5M18.75 18.75 5.25 5.25"
    />
  </svg>
);
export default Cross;
