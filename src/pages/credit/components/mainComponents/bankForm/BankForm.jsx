import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { Field, reduxForm } from "redux-form";

import renderSelectField from "../../subComponents/formFields/renderSelectField";

import { validateBank } from "../../../CreditAppUtils";
import { bankDispatch } from "../../../CreditAppReduxFormDispatches";

const BankForm = ({ id, formData, onSubmit, setBankInfoVisible, setBuyerInfoVisible, setIsBankVisited }) => {
    const data = useSelector((state) => state.form.bank);
    const dispatch = useDispatch();

    // Population of AutoPay Details
    const [checking, setChecking] = useState(
        formData && formData.form && formData.form.checking ? formData.form.checking : false
    );
    const [savings, setSavings] = useState(
        formData && formData.form && formData.form.savings ? formData.form.savings : false
    );
    const [debitCard, setDebitCard] = useState(
        formData && formData.form && formData.form.debitCard ? formData.form.debitCard : false
    );
    const [creditCard, setCreditCard] = useState(
        formData && formData.form && formData.form.creditCard ? formData.form.creditCard : false
    );
    const [optionsAutoPayMethod, setOptionsAutoPayMethod] = useState([]);

    const handleNext = () => {
        setBankInfoVisible(false);
        setBuyerInfoVisible(true);
        setIsBankVisited(true);
    };

    useEffect(() => {
        if (formData && formData.form) {
            let options = [];
            if (formData.form.checking) {
                options.push({ key: "Checking", text: "Checking", value: "Checking" });
            }
            if (formData.form.savings) {
                options.push({ key: "Savings", text: "Savings", value: "Savings" });
            }
            if (formData.form.debitCard) {
                options.push({
                    key: "Debit Card",
                    text: "Debit Card",
                    value: "Debit Card"
                });
            }
            if (formData.form.creditCard) {
                options.push({
                    key: "Credit Card",
                    text: "Credit Card",
                    value: "Credit Card"
                });
            }
            setOptionsAutoPayMethod(options);
        }
    }, []);

    // useEffect(() => {
    //   bankDispatch(formData, id, dispatch, batch);
    // }, [dispatch, formData]);

    useEffect(() => {
        let options = [];
        if (checking) {
            options.push({ key: "Checking", text: "Checking", value: "Checking" });
        }
        if (savings) {
            options.push({ key: "Savings", text: "Savings", value: "Savings" });
        }
        if (debitCard) {
            options.push({
                key: "Debit Card",
                text: "Debit Card",
                value: "Debit Card"
            });
        }
        if (creditCard) {
            options.push({
                key: "Credit Card",
                text: "Credit Card",
                value: "Credit Card"
            });
        }
        setOptionsAutoPayMethod(options);
    }, [checking, savings, debitCard, creditCard]);

    return (
        <div>
            <form onSubmit={onSubmit} className="form banking-info-form">
                <div style={{ marginBottom: "10px" }}>
                    <div>
                        <div className="banking-info-form__title">
                            <label>
                                Account Types Owned <br /> (Select all that apply)
                            </label>
                        </div>
                        <div className="checkbox-wrapper">
                            <Field
                                type="checkbox"
                                name="checking"
                                component="input"
                                id="check"
                                onClick={() => {
                                    setChecking(!checking);
                                }}
                            />
                            <label>Checking</label>
                        </div>
                        <div className="checkbox-wrapper">
                            <Field
                                type="checkbox"
                                name="savings"
                                component="input"
                                id="check"
                                onClick={() => {
                                    setSavings(!savings);
                                }}
                            />
                            <label>Savings</label>
                        </div>
                        <div className="checkbox-wrapper">
                            <Field
                                type="checkbox"
                                name="debitCard"
                                component="input"
                                id="check"
                                onClick={() => {
                                    setDebitCard(!debitCard);
                                }}
                            />
                            <label>Debit Card</label>
                        </div>
                        <div className="checkbox-wrapper">
                            <Field
                                type="checkbox"
                                name="creditCard"
                                component="input"
                                id="check"
                                onClick={() => {
                                    setCreditCard(!creditCard);
                                }}
                            />
                            <label>Credit Card</label>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>Planned AutoPay Method</label>
                            <Field
                                type="number"
                                name="plannedAutoPayMethod"
                                label="AutoPay Method"
                                component={renderSelectField}
                                option={optionsAutoPayMethod}
                            />
                        </div>
                    </div>
                </div>
                {data && data.syncErrors ? (
                    ""
                ) : (
                    <div className="btn-big-green">
                        <div></div>
                        <div>
                            <button disabled={data && data.syncErrors} onClick={handleNext} className="btns" positive>
                                Continue
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </div>
    );
};

export default reduxForm({
    form: "bank",
    destroyOnUnmount: false,
    validate: validateBank
})(BankForm);
