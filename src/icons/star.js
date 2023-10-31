import * as React from "react";
const Star = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={21}
    fill="none"
    {...props}
  >
    <path
      stroke="#1F242E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m11.414 16.881 4.728 2.996c.604.383 1.355-.187 1.175-.892l-1.366-5.374a.821.821 0 0 1 .266-.832l4.24-3.53c.557-.463.27-1.388-.446-1.434l-5.537-.36a.79.79 0 0 1-.68-.501l-2.065-5.2a.78.78 0 0 0-1.458 0l-2.065 5.2a.79.79 0 0 1-.68.501l-5.537.36c-.716.046-1.003.97-.446 1.435l4.24 3.529a.82.82 0 0 1 .266.832l-1.267 4.983c-.215.847.685 1.53 1.41 1.071l4.394-2.784a.77.77 0 0 1 .828 0v0Z"
      {...props}
    />
  </svg>
);
export default Star;
