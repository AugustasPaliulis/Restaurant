import * as React from "react";
const PaperPlane = (props) => (
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
      d="M19.712 3.364 2.244 8.29a.75.75 0 0 0-.118 1.4l8.026 3.801a.75.75 0 0 1 .357.357l3.802 8.026a.75.75 0 0 0 1.4-.118L20.636 4.29a.75.75 0 0 0-.925-.925ZM10.393 13.607l4.242-4.243"
      {...props}
    />
  </svg>
);
export default PaperPlane;
