import * as React from "react";
const Truck = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={55}
    fill="none"
    {...props}
  >
    <path
      stroke="#333"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M38.5 17.188h9.319c.348-.003.69.099.978.29.29.192.513.465.64.784l3.063 7.52M3.5 30.938h35"
    />
    <path
      stroke="#333"
      strokeMiterlimit={10}
      strokeWidth={2}
      d="M41.125 46.406c2.9 0 5.25-2.308 5.25-5.156s-2.35-5.156-5.25-5.156-5.25 2.308-5.25 5.156 2.35 5.156 5.25 5.156ZM14.875 46.406c2.9 0 5.25-2.308 5.25-5.156s-2.35-5.156-5.25-5.156-5.25 2.308-5.25 5.156 2.35 5.156 5.25 5.156Z"
    />
    <path
      stroke="#333"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M35.875 41.25h-15.75M9.625 41.25H5.25c-.464 0-.91-.181-1.237-.503A1.703 1.703 0 0 1 3.5 39.53V15.47c0-.456.184-.893.513-1.216a1.766 1.766 0 0 1 1.237-.503H38.5v23.031M38.5 25.781h14v13.75c0 .456-.184.893-.513 1.216a1.766 1.766 0 0 1-1.237.503h-4.375"
    />
  </svg>
);
export default Truck;
