import React from "react";
import { Field, reduxForm } from "redux-form";

import renderField from "../formFields/renderField";
import renderSelectField from "../formFields/renderSelectField";
import renderPasswordField from "../formFields/renderPasswordField";

import { validate } from "../../../CreditAppUtils";
import { USA_STATES, optionsSuffix } from "../../../CreditAppConstants";

import {
    formatSSN,
    normalizeSSN,
    normalizePhone,
    normalizeZipCode,
    normalizeDob,
    maxLenghth
} from "../../../../../utils/Utils";

import "../../../../../styles/form.scss";

const CoBuyerPersonal = () => {
    return (
        <div>
            <form onSubmit={null} className="form">
                <div className="form-style">
                    <div>
                        <Field
                            type="text"
                            name="coFirstName"
                            label="First Name"
                            component={renderField}
                            id="form-width"
                        />
                    </div>
                    <div>
                        <Field
                            type="text"
                            name="coMiddleName"
                            label="Middle Name"
                            component={renderField}
                            normalize={maxLenghth(1)}
                        />
                    </div>
                    <div>
                        <Field type="text" name="coLastName" label="Last Name" component={renderField} />
                    </div>
                    <div>
                        <div>
                            <label>Suffix</label>
                        </div>
                        <div>
                            <Field
                                type="number"
                                name="coSuffix"
                                label="Suffix"
                                component={renderSelectField}
                                option={optionsSuffix}
                            />
                        </div>
                    </div>
                    <div>
                        <Field type="text" name="coAddress" label="Address" component={renderField} id="suffix" />
                    </div>
                    <div>
                        <Field type="text" name="coAppSuite" label="App Suite" component={renderField} id="suffix" />
                    </div>
                    <div>
                        <Field type="text" name="coCity" label="City" component={renderField} id="suffix" />
                    </div>
                    <div>
                        <div>
                            <label>State</label>
                        </div>
                        <div>
                            <Field
                                type="number"
                                name="coState"
                                label="State"
                                component={renderSelectField}
                                option={USA_STATES}
                            />
                        </div>
                    </div>
                    <div>
                        <Field
                            type="number"
                            name="coZipCode"
                            label="Zip Code"
                            component={renderField}
                            normalize={normalizeZipCode}
                        />
                    </div>
                </div>
                <div className="form-style">
                    <div>
                        <Field
                            type="text"
                            name="coHomeNumber"
                            label="Home Number"
                            component={renderField}
                            normalize={normalizePhone}
                            id="form-width"
                        />
                    </div>
                    <div>
                        <Field
                            type="text"
                            name="coMobileNumber"
                            label="Mobile Number"
                            component={renderField}
                            normalize={normalizePhone}
                        />
                    </div>
                    <div>
                        <Field
                            name="coDateOfBirth"
                            label="Birth Date"
                            component={renderField}
                            normalize={normalizeDob}
                            id="form-width"
                            placeholder="MM/DD/YYYY"
                        />
                    </div>
                </div>
                <div className="form-style">
                    <div>
                        <Field
                            type="text"
                            name="coSocialSecurity"
                            label="Social Security"
                            component={renderPasswordField}
                            normalize={normalizeSSN}
                            format={formatSSN}
                        />
                    </div>
                    <div>
                        <Field
                            type="text"
                            name="coConfirmSocialSecurity"
                            label="Confirm Social Security"
                            component={renderPasswordField}
                            normalize={normalizeSSN}
                            format={formatSSN}
                        />
                    </div>
                </div>
                <div className="form-style">
                    <div>
                        <Field type="text" name="coEmail" label="Email Address" component={renderField} />
                    </div>
                    <div>
                        <Field
                            type="text"
                            name="coConfirmEmail"
                            label="Confirm Email Address"
                            component={renderField}
                        />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default reduxForm({
    form: "buyer",
    destroyOnUnmount: false,
    validate
})(CoBuyerPersonal);
