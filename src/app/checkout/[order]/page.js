import CheckoutForm from "@/components/page_parts/checkout_form";

const CheckoutPage = ({ params }) => {
  return (
    <div>
      {params.order} <CheckoutForm />
    </div>
  );
};

export default CheckoutPage;
