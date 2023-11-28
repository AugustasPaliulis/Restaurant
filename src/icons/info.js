import * as React from "react";
const Info = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#1F242E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
    />
    <path
      stroke="#1F242E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M11.25 11.25H12v5.25h.75"
    />
    <path
      fill="#1F242E"
      d="M12 9a1.125 1.125 0 1 0 0-2.25A1.125 1.125 0 0 0 12 9Z"
    />
  </svg>
);
export default Info;
