"use client";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useContext, useState } from "react";
import { CartContext } from "../../_context/CartContext";
import { useUser } from "@clerk/nextjs";
import orderApis from "../../_utils/orderApis";
import CartApis from "../../_utils/CartApis";
const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const [loading, setLoading] = useState(false);
  const { cart, setCart } = useContext(CartContext);
  const { user } = useUser();

  const handleError = (error) => {
    setLoading(false);
    setErrorMessage(error.message);
  };

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();

    if (!stripe) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setLoading(true);
    createOrder();
    sendEmail();
    // Trigger form validation and wallet collection
    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    // Create the PaymentIntent and obtain clientSecret
    const res = await fetch("api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
      }),
    });

    // const { client_secret: clientSecret } = await res.json();

    const clientSecret = await res.json();
    // Confirm the PaymentIntent using the details collected by the Payment Element
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret: clientSecret,
      confirmParams: {
        return_url: "http://localhost:3000/payment-confirm",
      },
    });

    if (error) {
      // This point is only reached if there's an immediate error when
      // confirming the payment. Show the error to your customer (for example, payment details incomplete)
      handleError(error);
    } else {
      // Your customer is redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer is redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  function createOrder() {
    let productIds = [];
    cart.forEach((el) => {
      productIds.push(el?.product?.id);
    });
    const data = {
      data: {
        email: user.primaryEmailAddress.emailAddress,
        username: user.fullName,
        amount,
        products: productIds,
      },
    };
    orderApis
      .createOrder(data)
      .then((res) => {
        if (res) {
          cart.forEach((el) => {
            CartApis.deleteCartItem(el?.id).then((result) => {
              console.log(result.data.data);
            });
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  }
  const sendEmail = async () => {
    const res = await fetch("api/send-email", {
      method: "POST",
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mx-32 md:mx-[320px] mt-12">
        <PaymentElement />
        <button className="bg-primary text-white rounded-md p-2 w-full mt-4">
          Submit
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
