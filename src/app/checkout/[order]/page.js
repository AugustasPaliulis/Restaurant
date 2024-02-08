import CheckoutForm from "@/components/page_parts/checkout_form";
import CompleteOrderList from "@/components/page_parts/complete_order_list";
import CheckoutLayout from "@/layouts/checkout";

const CheckoutPage = ({ params }) => {
  return (
    <div>
      <CheckoutLayout>
        {/* {params.order} */}
        <CheckoutForm />
        <CompleteOrderList />
      </CheckoutLayout>
    </div>
  );
};

export default CheckoutPage;
