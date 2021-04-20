import React from "react";
import { useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Divider } from "semantic-ui-react";

import renderField from "../formFields/renderField";
import renderSelectField from "../formFields/renderSelectField";

import { optionSource } from "../../../CreditAppConstants";
import { validateBuyer } from "../../../CreditAppUtils";

import { formatAmount, normalizeAmount } from "../../../../../utils/Utils";
import "../../../../../styles/form.scss";

const CobuyerEmploymentSecondary = ({ onSubmit, setBuyerInfoVisible, setTermVisible }) => {
    const data = useSelector((state) => state.form.buyer);

    const handleNext = (e) => {
        e.preventDefault();
        setTermVisible(true);
        onSubmit();
        setBuyerInfoVisible(false);
    };

    const { values } = data;
    return (
        <div>
            <div>
                <form onSubmit={null} className="form">
                    <div>
                        <div>
                            <div>
                                <label>Secondary Source of Income</label>
                            </div>
                            <div>
                                <div>
                                    <div>
                                        <Field
                                            type="number"
                                            name="coSourceOfIncomeSecondary"
                                            label="Source"
                                            component={renderSelectField}
                                            option={optionSource}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Divider />
                        {values &&
                        (values.coSourceOfIncomeSecondary === "Self-employed" ||
                            values.coSourceOfIncomeSecondary === "Military" ||
                            values.coSourceOfIncomeSecondary === "Job") ? (
                            <div>
                                <div className="form-style">
                                    <div>
                                        <Field
                                            type="text"
                                            name="coEmployerNameSecondary"
                                            label="Employer Name"
                                            component={renderField}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            type="text"
                                            name="coJobTitleSecondary"
                                            label="Job Title"
                                            component={renderField}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            type="text"
                                            name="coMonthlyGrossIncomeSecondary"
                                            label="Monthly Gross Income"
                                            normalize={normalizeAmount}
                                            format={formatAmount}
                                            component={renderField}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            type="text"
                                            name="coTimeAtCurrentEmployerSecondary"
                                            label="Time at Current Employer"
                                            component={renderField}
                                        />
                                    </div>
                                </div>
                                <div className="checkbox-wrapper">
                                    <Field
                                        type="checkbox"
                                        name="coAnotherSourceOfIncomeSecondary"
                                        label="Add another source of income"
                                        component="input"
                                        id="check"
                                    />
                                    {values && !values.coAnotherSourceOfIncomeSecondary ? (
                                        <label>Add another source of income</label>
                                    ) : (
                                        <label>Remove source of income</label>
                                    )}
                                </div>
                                {(data && data.syncErrors) || (values && values.coAnotherSourceOfIncomeSecondary) ? (
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
                        ) : values && values.coSourceOfIncomeSecondary === "Retired" ? (
                            <div>
                                <div>
                                    <Field
                                        type="text"
                                        name="coMonthlyGrossIncomeSecondary"
                                        label="Monthly Gross Income"
                                        normalize={normalizeAmount}
                                        format={formatAmount}
                                        component={renderField}
                                    />
                                </div>
                                <div className="checkbox-wrapper">
                                    <Field
                                        type="checkbox"
                                        name="coAnotherSourceOfIncomeSecondary"
                                        label="Add another source of income"
                                        component="input"
                                        id="check"
                                    />
                                    {values && !values.coAnotherSourceOfIncomeSecondary ? (
                                        <label>Add another source of income</label>
                                    ) : (
                                        <label>Remove source of income</label>
                                    )}
                                </div>
                                {(data && data.syncErrors) || (values && values.coAnotherSourceOfIncomeSecondary) ? (
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
                        ) : values && values.coSourceOfIncomeSecondary === "Other" ? (
                            <div>
                                <div>
                                    <Field
                                        type="text"
                                        name="coDescriptionSecondary"
                                        label="Description"
                                        component={renderField}
                                    />
                                    <Field
                                        type="text"
                                        name="coMonthlyGrossIncomeSecondary"
                                        label="Monthly Gross Income"
                                        normalize={normalizeAmount}
                                        format={formatAmount}
                                        component={renderField}
                                    />
                                </div>
                                <div className="checkbox-wrapper">
                                    <Field
                                        type="checkbox"
                                        name="coAnotherSourceOfIncomeSecondary"
                                        label="Add another source of income"
                                        component="input"
                                        id="check"
                                    />
                                    {values && !values.coAnotherSourceOfIncomeSecondary ? (
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
            </div>
        </div>
    );
};

export default reduxForm({
    form: "buyer",
    destroyOnUnmount: false,
    validate: validateBuyer
})(CobuyerEmploymentSecondary);
