import * as React from "react";
const EmptyStar = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    fill="none"
    {...props}
  >
    <path
      stroke="#195A00"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9.47 14.028 3.937 2.5c.508.32 1.133-.156.984-.742l-1.14-4.484a.68.68 0 0 1 .226-.688l3.531-2.945c.461-.383.227-1.156-.375-1.195l-4.609-.297a.649.649 0 0 1-.57-.422L9.735 1.427a.648.648 0 0 0-1.219 0L6.797 5.755a.648.648 0 0 1-.57.422l-4.61.297c-.6.039-.835.812-.374 1.195l3.531 2.945a.68.68 0 0 1 .227.688l-1.055 4.156c-.18.703.57 1.274 1.172.89l3.664-2.32a.64.64 0 0 1 .687 0v0Z"
    />
  </svg>
);
export default EmptyStar;
