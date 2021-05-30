import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { Field, reduxForm } from "redux-form";

import renderField from "../../subComponents/formFields/renderField";
import renderSelectField from "../../subComponents/formFields/renderSelectField";
import renderPasswordField from "../../subComponents/formFields/renderPasswordField";
import { validatePersonal } from "../../../CreditAppUtils";
import { personalDispatch } from "../../../CreditAppReduxFormDispatches";
import { USA_STATES, optionsSuffix } from "../../../CreditAppConstants";
import {
    normalizeDob,
    normalizePhone,
    formatSSN,
    normalizeSSN,
    normalizeZipCode,
    maxLenghth
} from "../../../../../utils/Utils";
import "../../../../../styles/form.scss";

const PersonalForm = ({ id, formData, onSubmit, setPersonalVisible, setResidentialVisible, setIsPersonalVisited }) => {
    const data = useSelector((state) => state.form.personal);

    const dispatch = useDispatch();

    const handleNext = (e) => {
        e.preventDefault();
        setResidentialVisible(true);
        onSubmit();
        setPersonalVisible(false);
        setIsPersonalVisited(true);
    };

    useEffect(() => {
        personalDispatch(formData, dispatch, batch);
    }, [dispatch, formData]);

  console.log(data, data.values, 'PERSONAL INFORMATION FORM')

    return (
        <div>
            <form onSubmit={null} className="form">
                <div className="form-style">
                    <div>
                        <Field
                            type="text"
                            name="firstName"
                            label="First Name"
                            component={renderField}
                            id="form-width"
                        />
                    </div>
                    <div>
                        <Field
                            type="text"
                            name="middleName"
                            label="Middle Name (Initial)"
                            component={renderField}
                            normalize={maxLenghth(1)}
                        />
                    </div>
                    <div>
                        <Field type="text" name="lastName" label="Last Name" component={renderField} />
                    </div>
                    <div>
                        <div>
                            <label>Suffix</label>
                        </div>
                        <div>
                            <Field
                                type="number"
                                name="suffix"
                                label="Suffix"
                                component={renderSelectField}
                                option={optionsSuffix}
                            />
                        </div>
                    </div>
                    <div>
                        <Field type="text" name="address" label="Address" component={renderField} id="suffix" />
                    </div>
                    <div>
                        <Field type="text" name="appSuite" label="App Suite" component={renderField} id="suffix" />
                    </div>
                    <div>
                        <Field type="text" name="city" label="City" component={renderField} id="suffix" />
                    </div>
                    <div>
                        <div>
                            <label>State</label>
                        </div>
                        <div>
                            <Field
                                type="number"
                                name="state"
                                label="State"
                                component={renderSelectField}
                                option={USA_STATES}
                            />
                        </div>
                    </div>
                    <div>
                        <Field
                            type="number"
                            name="zipCode"
                            label="Zip Code"
                            component={renderField}
                            normalize={normalizeZipCode}
                        />
                    </div>
                </div>
                <div className="form-style">
                    <div>
                        <Field
                            type="texr"
                            name="homeNumber"
                            label="Home Number"
                            component={renderField}
                            normalize={normalizePhone}
                            id="form-width"
                        />
                    </div>
                    <div>
                        <Field
                            type="text"
                            name="mobileNumber"
                            label="Mobile Number"
                            component={renderField}
                            normalize={normalizePhone}
                        />
                    </div>
                    <div>
                        <Field
                            name="dateOfBirth"
                            label="Birth Date"
                            component={renderField}
                            id="form-width"
                            placeholder="MM/DD/YYYY"
                            normalize={normalizeDob}
                        />
                    </div>
                </div>
                <div className="form-style">
                    <div>
                        <Field
                            type="text"
                            name="socialSecurity"
                            label="Social Security"
                            component={renderPasswordField}
                            normalize={normalizeSSN}
                            format={formatSSN}
                        />
                    </div>
                    <div>
                        <Field
                            type="text"
                            name="confirmSocialSecurity"
                            label="Confirm Social Security"
                            component={renderPasswordField}
                            normalize={normalizeSSN}
                            format={formatSSN}
                        />
                    </div>
                </div>
                <div className="form-style">
                    <div>
                        <Field type="text" name="email" label="Email Address" component={renderField} />
                    </div>
                    <div>
                        <Field type="text" name="confirmEmail" label="Confirm Email Address" component={renderField} />
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
    form: "personal",
    destroyOnUnmount: false,
    validate: validatePersonal
})(PersonalForm);
