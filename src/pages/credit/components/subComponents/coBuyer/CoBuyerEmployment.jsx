import React from "react";
import { useSelector } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Divider } from "semantic-ui-react";

import CoBuyerEmploymentSecondary from "./CobuyerEmploymentSecondary";
import CoBuyerEmploymentTertiary from "./CobuyerEmploymentTertiary";

import renderField from "../formFields/renderField";
import renderSelectField from "../formFields/renderSelectField";

import { optionSource } from "../../../CreditAppConstants";
import { validateBuyer } from "../../../CreditAppUtils";

import { formatAmount, normalizeAmount } from "../../../../../utils/Utils";

const CoBuyerEmployment = ({ onSubmit, setTermVisible, setBuyerInfoVisible }) => {
    const data = useSelector((state) => state.form.buyer);

    const { values } = data;

    const handleNext = (e) => {
        e.preventDefault();
        setTermVisible(true);
        onSubmit();
        setBuyerInfoVisible(false);
    };



    return (
        <div>
            <form onSubmit={null} className="form">
                <div>
                    <div>
                        <div>
                            <label>Primary Source of Income</label>
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="coSourceOfIncome"
                                label="Source"
                                component={renderSelectField}
                                option={optionSource}
                            />
                        </div>
                    </div>
                    <Divider />
                    {values &&
                        (values.coSourceOfIncome === "Self-employed" ||
                            values.coSourceOfIncome === "Military" ||
                            values.coSourceOfIncome === "Job") ? (
                            <div>
                                <div className="form-style">
                                    <div>
                                        <Field
                                            type="text"
                                            name="coEmployerName"
                                            label="Employer Name"
                                            component={renderField}
                                        />
                                    </div>
                                    <div>
                                        <Field type="text" name="coJobTitle" label="Job Title" component={renderField} />
                                    </div>
                                    <div>
                                        <Field
                                            type="text"
                                            name="coMonthlyGrossIncome"
                                            label="Monthly Gross Income"
                                            normalize={normalizeAmount}
                                            format={formatAmount}
                                            component={renderField}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            type="text"
                                            name="coTimeAtCurrentEmployer"
                                            label="Time at Current Employer"
                                            component={renderField}
                                        />
                                    </div>
                                </div>
                                <div className="checkbox-wrapper">
                                    <Field
                                        type="checkbox"
                                        name="coAnotherSourceOfIncome"
                                        label="Add another source of income"
                                        component="input"
                                        id="check"
                                    />
                                    {values && !values.coAnotherSourceOfIncome ? (
                                        <label>Add another source of income</label>
                                    ) : (
                                            <label>Remove source of income</label>
                                        )}
                                </div>
                                {(data && data.syncErrors) || (values && values.coAnotherSourceOfIncome) ? (
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
                        ) : values && values.coSourceOfIncome === "Retired" ? (
                            <div>
                                <div>
                                    <Field
                                        type="text"
                                        name="coMonthlyGrossIncome"
                                        label="Monthly Gross Income"
                                        normalize={normalizeAmount}
                                        format={formatAmount}
                                        component={renderField}
                                    />
                                </div>
                                <div className="checkbox-wrapper">
                                    <Field
                                        type="checkbox"
                                        name="coAnotherSourceOfIncome"
                                        label="Add another source of income"
                                        component="input"
                                        id="check"
                                    />
                                    {values && !values.coAnotherSourceOfIncome ? (
                                        <label>Add another source of income</label>
                                    ) : (
                                            <label>Remove source of income</label>
                                        )}
                                </div>
                                {(data && data.syncErrors) || (values && values.coAnotherSourceOfIncome) ? (
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
                        ) : values && values.coSourceOfIncome === "Other" ? (
                            <div>
                                <div>
                                    <div>
                                        <Field
                                            type="text"
                                            name="coDescription"
                                            label="Description"
                                            component={renderField}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            type="text"
                                            name="coMonthlyGrossIncome"
                                            label="Monthly Gross Income"
                                            normalize={normalizeAmount}
                                            format={formatAmount}
                                            component={renderField}
                                        />
                                    </div>
                                </div>
                                <div className="checkbox-wrapper">
                                    <Field
                                        type="checkbox"
                                        name="coAnotherSourceOfIncome"
                                        label="Add another source of income"
                                        component="input"
                                        id="check"
                                    />
                                    {values && !values.coAnotherSourceOfIncome ? (
                                        <label>Add another source of income</label>
                                    ) : (
                                            <label>Remove source of income</label>
                                        )}
                                </div>
                                {(data && data.syncErrors) || (values && values.coAnotherSourceOfIncome) ? (
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
            {values && values.coAnotherSourceOfIncome && (
                <CoBuyerEmploymentSecondary
                    setTermVisible={setTermVisible}
                    onSubmit={onSubmit}
                    setBuyerInfoVisible={setBuyerInfoVisible}
                />
            )}
            {values && values.coAnotherSourceOfIncomeSecondary && (
                <CoBuyerEmploymentTertiary
                    setTermVisible={setTermVisible}
                    onSubmit={onSubmit}
                    setBuyerInfoVisible={setBuyerInfoVisible}
                />
            )}
        </div>
    );
};

export default reduxForm({
    form: "buyer",
    destroyOnUnmount: false,
    validate: validateBuyer
})(CoBuyerEmployment);
