import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import store from "../../../redux/store";
import { BILLING_URL } from "../../../utils/Constants";
import { setApplicationError, setAppLoading } from "../../../redux/index";
import { Tab, Header, Form, Button, Dropdown } from "semantic-ui-react";
import { CardElement, useElements } from "@stripe/react-stripe-js";

const StripeForm = ({
  stripe,
  applicationId,
  getActiveStripeSubscriptions,
}) => {
  const [bankAccount, setBankAccount] = useState({
    account_holder_name: null,
    account_holder_type: null,
    country: "us",
    currency: "usd",
    routing_number: null,
    account_number: null,
  });
  const [card, setCard] = useState({
    number: null,
    exp_month: null,
    exp_year: null,
    cvc: null,
  });

  const dispatch = useDispatch();
  const elements = useElements();

  const handleBankChange = (obj) => {
    const newBankObj = Object.assign(bankAccount, obj);
    setBankAccount(newBankObj);
  };

  const postPaymentDetails = async (payment_type) => {
    dispatch(setAppLoading(true));
    const stripeRes =
      payment_type === "bank"
        ? await stripe.createToken("bank_account", bankAccount)
        : await stripe.createToken(elements.getElement(CardElement));
    console.log({ stripeRes });

    if (stripeRes.token) {
      try {
        const apiRes = await axios.post(`${BILLING_URL}/subscription`, {
          applicationId,
          paymentParams: { type: payment_type, token: stripeRes.token.id },
        });

        if (apiRes) {
          dispatch(getActiveStripeSubscriptions());
        }
      } catch (err) {
          console.log({err})
          const { error, details } = err.response.data
          displayError(details.code, error)
      }
    } else {
      console.log({ stripeRes });
      displayError(stripeRes.data.error.code, stripeRes.data.error.message);
    }
  };

  const displayError = (code, message) => {
    dispatch(setAppLoading(false));
    store.dispatch(
      setApplicationError(`${code}: ${message}`)
    );
    setTimeout(() => {
      store.dispatch(setApplicationError(""));
    }, 5000);
  };

  const panes = [
    {
      menuItem: "Bank Account",
      render: () => (
        <Tab.Pane>
          <Header style={{ display: "block", margin: "auto" }}>
            Enter Billing Details
          </Header>
          Reoccuring Bank Account Payment
          <Form>
            <Form.Field>
              <label>Account Holder Name</label>
              <input
                placeholder="Name of Person or Business"
                onChange={(e) => {
                  handleBankChange({ account_holder_name: e.target.value });
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>Account Holder Type</label>
              <input
                placeholder="Account Holder Type (Individual or Company)"
                onChange={(e) => {
                  handleBankChange({ account_holder_type: e.target.value });
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>Country</label>
              <input disabled value="US" />
            </Form.Field>
            <Form.Field>
              <label>Currency</label>
              <input disabled value="USD" />
            </Form.Field>
            <Form.Field>
              <label>Account Number</label>
              <input
                placeholder="The Account Number of the Bank Account"
                onChange={(e) => {
                  handleBankChange({ account_number: e.target.value });
                }}
              />
            </Form.Field>
            <Form.Field>
              <label>Routing Number</label>
              <input
                placeholder="The Routing Number of the Bank Account"
                onChange={(e) => {
                  handleBankChange({ routing_number: e.target.value });
                }}
              />
            </Form.Field>
          </Form>
          <Button
            type="submit"
            primary
            style={{ margin: "auto", display: "block" }}
            onClick={() => {
              postPaymentDetails("bank");
            }}
          >
            Submit
          </Button>
        </Tab.Pane>
      ),
    },
    {
      menuItem: "Card",
      render: () => (
        <Tab.Pane>
          <Header style={{ display: "block", margin: "auto" }}>
            Enter Billing Details
          </Header>
          Reoccuring Card Payment
          <CardElement />
          <Button
            type="submit"
            primary
            style={{ margin: "auto", display: "block" }}
            onClick={() => {
              postPaymentDetails("card");
            }}
          >
            Submit
          </Button>
        </Tab.Pane>
      ),
    },
  ];

  return <Tab panes={panes} />;
};

export default StripeForm;
