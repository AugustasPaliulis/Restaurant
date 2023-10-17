import * as React from "react";
const Cart = (props) => (
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
      d="M19.579 20.25H4.42a.75.75 0 0 1-.745-.667l-1.334-12a.75.75 0 0 1 .746-.833h17.824a.75.75 0 0 1 .745.833l-1.333 12a.75.75 0 0 1-.745.667Z"
    />
    <path
      stroke="#FFFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.25 9.75v-3a3.75 3.75 0 0 1 7.5 0v3"
    />
  </svg>
);
export default Cart;
