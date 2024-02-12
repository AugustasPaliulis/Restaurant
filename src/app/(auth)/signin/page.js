import Input from "@/components/input";
import { Suspense } from "react";
import SignInForm from "@/components/page_parts/signin_form";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signin = () => {
  return (
    <div>
      <Suspense fallback={<></>}>
        <SignInForm />
      </Suspense>
    </div>
  );
};

export default Signin;
