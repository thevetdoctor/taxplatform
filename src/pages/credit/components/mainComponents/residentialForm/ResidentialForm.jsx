import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { Field, reduxForm } from "redux-form";

import renderField from "../../subComponents/formFields/renderField";
import renderSelectField from "../../subComponents/formFields/renderSelectField";

import { residentialDispatch } from "../../../CreditAppReduxFormDispatches";
import { USA_STATES, optionTypeOfResidence, optionTypeOfHouse } from "../../../CreditAppConstants";
import { validateResidential } from "../../../CreditAppUtils";

import { formatAmount, normalizeAmount, normalizeZipCode } from "../../../../../utils/Utils";

import "../../../../../styles/form.scss";

const ResidentialForm = ({
    id,
    formData,
    onSubmit,
    setResidentialVisible,
    setEmploymentVisible,
    setIsResidentialVisited
}) => {
    const data = useSelector((state) => state.form.credit);
    const dispatch = useDispatch();

    const handleNext = (e) => {
        e.preventDefault();
        setEmploymentVisible(true);
        onSubmit();
        setResidentialVisible(false);
        setIsResidentialVisited(true);
    };

    const { values } = data;

    useEffect(() => {
        residentialDispatch(formData, dispatch, batch);
    }, [dispatch, formData]);

    return (
        <div>
            <form onSubmit={null} className="form residential-form">
                <div className="form-style">
                    <div>
                        <div>
                            <label>Type of Housing</label>
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="housingType"
                                label="Type of Housing"
                                component={renderSelectField}
                                option={optionTypeOfHouse}
                            />
                        </div>
                    </div>
                    <div>
                        <div>
                            <div>
                                <label>Type of Residence</label>
                            </div>
                            <div>
                                <Field
                                    type="text"
                                    name="residenceType"
                                    label="Type of Residence"
                                    component={renderSelectField}
                                    option={optionTypeOfResidence}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="form-style">
                    <div>
                        <Field
                            type="text"
                            name="monthlyHouseExpense"
                            label="Monthly House Expense"
                            component={renderField}
                            format={formatAmount}
                            normalize={normalizeAmount}
                        />
                    </div>
                    <div>
                        <Field
                            type="number"
                            name="timeAtCurrentAddressMonth"
                            label="Time At Current Address - Month(s)"
                            component={renderField}
                            placeholder="0"
                        />
                    </div>
                </div>
                <div className="checkbox-wrapper">
                    <Field
                        type="checkbox"
                        name="anotherMailingAddress"
                        label="Check box if you have a different mailing address"
                        component="input"
                        id="check"
                    />
                    <label>Check box if you have a different mailing address</label>
                </div>
                {values && values.anotherMailingAddress ? (
                    <div className="form-style">
                        <div>
                            <Field type="text" name="addressTwo" label="Address" component={renderField} id="suffix" />
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="appSuiteTwo"
                                label="App Suite"
                                component={renderField}
                                id="suffix"
                            />
                        </div>
                        <div>
                            <Field type="text" name="cityTwo" label="City" component={renderField} id="suffix" />
                        </div>
                        <div>
                            <div>
                                <label>State</label>
                            </div>
                            <div>
                                <Field
                                    type="number"
                                    name="stateTwo"
                                    label="State"
                                    component={renderSelectField}
                                    option={USA_STATES}
                                />
                            </div>
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="zipCodeTwo"
                                label="Zip Code"
                                component={renderField}
                                normalize={normalizeZipCode}
                            />
                        </div>
                    </div>
                ) : (
                    ""
                )}
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
    form: "credit",
    destroyOnUnmount: false,
    validate: validateResidential
})(ResidentialForm);
