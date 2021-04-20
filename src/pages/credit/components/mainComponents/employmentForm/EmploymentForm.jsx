import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Divider } from "semantic-ui-react";

import renderSelectField from "../../subComponents/formFields/renderSelectField";
import renderField from "../../subComponents/formFields/renderField";
import EmploymentSecondary from "../../subComponents/employment/EmploymentSecondary";
import EmploymentTertiary from "../../subComponents/employment/EmploymentTertiary";

import { optionSource } from "../../../CreditAppConstants";
import { employmentDispatch } from "../../../CreditAppReduxFormDispatches";
import { validateEmployment } from "../../../CreditAppUtils";

import { formatAmount, normalizeAmount } from "../../../../../utils/Utils";

const EmploymentForm = ({
    id,
    formData,
    onSubmit,
    setEmploymentVisible,
    setBankInfoVisible,
    setIsEmploymentVisited
}) => {
    const data = useSelector((state) => state.form.employment);
    const dispatch = useDispatch();

    const handleNext = (e) => {
        e.preventDefault();
        setBankInfoVisible(true);
        onSubmit();
        setEmploymentVisible(false);
        setIsEmploymentVisited(true);
    };

    const { values, syncErrors } = data;

    useEffect(() => {
        employmentDispatch(formData, dispatch, batch);
    }, [dispatch, formData]);

    return (
        <div className="employment-form">
            <form onSubmit={null} className="form ">
                <div>
                    <div className="">
                        <label>Primary Source of Income</label>
                        <div>
                            <Field
                                type="number"
                                name="sourceOfIncome"
                                label="Source"
                                component={renderSelectField}
                                option={optionSource}
                            />
                        </div>
                    </div>
                    <Divider />
                    {values &&
                    (values.sourceOfIncome === "Self-employed" ||
                        values.sourceOfIncome === "Military" ||
                        values.sourceOfIncome === "Job") ? (
                        <div>
                            <div className="form-style">
                                <div>
                                    <Field
                                        type="text"
                                        name="employerName"
                                        label="Employer Name"
                                        component={renderField}
                                    />
                                </div>
                                <div>
                                    <Field type="text" name="jobTitle" label="Job Title" component={renderField} />
                                </div>
                                <div>
                                    <Field
                                        type="text"
                                        name="monthlyGrossIncome"
                                        label="Monthly Gross Income"
                                        component={renderField}
                                        format={formatAmount}
                                        normalize={normalizeAmount}
                                    />
                                </div>
                                <div>
                                    <Field
                                        type="text"
                                        name="timeAtCurrentEmployer"
                                        label="Time at Current Employer"
                                        component={renderField}
                                    />
                                </div>
                            </div>
                            <div className="checkbox-wrapper">
                                <Field
                                    type="checkbox"
                                    name="anotherSourceOfIncome"
                                    label="Add another source of income"
                                    component="input"
                                    id="check"
                                />
                                {values && !values.anotherSourceOfIncome ? (
                                    <label>Add another source of income</label>
                                ) : (
                                    <label>Remove source of income</label>
                                )}
                            </div>
                            {(data && data.syncErrors) || (values && values.anotherSourceOfIncome) ? (
                                ""
                            ) : (
                                <div className="btn-big-green">
                                    <div></div>
                                    <div>
                                        <button
                                            disabled={data && data.syncErrors}
                                            onClick={handleNext}
                                            className="btns"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : values && values.sourceOfIncome === "Retired" ? (
                        <div>
                            <div className="form-style">
                                <div>
                                    <Field
                                        type="text"
                                        name="monthlyGrossIncome"
                                        label="Monthly Gross Income"
                                        component={renderField}
                                        format={formatAmount}
                                        normalize={normalizeAmount}
                                    />
                                </div>
                            </div>
                            <div className="checkbox-wrapper">
                                <Field
                                    type="checkbox"
                                    name="anotherSourceOfIncome"
                                    label="Add another source of income"
                                    component="input"
                                    id="check"
                                />
                                {values && !values.anotherSourceOfIncome ? (
                                    <label>Add another source of income</label>
                                ) : (
                                    <label>Remove source of income</label>
                                )}
                            </div>
                            {(data && data.syncErrors) || (values && values.anotherSourceOfIncome) ? (
                                ""
                            ) : (
                                <div className="btn-big-green">
                                    <div></div>
                                    <div>
                                        <button
                                            disabled={data && data.syncErrors}
                                            onClick={handleNext}
                                            className="btns"
                                        >
                                            Continue
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : values && values.sourceOfIncome === "Other" ? (
                        <div>
                            <div className="form-style">
                                <div>
                                    <Field type="text" name="description" label="Description" component={renderField} />
                                </div>
                                <div>
                                    <Field
                                        type="text"
                                        name="monthlyGrossIncome"
                                        label="Monthly Gross Income"
                                        component={renderField}
                                        format={formatAmount}
                                        normalize={normalizeAmount}
                                    />
                                </div>
                            </div>
                            <div className="checkbox-wrapper">
                                <Field
                                    type="checkbox"
                                    name="anotherSourceOfIncome"
                                    label="Add another source of income"
                                    component="input"
                                    id="check"
                                />
                                {values && !values.anotherSourceOfIncome ? (
                                    <label>Add another source of income</label>
                                ) : (
                                    <label>Remove source of income</label>
                                )}
                            </div>
                            {(data && data.syncErrors) || (values && values.anotherSourceOfIncome) ? (
                                ""
                            ) : (
                                <div className="btn-big-green">
                                    <div></div>
                                    <div>
                                        <button
                                            disabled={data && data.syncErrors}
                                            onClick={handleNext}
                                            className="btns"
                                        >
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
            {values && values.anotherSourceOfIncome && (
                <EmploymentSecondary
                    setBankInfoVisible={setBankInfoVisible}
                    onSubmit={onSubmit}
                    setEmploymentVisible={setEmploymentVisible}
                />
            )}
            {values && values.anotherSourceOfIncomeSecondary && (
                <EmploymentTertiary
                    setBankInfoVisible={setBankInfoVisible}
                    onSubmit={onSubmit}
                    setEmploymentVisible={setEmploymentVisible}
                />
            )}
        </div>
    );
};

export default reduxForm({
    form: "employment",
    destroyOnUnmount: false,
    validate: validateEmployment
})(EmploymentForm);
