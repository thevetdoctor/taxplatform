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

const CobuyerEmploymentTertiary = ({ onSubmit, setTermVisible, setBuyerInfoVisible }) => {
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
                                <label>Tertiary Source of Income</label>
                            </div>
                            <div>
                                <Field
                                    type="number"
                                    name="coSourceOfIncomeTertiary"
                                    label="Source"
                                    component={renderSelectField}
                                    option={optionSource}
                                />
                            </div>
                        </div>
                        <Divider />
                        {values &&
                        (values.coSourceOfIncomeTertiary === "Self-employed" ||
                            values.coSourceOfIncomeTertiary === "Military" ||
                            values.coSourceOfIncomeTertiary === "Job") ? (
                            <div>
                                <div className="form-style">
                                    <div>
                                        <Field
                                            type="text"
                                            name="coEmployerNameTertiary"
                                            label="Employer Name"
                                            component={renderField}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            type="text"
                                            name="coJobTitleTertiary"
                                            label="Job Title"
                                            component={renderField}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            type="text"
                                            name="coMonthlyGrossIncomeTertiary"
                                            label="Monthly Gross Income"
                                            normalize={normalizeAmount}
                                            format={formatAmount}
                                            component={renderField}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            type="text"
                                            name="coTimeAtCurrentEmployerTertiary"
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
                        ) : values && values.coSourceOfIncomeTertiary === "Retired" ? (
                            <div>
                                <div>
                                    <Field
                                        type="text"
                                        name="coMonthlyGrossIncomeTertiary"
                                        label="Monthly Gross Income"
                                        normalize={normalizeAmount}
                                        format={formatAmount}
                                        component={renderField}
                                    />
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
                                            >
                                                Continue
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : values && values.coSourceOfIncomeTertiary === "Other" ? (
                            <div>
                                <div>
                                    <div>
                                        <Field
                                            type="text"
                                            name="coDescriptionTertiary"
                                            label="Description"
                                            component={renderField}
                                        />
                                    </div>
                                    <div>
                                        <Field
                                            type="text"
                                            name="coMonthlyGrossIncomeTertiary"
                                            label="Monthly Gross Income"
                                            normalize={normalizeAmount}
                                            format={formatAmount}
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
})(CobuyerEmploymentTertiary);
