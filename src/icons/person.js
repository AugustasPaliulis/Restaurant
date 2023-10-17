import * as React from "react";
const Person = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} fill="none">
    <path
      stroke="#FFFF"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z"
    />
    <path
      stroke="#FFFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M2.905 20.25a10.504 10.504 0 0 1 18.19 0"
    />
  </svg>
);
export default Person;
