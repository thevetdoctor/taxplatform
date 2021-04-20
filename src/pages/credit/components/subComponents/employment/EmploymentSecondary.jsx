import React from "react";
import { useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Divider } from "semantic-ui-react";

import renderField from "../formFields/renderField";
import renderSelectField from "../formFields/renderSelectField";
import { optionSource } from "../../../CreditAppConstants";
import { validateEmployment } from "../../../CreditAppUtils";

import { formatAmount, normalizeAmount } from "../../../../../utils/Utils";
import "../../../../../styles/form.scss";

const EmploymentSecondary = ({ onSubmit, setEmploymentVisible, setBankInfoVisible }) => {
    const data = useSelector((state) => state.form.employment);

    const handleNext = (e) => {
        e.preventDefault();
        setBankInfoVisible(true);
        onSubmit();
        setEmploymentVisible(false);
    };

    const { values } = data;
    return (
        <form onSubmit={null} className="form employment-secondary">
            <div className="">
                <div className="">
                    <div>
                        <label>Secondary Source of Income</label>
                    </div>
                    <div>
                        <div>
                            <Field
                                type="number"
                                name="sourceOfIncomeSecondary"
                                label="Source"
                                component={renderSelectField}
                                option={optionSource}
                            />
                        </div>
                    </div>
                </div>
                {values &&
                    (values.sourceOfIncomeSecondary === "Self-employed" ||
                        values.sourceOfIncomeSecondary === "Military" ||
                        values.sourceOfIncomeSecondary === "Job") ? (
                        <div>
                            <div className="form-style">
                                <div>
                                    <Field
                                        type="text"
                                        name="employerNameSecondary"
                                        label="Employer Name"
                                        component={renderField}
                                    />
                                </div>
                                <div>
                                    <Field type="text" name="jobTitleSecondary" label="Job Title" component={renderField} />
                                </div>
                                <div>
                                    <Field
                                        type="text"
                                        name="monthlyGrossIncomeSecondary"
                                        label="Monthly Gross Income"
                                        format={formatAmount}
                                        normalize={normalizeAmount}
                                        component={renderField}
                                    />
                                </div>
                                <div>
                                    <Field
                                        type="text"
                                        name="timeAtCurrentEmployerSecondary"
                                        label="Time at Current Employer"
                                        component={renderField}
                                    />
                                </div>
                            </div>
                            <div className="checkbox-wrapper">
                                <Field
                                    type="checkbox"
                                    name="anotherSourceOfIncomeSecondary"
                                    label="Add another source of income"
                                    component="input"
                                    id="check"
                                />
                                {values && !values.anotherSourceOfIncomeSecondary ? (
                                    <label>Add another source of income</label>
                                ) : (
                                        <label>Remove source of income</label>
                                    )}
                            </div>
                            {(data && data.syncErrors) || (values && values.anotherSourceOfIncomeSecondary) ? (
                                ""
                            ) : (
                                    <div className="btn-big-green">
                                        <div></div>
                                        <div>
                                            <button disabled={data && data.syncErrors} onClick={handleNext} className="btns">
                                                Continue
                                    </button>
                                        </div>
                                    </div>
                                )}
                        </div>
                    ) : values && values.sourceOfIncomeSecondary === "Retired" ? (
                        <div>
                            <Field
                                type="text"
                                name="monthlyGrossIncomeSecondary"
                                label="Monthly Gross Income"
                                format={formatAmount}
                                normalize={normalizeAmount}
                                component={renderField}
                            />
                            <div className="checkbox-wrapper">
                                <Field
                                    type="checkbox"
                                    name="anotherSourceOfIncomeSecondary"
                                    label="Add another source of income"
                                    component="input"
                                    id="check"
                                />
                                {values && !values.anotherSourceOfIncomeSecondary ? (
                                    <label>Add another source of income</label>
                                ) : (
                                        <label>Remove source of income</label>
                                    )}
                            </div>
                            {(data && data.syncErrors) || (values && values.anotherSourceOfIncomeSecondary) ? (
                                ""
                            ) : (
                                    <div className="btn-big-green">
                                        <div></div>
                                        <div>
                                            <button disabled={data && data.syncErrors} onClick={handleNext} className="btns">
                                                Continue
                                    </button>
                                        </div>
                                    </div>
                                )}
                        </div>
                    ) : values && values.sourceOfIncomeSecondary === "Other" ? (
                        <div>
                            <div className="form-style">
                                <div>
                                    <Field
                                        type="text"
                                        name="descriptionSecondary"
                                        label="Description"
                                        component={renderField}
                                    />
                                </div>
                                <div>
                                    <Field
                                        type="text"
                                        name="monthlyGrossIncomeSecondary"
                                        label="Monthly Gross Income"
                                        format={formatAmount}
                                        normalize={normalizeAmount}
                                        component={renderField}
                                    />
                                </div>
                            </div>
                            <Field
                                type="checkbox"
                                name="anotherSourceOfIncomeSecondary"
                                label="Add another source of income"
                                component="input"
                                id="check"
                            />
                            {values && !values.anotherSourceOfIncomeSecondary ? (
                                <label>Add another source of income</label>
                            ) : (
                                    <label>Remove source of income</label>
                                )}
                            {(data && data.syncErrors) || (values && values.anotherSourceOfIncomeSecondary) ? (
                                ""
                            ) : (
                                    <div className="btn-big-green">
                                        <div></div>
                                        <div>
                                            <button disabled={data && data.syncErrors} onClick={handleNext} className="btns">
                                                Continue
                                    </button>
                                        </div>
                                    </div>
                                )}
                        </div>
                    ) : (
                                ""
                            )}
            </div>
        </form>
    );
};

export default reduxForm({
    form: "employment",
    destroyOnUnmount: false,
    validate: validateEmployment
})(EmploymentSecondary);
