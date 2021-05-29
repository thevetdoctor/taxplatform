import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { Field, reduxForm, change } from "redux-form";
import SemanticDatepicker from "react-semantic-ui-datepickers";

import renderField from "../../subComponents/formFields/renderField";
import renderSelectField from "../../subComponents/formFields/renderSelectField";

import { purchaseDispatch } from "../../../CreditAppReduxFormDispatches";
import {
  USA_STATES,
  optionsNoOfMonthlyPayment,
} from "../../../CreditAppConstants";
import { validatePurchase } from "../../../CreditAppUtils";

import {
  formatNumber,
  formatAmount,
  normalizeAmount,
  normalizePerct,
} from "../../../../../utils/Utils";
import "../../../../../styles/form.scss";

const PurchaseForm = ({
  id,
  formData,
  onSubmit,
  setPersonalVisible,
  setPurchaseVisible,
}) => {
  const data = useSelector((state) => state.form.purchase);
  const [isHidden, setIsHidden] = useState(true);
  const [currentDate, setNewDate] = useState(null);
  const dispatch = useDispatch();

  const handleDate = (event, data, input) => {
    setNewDate(data.value);
    input.onChange(data.value);
  };

  const renderDatePicker = ({ input, label, meta: { touched, error } }) => {
    return (
      <div>
        <div>
          <label>{label}</label>
        </div>
        <SemanticDatepicker
          minDate={new Date()}
          id="form-width"
          value={currentDate}
          format={"MM-DD-YYYY"}
          onChange={(event, value) => handleDate(event, value, input)}
        />
        {touched && error && <span>{error}</span>}
      </div>
    );
  };

  const handleNext = () => {
    setPersonalVisible(true);
    onSubmit();
    setPurchaseVisible(false);
  };

  const calculate = (e) => {
    e.preventDefault();
    // Total Loan Return ( Amount Financed * (100 + (APR * Years)) + Finance Charge )
    let { amountFinance, numberOfmonthlyPayment, apr, financeCharge } =
      data.values;

    // Typecasting
    amountFinance = amountFinance.substring(1, amountFinance.length); // remove $
    amountFinance = Number(amountFinance);
    numberOfmonthlyPayment = Number(numberOfmonthlyPayment);
    apr = apr.length < 2 ? parseFloat(`0.0${apr}`) : parseFloat(`0.${apr}`);
    financeCharge = financeCharge.substring(1, financeCharge.length); // remove $
    financeCharge = Number(financeCharge);

    // console.log({ amountFinance, numberOfmonthlyPayment, apr, financeCharge });

    const interestPerYear = amountFinance * apr;
    const loanTerm = numberOfmonthlyPayment / 12;
    const totalInterest = interestPerYear * loanTerm;
    const totalReturn = amountFinance + totalInterest + financeCharge;

    // Monthly Payment ( Total Loan Return / Monthly Payments )
    const monthlyCharge = totalReturn / numberOfmonthlyPayment;

    // console.log({ totalReturn });
    // console.log({ monthlyCharge });

    batch(() => {
      dispatch(
        change("purchase", "totalLoanAmount", formatNumber(totalReturn))
      );
      dispatch(
        change("purchase", "monthlyPayment", formatNumber(monthlyCharge))
      );
    });

    setIsHidden(false);
  };

  useEffect(() => {
    purchaseDispatch(formData, dispatch, batch);
  }, [dispatch, formData]);

  return (
    <div>
      <form onSubmit={null} className="form">
        <div className="form-style">
          <div>
            <Field
              type="text"
              name="amountFinance"
              label="Amount Financed"
              format={formatAmount}
              normalize={normalizeAmount}
              component={renderField}
            />
          </div>
          <div>
            <label>No. of Monthly Payment</label>
            <Field
              type="number"
              label="No. of Monthly Payment"
              name="numberOfmonthlyPayment"
              option={optionsNoOfMonthlyPayment}
              component={renderSelectField}
            />
          </div>
          <div>
            <label>Contract Location</label>
            <div>
              <Field
                type="number"
                name="contractLocation"
                label="Contract Location"
                component={renderSelectField}
                option={USA_STATES}
              />
            </div>
          </div>
        </div>
        <div className="form-style">
          <div>
            <Field
              type="text"
              name="financeCharge"
              format={formatAmount}
              normalize={normalizeAmount}
              label="Finance Charge"
              component={renderField}
            />
          </div>
          <div>
            <Field
              type="text"
              name="apr"
              label="APR (%)"
              normalize={normalizePerct}
              component={renderField}
            />
          </div>
        </div>

        {isHidden &&
        data &&
          data.values &&
          data.values.amountFinance &&
          data.values.numberOfmonthlyPayment &&
          data.values.contractLocation &&
          data.values.financeCharge &&
          data.values.apr && (
            <div className="btn-big-green">
              <div></div>
              <div>
                <button
                  onClick={(e) => {
                    calculate(e);
                  }}
                  className="btns"
                >
                  Calculate
                </button>
              </div>
            </div>
          )}
        <div className={isHidden ? "hide" : "show"}>
          <div className="form-style">
            <div>
              <Field
                type="text"
                name="totalLoanAmount"
                label="Total Loan Return"
                // format={formatAmount}
                normalize={normalizeAmount}
                component={renderField}
              />
            </div>
            <div>
              <Field
                type="text"
                name="monthlyPayment"
                label="Monthly Payment"
                // format={formatAmount}
                normalize={normalizeAmount}
                component={renderField}
              />
            </div>
            <div>
              <Field
                name="firstPayment"
                label="First Payment Date"
                component={renderDatePicker}
              />
            </div>
          </div>
          {data && (
            <div className="btn-big-green">
              <div></div>
              <div>
                <button
                  disabled={data && data.syncErrors}
                  onClick={() => {
                    handleNext();
                  }}
                  className="btns"
                  positive
                >
                  Continue
                </button>
              </div>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default reduxForm({
  form: "purchase",
  destroyOnUnmount: false,
  validate: validatePurchase,
})(PurchaseForm);
