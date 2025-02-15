import * as React from "react";
const Lock = (props) => (
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
      d="M19.5 8.25h-15a.75.75 0 0 0-.75.75v10.5c0 .414.336.75.75.75h15a.75.75 0 0 0 .75-.75V9a.75.75 0 0 0-.75-.75ZM8.625 8.25V4.875a3.375 3.375 0 0 1 6.75 0V8.25"
    />
    <path
      fill="#FFFF"
      d="M12 15.375a1.125 1.125 0 1 0 0-2.25 1.125 1.125 0 0 0 0 2.25Z"
    />
  </svg>
);
export default Lock;
