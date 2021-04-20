import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { Field, reduxForm } from "redux-form";
import SemanticDatepicker from "react-semantic-ui-datepickers";

import renderField from "../../subComponents/formFields/renderField";
import renderSelectField from "../../subComponents/formFields/renderSelectField";

import { purchaseDispatch } from "../../../CreditAppReduxFormDispatches";
import { USA_STATES, optionsNoOfMonthlyPayment, optionsCashOption } from "../../../CreditAppConstants";
import { validatePurchase } from "../../../CreditAppUtils";

import { formatAmount, normalizeAmount, normalizePerct } from "../../../../../utils/Utils";
import "../../../../../styles/form.scss";

const PurchaseForm = ({ id, formData, onSubmit, setPersonalVisible, setPurchaseVisible }) => {
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
                    onChange={(event, value) => handleDate(event, value, input)}
                />
                {touched && error && <span>{error}</span>}
            </div>
        );
    };

    const handleNext = (e) => {
        e.preventDefault();
        setPersonalVisible(true);
        onSubmit();
        setPurchaseVisible(false);
    };

    const calculate = (e) => {
        e.preventDefault();
        setIsHidden(false);
        setPersonalVisible(false);
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
                            name="price"
                            label="Estimated Price"
                            component={renderField}
                            format={formatAmount}
                            normalize={normalizeAmount}
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
                        <Field
                            type="text"
                            name="downPayment"
                            format={formatAmount}
                            normalize={normalizeAmount}
                            label="Down Payment"
                            component={renderField}
                        />
                    </div>
                    <div>
                        <Field
                            type="text"
                            name="unpaidBalance"
                            format={formatAmount}
                            normalize={normalizeAmount}
                            label="Unpaid Balance"
                            component={renderField}
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
                        <div>
                            <label>Same as cash option?</label>
                        </div>
                        <div>
                            <Field
                                type="number"
                                name="cashOption"
                                label="Same as Cash Option?"
                                component={renderSelectField}
                                option={optionsCashOption}
                            />
                        </div>
                    </div>
                    <div>
                        <Field
                            type="text"
                            name="defferedFirstPayment"
                            label="Deferred First Payment"
                            format={formatAmount}
                            normalize={normalizeAmount}
                            component={renderField}
                        />
                    </div>
                </div>
                {data &&
                data.values &&
                data.values.price &&
                data.values.price.length > 1 &&
                data.values.numberOfmonthlyPayment &&
                data.values.downPayment &&
                data.values.downPayment.length > 1 &&
                data.values.unpaidBalance &&
                data.values.unpaidBalance.length > 1 &&
                data.values.contractLocation &&
                data.values.defferedFirstPayment &&
                data.values.defferedFirstPayment.length > 1 &&
                data.values.cashOption &&
                data.values.cashOption.length > 1 ? (
                    <div className="btn-big-green">
                        <div></div>
                        <div>
                            <button onClick={calculate} className="btns">
                                Calculate
                            </button>
                        </div>
                    </div>
                ) : (
                    ""
                )}
                <div className={isHidden ? "hide" : "show"}>
                    <div className="form-style">
                        <div>
                            <Field
                                type="text"
                                name="amountFinance"
                                label="Amount Finance"
                                format={formatAmount}
                                normalize={normalizeAmount}
                                component={renderField}
                            />
                        </div>
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
                    <div className="form-style">
                        <div>
                            <Field
                                type="text"
                                name="totalLoanAmount"
                                label="Total Loan Amount"
                                format={formatAmount}
                                normalize={normalizeAmount}
                                component={renderField}
                            />
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="monthlyPayment"
                                label="Monthly Payment"
                                format={formatAmount}
                                normalize={normalizeAmount}
                                component={renderField}
                            />
                        </div>
                        <div>
                            <Field name="firstPayment" label="First Payment Date" component={renderDatePicker} />
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="cashPrice"
                                format={formatAmount}
                                normalize={normalizeAmount}
                                label="Cash Price"
                                component={renderField}
                            />
                        </div>
                    </div>
                    {data && data.syncErrors ? (
                        ""
                    ) : (
                        <div className="btn-big-green">
                            <div></div>
                            <div>
                                <button
                                    disabled={data && data.syncErrors}
                                    onClick={handleNext}
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
    validate: validatePurchase
})(PurchaseForm);
