import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, batch } from "react-redux";
import { Field, reduxForm, change, reset } from "redux-form";
import { useHistory } from "react-router-dom";
import { Divider, Modal, Button } from "semantic-ui-react";
import dayjs from "dayjs";

import renderField from "../../subComponents/formFields/renderField";
import renderSelectField from "../../subComponents/formFields/renderSelectField";

import { termDispatch } from "../../../CreditAppReduxFormDispatches";
import { optionTerm } from "../../../CreditAppConstants";
import { validateTerm } from "../../../CreditAppUtils";

import { normalizeDob } from "../../../../../utils/Utils";
import Terms from "../../../../../components/Terms";
import { getAllApplicationData, updateApplication } from "../../../../../redux";

const TermForm = ({ formData, id }) => {
    const [openModal, setOpenModal] = useState(false);
    const data = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleCloseModal = () => setOpenModal(false);

    const { error, isAppLoading } = data.app;
    const { syncErrors } = data.form.term;

    useEffect(() => {
        termDispatch(formData, dispatch, batch);
    }, [dispatch, formData]);

    useEffect(() => {
        dispatch(change("term", "currentDate", dayjs(new Date()).format("MM/DD/YYYY")));
    }, [dispatch]);

    const history = useHistory();

    const submitData = (e) => {
        e.preventDefault();
        if (data) {
            const { purchase, employment, bank, buyer, term, personal, credit } = data.form;

            const submitData = {
                description: "Credit Application",
                purchase_detail: {
                    form: purchase && purchase.values ? purchase.values : null
                },
                personal_info: {
                    form: personal && personal.values ? personal.values : null
                },
                residential_info: {
                    form: credit && credit.values ? credit.values : null
                },
                employment_info: {
                    form: employment && employment.values ? employment.values : null
                },
                banking_info: {
                    form: bank && bank.values ? bank.values : null
                },
                co_buyer_info: {
                    form: buyer && buyer.values ? buyer.values : null
                },
                terms: {
                    form: term.values ? term.values : null
                }
            };

            //Why keep depending on id if it is undefined
            if (formData && id) {
                dispatch(updateApplication(submitData, id, history));
                batch(() => {
                    dispatch(reset("purchase"));
                    dispatch(reset("personal"));
                    dispatch(reset("employment"));
                    dispatch(reset("buyer"));
                    dispatch(reset("bank"));
                    dispatch(reset("credit"));
                    dispatch(reset("term"));
                });
            } else {
                dispatch(getAllApplicationData(submitData, history));
                batch(() => {
                    dispatch(reset("purchase"));
                    dispatch(reset("personal"));
                    dispatch(reset("employment"));
                    dispatch(reset("buyer"));
                    dispatch(reset("bank"));
                    dispatch(reset("credit"));
                    dispatch(reset("term"));
                });
            }
        }
    };

    return (
        <div>
            <form className="form">
                <h4>Please read before Signing.</h4>
                <div className="terms-and-conditions-details-wrapper">
                    <Terms />
                </div>
                <Divider />
                <div className="form-style">
                    <div>
                        <div>
                            <label>Authorized By</label>
                        </div>
                        <div>
                            <Field
                                type="text"
                                name="authorizedBy"
                                label="Authorized"
                                component={renderSelectField}
                                option={optionTerm}
                            />
                        </div>
                    </div>
                    <div>
                        <Field
                            type="text"
                            name="currentDate"
                            label="Current Date"
                            normalize={normalizeDob}
                            component={renderField}
                            value={new Date()}
                        />
                    </div>
                    <div>
                        <Field
                            type="text"
                            name="buyerSellerInitial"
                            label="Buyers Initials OR Sellers Initials"
                            component={renderField}
                            id="form-width"
                        />
                    </div>
                </div>
                {data && syncErrors ? (
                    ""
                ) : (
                    <div className="btn-big-green">
                        <div></div>
                        <div>
                            <button disabled={isAppLoading} onClick={submitData} className="btns">
                                {isAppLoading ? "Loading..." : formData && id ? "Update" : "Submit"}
                            </button>
                        </div>
                    </div>
                )}
            </form>
            <Modal size="mini" open={openModal} onClose={handleCloseModal}>
                <Modal.Header>{error ? "SOMETHING WENT WRONG!" : "SUCCESSFUL!"}</Modal.Header>
                <Modal.Content>
                    {error ? (
                        <p>{error}</p>
                    ) : formData && id ? (
                        <p>Form updated successfuly..</p>
                    ) : (
                        <p>Form submitted successfuly..</p>
                    )}
                </Modal.Content>
                <Modal.Actions>
                    <Button negative onClick={handleCloseModal}>
                        Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        </div>
    );
};

export default reduxForm({
    form: "term",
    destroyOnUnmount: false,
    validate: validateTerm
})(TermForm);
