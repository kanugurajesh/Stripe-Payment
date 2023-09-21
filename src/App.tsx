import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import FlashPage from "./FlashPage";
import "./App.css";

// import values from .env in vite
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY as string);

export default function App() {
  const [clientSecret, setClientSecret] = useState<string>("");
  const [paymentSuccess, setPaymentSuccess] = useState<boolean>(false);
  const [showFlash, setShowFlash] = useState<boolean>(true);

  useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    fetch("/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, []);

  const appearance = {
    theme: 'stripe',
  };
  const options:any = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          {showFlash && <FlashPage setShowFlash={setShowFlash}/>}
          {paymentSuccess && showFlash != true? (
            <div>
              <h2>Payment successful!</h2>
              <p>
                Go to your <a href="https://dashboard.stripe.com/test/payments">Stripe dashboard</a> to see the payment.
              </p>
            </div>
          ) : (
            (showFlash != true) && <CheckoutForm setPaymentSuccess={setPaymentSuccess}/>
          )}
        </Elements>
      )}
    </div>
  );
}