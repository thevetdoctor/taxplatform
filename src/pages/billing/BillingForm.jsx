import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { formatDate } from "../../utils/Utils";
import { getActiveStripeSubscriptions } from "../../redux/actions/billing";
import StripeForm from "./components/StripeForm";
import "../../styles/auth.scss";
import {
  CardElement,
  useElements,
  useStripe,
  Elements,
} from "@stripe/react-stripe-js"; // For Card

// Test Bank Account Details
// 000123456789 (Account)
// 110000000 (Routing)

// Test Card Details
// 4242424242424242

const BillingForm = () => {
  const { applicationId } = useParams();
  const activeSubscriptions = useSelector(
    (state) => state.billing.activeSubscriptions
  );
  const [alreadyActiveSubscription, setAlreadyActiveSubscription] = useState(
    false
  );
  const [stripe, setStripe] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      if (stripe === undefined) {
        const stripeRes = await loadStripe(
          "pk_test_51HrbUxAdAI21ldjmWDqxhD3t8hRrKMQ2WyshTOlNLGYEd4oWVoUrkIS0bKSYzpnCNoOtkpmFwzL62sF8IM8BDTeU00t0EK9JGA"
        );
        setStripe(stripeRes);
      }
    })();
    dispatch(getActiveStripeSubscriptions());
  }, []);

  useEffect(() => {
    if (activeSubscriptions.length !== 0) {
      // Check If Already Billed
      const isActive = activeSubscriptions.findIndex(
        (subscription) =>
          subscription.application &&
          parseInt(subscription.application.id) === parseInt(applicationId)
      );
      setAlreadyActiveSubscription(isActive);
    } else {
      setAlreadyActiveSubscription(false);
    }
  }, [activeSubscriptions]);

  return (
    <div className="backdrop" style={{ overflow: "auto" }}>
      <div id="circ" style={{ position: "fixed" }}>
        <div id="circle"></div>
        <div id="circle-two"></div>
      </div>
      <div
        style={{
          width: "50%",
          margin: "auto",
          position: "relative",
          marginTop: "30px",
          marginBottom: "30px",
        }}
      >
        <div className="logo-wrapper">
          <img src="/assets/logo-auth.png" alt="Logo" />
        </div>
        {alreadyActiveSubscription !== -1 &&
        alreadyActiveSubscription !== false ? (
          <h1 style={{ textAlign: "center", color: "white" }}>
            Automatic Payment Submitted On:<br></br>
            {formatDate(activeSubscriptions[alreadyActiveSubscription].created)}
            <br></br>Thank you.
          </h1>
        ) : (
          <>
            {stripe && (
              <Elements stripe={stripe}>
                <StripeForm
                  stripe={stripe}
                  applicationId={applicationId}
                  getActiveStripeSubscriptions={getActiveStripeSubscriptions}
                />
              </Elements>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BillingForm;
