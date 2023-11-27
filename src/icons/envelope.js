import * as React from "react";
const Envelope = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      stroke="#1F242E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m21 5.25-9 8.25-9-8.25"
    />
    <path
      stroke="#1F242E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 5.25h18V18a.75.75 0 0 1-.75.75H3.75A.75.75 0 0 1 3 18V5.25ZM10.363 12 3.23 18.538M20.77 18.538 13.636 12"
    />
  </svg>
);
export default Envelope;
