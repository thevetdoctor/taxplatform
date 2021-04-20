import React, { useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { Field, reduxForm } from "redux-form";
import { Divider } from "semantic-ui-react";

import renderSelectField from "../../subComponents/formFields/renderSelectField";
import { optionCoBuyer } from "../../../CreditAppConstants";
import { buyerDispatch } from "../../../CreditAppReduxFormDispatches";

import CoBuyerPersonal from "../../subComponents/coBuyer/CoBuyerPersonal";
import CoBuyerEmployment from "../../subComponents/coBuyer/CoBuyerEmployment";
import { validateBuyer } from "../../../CreditAppUtils";

const BuyerForm = ({ id, formData, onSubmit, setBuyerInfoVisible, setTermVisible, setIsBuyerVisited }) => {
    const data = useSelector((state) => state.form.buyer);
    const dispatch = useDispatch();

    const handleNext = (e) => {
        e.preventDefault();
        setBuyerInfoVisible(false);
        setTermVisible(true);
        setIsBuyerVisited(true);
    };

    useEffect(() => {
        buyerDispatch(formData, dispatch, batch);
    }, [dispatch, formData]);

    console.log(data, data.values, 'HELLO')

    return (
        <div>
            <form onSubmit={onSubmit} className="form buyer-form">
                <div className="form-style">
                    <div>
                        <label>If married, you may apply for a separate account.</label>
                    </div>
                </div>
                <div className="form-style">
                    <div>
                        <Field
                            type="text"
                            name="coBuyer"
                            label="Co Buyer"
                            option={optionCoBuyer}
                            component={renderSelectField}
                        />
                    </div>
                </div>
                <div></div>
                {data && data.values && data.values.coBuyer === "Yes" && (
                    <div>
                        <h3>CO-BUYER PERSONAL INFO</h3>
                        <Divider />
                        <CoBuyerPersonal />
                        <br />
                        <h3>CO-BUYER EMPLOYMENT INFO</h3>
                        <Divider />
                        <CoBuyerEmployment
                            setTermVisible={setTermVisible}
                            onSubmit={onSubmit}
                            setBuyerInfoVisible={setBuyerInfoVisible}
                        />
                    </div>
                )}

                {data?.values?.coBuyer && (
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
    form: "buyer",
    destroyOnUnmount: false,
    validate: validateBuyer
})(BuyerForm);
