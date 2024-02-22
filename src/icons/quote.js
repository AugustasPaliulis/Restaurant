import * as React from "react";
const Quote = ({ width = 21, height = 34, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 21 34"
    {...props}
  >
    <path
      stroke="#195A00"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M19.5 19.75H3.562a1.875 1.875 0 0 1-1.874-1.875v-15A1.875 1.875 0 0 1 3.563 1h14.062A1.875 1.875 0 0 1 19.5 2.875V23.5a9.375 9.375 0 0 1-9.375 9.375"
    />
  </svg>
);
export default Quote;
