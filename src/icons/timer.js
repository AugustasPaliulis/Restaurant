import * as React from "react";
const Timer = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={55}
    height={56}
    fill="none"
    {...props}
  >
    <path
      stroke="#333"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M27.5 47.25c10.442 0 18.906-8.618 18.906-19.25 0-10.631-8.464-19.25-18.906-19.25C17.058 8.75 8.594 17.369 8.594 28c0 10.632 8.464 19.25 18.906 19.25Z"
    />
    <path
      stroke="#333"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m27.5 28 8.508-8.663M22.344 1.75h10.312"
    />
  </svg>
);
export default Timer;
