import * as React from "react";
const HamburgerHome = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={55}
    height={57}
    fill="none"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10.484 21.442c-.256-.001-.51-.06-.74-.175a1.728 1.728 0 0 1-.595-.487 1.827 1.827 0 0 1-.34-1.488c1.375-6.825 9.216-12.032 18.69-12.032 9.476 0 17.317 5.207 18.692 12.032a1.826 1.826 0 0 1-.34 1.488c-.16.206-.364.372-.595.487a1.675 1.675 0 0 1-.74.175H10.484ZM44.688 37.396v3.546c0 1.88-.725 3.684-2.014 5.014a6.77 6.77 0 0 1-4.861 2.076H17.186a6.77 6.77 0 0 1-4.86-2.076 7.205 7.205 0 0 1-2.014-5.014v-3.546"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m6.016 39.169 8.593-3.546 8.594 3.546 8.594-3.546 8.594 3.546 8.593-3.546M5.156 28.532h44.688"
    />
  </svg>
);
export default HamburgerHome;
