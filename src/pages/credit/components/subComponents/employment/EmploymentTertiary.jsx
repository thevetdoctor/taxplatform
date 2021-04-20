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

const EmploymentTertiary = ({ onSubmit, setEmploymentVisible, setBankInfoVisible }) => {
    const data = useSelector((state) => state.form.employment);

    const handleNext = (e) => {
        e.preventDefault();
        setBankInfoVisible(true);
        onSubmit();
        setEmploymentVisible(false);
    };

    const { values } = data;
    return (
        <form onSubmit={null} className="form employment-tertiary">
            <div className="">
                <div className="">
                    <div>
                        <label>Tertiary Source of Income</label>
                    </div>
                    <div>
                        <Field
                            type="number"
                            name="sourceOfIncomeTertiary"
                            label="Source"
                            component={renderSelectField}
                            option={optionSource}
                        />
                    </div>
                </div>
                <Divider />
                {values &&
                (values.sourceOfIncomeTertiary === "Self-employed" ||
                    values.sourceOfIncomeTertiary === "Military" ||
                    values.sourceOfIncomeTertiary === "Job") ? (
                    <div>
                        <div className="form-style">
                            <div>
                                <Field
                                    type="text"
                                    name="employerNameTertiary"
                                    label="Employer Name"
                                    component={renderField}
                                />
                            </div>
                            <div>
                                <Field type="text" name="jobTitleTertiary" label="Job Title" component={renderField} />
                            </div>
                            <div>
                                <Field
                                    type="text"
                                    name="monthlyGrossIncomeTertiary"
                                    label="Monthly Gross Income"
                                    format={formatAmount}
                                    normalize={normalizeAmount}
                                    component={renderField}
                                />
                            </div>
                            <div>
                                <Field
                                    type="text"
                                    name="timeAtCurrentEmployerTertiary"
                                    label="Time at Current Employer"
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
                                    <button disabled={data && data.syncErrors} onClick={handleNext} className="btns">
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : values && values.sourceOfIncomeTertiary === "Retired" ? (
                    <div>
                        <div className="form-style">
                            <div>
                                <Field
                                    type="text"
                                    name="monthlyGrossIncomeTertiary"
                                    label="Monthly Gross Income"
                                    format={formatAmount}
                                    normalize={normalizeAmount}
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
                                    <button disabled={data && data.syncErrors} onClick={handleNext} className="btns">
                                        Continue
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : values && values.sourceOfIncomeTertiary === "Other" ? (
                    <div>
                        <div className="form-style">
                            <div>
                                <Field
                                    type="text"
                                    name="descriptionTertiary"
                                    label="Description"
                                    component={renderField}
                                />
                            </div>
                            <div>
                                <Field
                                    type="text"
                                    name="monthlyGrossIncomeTertiary"
                                    label="Monthly Gross Income"
                                    format={formatAmount}
                                    normalize={normalizeAmount}
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
})(EmploymentTertiary);
