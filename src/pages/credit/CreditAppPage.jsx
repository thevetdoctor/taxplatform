import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, batch } from "react-redux";
import { reset } from "redux-form";
import queryString from "query-string";
import { Container, Icon, Segment, Loader } from "semantic-ui-react";

import { numbers } from "./CreditAppConstants";
import {
    bankDispatch,
    buyerDispatch,
    purchaseDispatch,
    employmentDispatch,
    residentialDispatch,
    personalDispatch,
    termDispatch
} from "./CreditAppReduxFormDispatches";

import "../../styles/global.scss";
import "../../styles/credit.scss";

import PersonalForm from "./components/mainComponents/personalForm/PersonalForm";
import PurchaseForm from "./components/mainComponents/purchaseForm/PurchaseForm";
import BankForm from "./components/mainComponents/bankForm/BankForm";
import ResidentialForm from "./components/mainComponents/residentialForm/ResidentialForm";
import EmploymentForm from "./components/mainComponents/employmentForm/EmploymentForm";
import BuyerForm from "./components/mainComponents/buyerForm/BuyerForm";
import TermForm from "./components/mainComponents/termForm/TermForm";

import { getApplicationData, getApplication } from "../../redux";
import Navigation from "../../components/Navbar";

const Credit = ({ location }) => {
    const state = useSelector((state) => state.app);
    const dispatch = useDispatch();

    const [purchaseVisible, setPurchaseVisible] = useState(true);
    const [personalVisible, setPersonalVisible] = useState(true);
    const [residentialVisible, setResidentialVisible] = useState(true);
    const [employmentVisible, setEmploymentVisible] = useState(true);
    const [bankInfoVisible, setBankInfoVisible] = useState(true);
    const [buyerInfoVisible, setBuyerInfoVisible] = useState(true);
    const [termInfo, setTermInfo] = useState(true);
    const [formTab, setFormTab] = useState(1);
    const [isPersonalVisited, setIsPersonalVisited] = useState(true);
    const [isResidentialVisited, setIsResidentialVisited] = useState(true);
    const [isBankVisited, setIsBankVisited] = useState(true);
    const [isBuyerVisited, setIsBuyerVisited] = useState(true);
    const [isEmploymentVisited, setIsEmploymentVisited] = useState(true);

    const nextStep = (e) => {
        setFormTab(formTab + 1);
    };

    const { id, tab } = queryString.parse(location.search);

    /*
    NOTE; Since id is always undefined this logic actually clears the form values
    on every render thereby making empty values to be submitted when the entire form is finally submitted.

    This logic which is required to clear the form has been moved to the "TERM FORM" component immediately after the
    form and its data have been submitted
    */
    // if (id === undefined) {
    //     // batch(() => {
    //     //     dispatch(reset("purchase"));
    //     //     dispatch(reset("personal"));
    //     //     dispatch(reset("employment"));
    //     //     dispatch(reset("buyer"));
    //     //     dispatch(reset("bank"));
    //     //     dispatch(reset("credit"));
    //     //     dispatch(reset("term"));
    //     // });
    // } else {
    //     /*
    //     I dont know what this is doing, but this logic never gets hit because id is always undefined
    //     */
    //     // TODO: Test
    //     const bankingFormData =
    //         state.application && state.application.banking_info ? state.application.banking_info : null;
    //     const buyerFormData =
    //         state.application && state.application.co_buyer_info ? state.application.co_buyer_info : null;
    //     const purchaseFormData =
    //         state.application && state.application.purchase_detail ? state.application.purchase_detail : null;
    //     const employmentFormData =
    //         state.application && state.application.employment_info ? state.application.employment_info : null;
    //     const residentialFormData =
    //         state.application && state.application.residential_info ? state.application.residential_info : null;
    //     const personalFormData =
    //         state.application && state.application.personal_info ? state.application.personal_info : null;
    //     const termFormData = state.application && state.application.terms ? state.application.terms : null;

    //     bankDispatch(bankingFormData, dispatch, batch);
    //     buyerDispatch(buyerFormData, dispatch, batch);
    //     purchaseDispatch(purchaseFormData, dispatch, batch);
    //     employmentDispatch(employmentFormData, dispatch, batch);
    //     residentialDispatch(residentialFormData, dispatch, batch);
    //     personalDispatch(personalFormData, dispatch, batch);
    //     termDispatch(termFormData, dispatch, batch);
    // }

    const url = window.location.href;
    const check = url.charAt(url.length - 1);
    const type = parseInt(check);
    const isEdit = numbers.includes(type) === false;

    useEffect(() => {
        if (tab === "cobuyer") {
            setFormTab(6);
            setIsBuyerVisited(true);
            window.scrollTo({
                left: 0,
                top: document.body.scrollHeight,
                behavior: "smooth"
            });
        }
    }, [tab]);

    useEffect(() => {
        if (isEdit) {
            dispatch(getApplication({}));
        } else {
            dispatch(getApplicationData(id));
        }
    }, [id, isEdit, dispatch]);

    return (
        <div>
            <div className="container">
                <Navigation />
                <div id="credit-page">
                    <Container textAlign="center">
                        <Segment className="credit-page">
                            {!state.isLoading ? (
                                <div>
                                    {/* Header */}
                                    <h4 id="green-bold-header" className="credit-page__header">
                                        Credit Application
                                    </h4>

                                    {/* Purchase Details */}
                                    <div className="box-with-shadow ">
                                        <div className="flex-space-between" id="green-bold-header">
                                            <h1 id="green-bold-header">PURCHASE DETAILS</h1>
                                            <div onClick={() => setPurchaseVisible(!purchaseVisible)}>
                                                {purchaseVisible ? (
                                                    <Icon name="angle up" />
                                                ) : (
                                                        <Icon name="angle down" />
                                                    )}
                                            </div>
                                        </div>
                                        {purchaseVisible === true || id ? (
                                            <PurchaseForm
                                                id={id}
                                                formData={state.application && state.application.purchase_detail}
                                                onSubmit={nextStep}
                                                setPersonalVisible={setPersonalVisible}
                                                setPurchaseVisible={setPurchaseVisible}
                                            />
                                        ) : null}
                                    </div>

                                    {/* Personal Information */}
                                    <div className="box-with-shadow">
                                        <div className="flex-space-between" id="green-bold-header">
                                            <div>
                                                <h1 id="green-bold-header"> PERSONAL INFORMATION</h1>
                                            </div>
                                            {formTab !== 2 && isPersonalVisited === false ? (
                                                <div>
                                                    <Icon disabled name="angle down" />
                                                </div>
                                            ) : (
                                                    <div onClick={() => setPersonalVisible(!personalVisible)}>
                                                        {personalVisible ? (
                                                            <Icon name="angle up" />
                                                        ) : (
                                                                <Icon name="angle down" />
                                                            )}
                                                    </div>
                                                )}
                                        </div>
                                        {personalVisible === true || id ? (
                                            <PersonalForm
                                                id={id}
                                                formData={state.application && state.application.personal_info}
                                                setIsPersonalVisited={setIsPersonalVisited}
                                                onSubmit={nextStep}
                                                setResidentialVisible={setPersonalVisible}
                                                setPersonalVisible={setPersonalVisible}
                                            />
                                        ) : (
                                                ""
                                            )}
                                    </div>

                                    {/* Residential Information */}
                                    <div className="box-with-shadow">
                                        <div className="flex-space-between" id="green-bold-header">
                                            <div>
                                                <h1 id="green-bold-header">RESIDENTIAL INFORMATION</h1>
                                            </div>
                                            {formTab !== 3 && isResidentialVisited === false ? (
                                                <div>
                                                    <Icon disabled name="angle down" />
                                                </div>
                                            ) : (
                                                    <div onClick={() => setResidentialVisible(!residentialVisible)}>
                                                        {residentialVisible ? (
                                                            <Icon name="angle up" />
                                                        ) : (
                                                                <Icon name="angle down" />
                                                            )}
                                                    </div>
                                                )}
                                        </div>
                                        {formTab === 3 || residentialVisible || id ? (
                                            <ResidentialForm
                                                id={id}
                                                formData={state.application && state.application.residential_info}
                                                setIsResidentialVisited={setIsResidentialVisited}
                                                onSubmit={nextStep}
                                                setResidentialVisible={setResidentialVisible}
                                                setEmploymentVisible={setEmploymentVisible}
                                            />
                                        ) : (
                                                ""
                                            )}
                                    </div>

                                    {/* Employment Information */}
                                    <div className="box-with-shadow">
                                        <div className="flex-space-between" id="green-bold-header">
                                            <div>
                                                <h1 id="green-bold-header">EMPLOYMENT INFORMATION</h1>
                                            </div>
                                            {formTab !== 4 && isEmploymentVisited === false ? (
                                                <div>
                                                    <Icon disabled name="angle down" />
                                                </div>
                                            ) : (
                                                    <div onClick={() => setEmploymentVisible(!employmentVisible)}>
                                                        {employmentVisible ? (
                                                            <Icon name="angle up" />
                                                        ) : (
                                                                <Icon name="angle down" />
                                                            )}
                                                    </div>
                                                )}
                                        </div>
                                        {formTab === 4 || employmentVisible || id ? (
                                            <EmploymentForm
                                                id={id}
                                                formData={state.application && state.application.employment_info}
                                                setIsEmploymentVisited={setIsEmploymentVisited}
                                                onSubmit={nextStep}
                                                setEmploymentVisible={setEmploymentVisible}
                                                setBankInfoVisible={setBankInfoVisible}
                                            />
                                        ) : (
                                                ""
                                            )}
                                    </div>

                                    {/* Banking Information */}
                                    <div className="box-with-shadow">
                                        <div className="flex-space-between" id="green-bold-header">
                                            <div>
                                                <h1 id="green-bold-header">BANKING INFORMATION</h1>
                                            </div>
                                            {formTab !== 5 && isBankVisited === false ? (
                                                <div>
                                                    <Icon disabled name="angle down" />
                                                </div>
                                            ) : (
                                                    <div onClick={() => setBankInfoVisible(!bankInfoVisible)}>
                                                        {bankInfoVisible ? (
                                                            <Icon name="angle up" />
                                                        ) : (
                                                                <Icon name="angle down" />
                                                            )}
                                                    </div>
                                                )}
                                        </div>
                                        {formTab === 5 || bankInfoVisible || id ? (
                                            <BankForm
                                                id={id}
                                                formData={state.application && state.application.banking_info}
                                                setIsBankVisited={setIsBankVisited}
                                                visible={bankInfoVisible}
                                                onSubmit={nextStep}
                                                setBankInfoVisible={setBankInfoVisible}
                                                setBuyerInfoVisible={setBuyerInfoVisible}
                                            />
                                        ) : (
                                                ""
                                            )}
                                    </div>

                                    {/* Co-Buyer Information */}
                                    <div className="box-with-shadow">
                                        <div className="flex-space-between" id="green-bold-header">
                                            <div>
                                                <h1 id="green-bold-header">
                                                    CO-BUYER INFORMATION <br /> (OPTIONAL)
                                                </h1>
                                            </div>
                                            {formTab !== 6 && isBuyerVisited === false ? (
                                                <div>
                                                    <Icon disabled name="angle down" />
                                                </div>
                                            ) : (
                                                    <div onClick={() => setBuyerInfoVisible(!buyerInfoVisible)}>
                                                        {buyerInfoVisible ? (
                                                            <Icon name="angle up" />
                                                        ) : (
                                                                <Icon name="angle down" />
                                                            )}
                                                    </div>
                                                )}
                                        </div>
                                        {formTab === 6 || buyerInfoVisible || id ? (
                                            <BuyerForm
                                                id={id}
                                                formData={state.application && state.application.co_buyer_info}
                                                setIsBuyerVisited={setIsBuyerVisited}
                                                onSubmit={nextStep}
                                                setBuyerInfoVisible={setBuyerInfoVisible}
                                                setTermVisible={setTermInfo}
                                            />
                                        ) : (
                                                ""
                                            )}
                                    </div>

                                    {/* Terms and conditions */}
                                    <div className="box-with-shadow">
                                        <div className="flex-space-between" id="green-bold-header">
                                            <div>
                                                <h1 id="green-bold-header"> TERMS &amp; CONDITIONS</h1>
                                            </div>
                                            {formTab !== 7 ? (
                                                <div>
                                                    <Icon disabled name="angle down" />
                                                </div>
                                            ) : (
                                                    <div onClick={() => setTermInfo(!termInfo)}>
                                                        {termInfo ? <Icon name="angle up" /> : <Icon name="angle down" />}
                                                    </div>
                                                )}
                                        </div>
                                        {termInfo ? (
                                            <TermForm id={id} formData={state.application && state.application.terms} />
                                        ) : (
                                                ""
                                            )}
                                    </div>
                                </div>
                            ) : (
                                    <Loader className="loader-applications" active inline="centered" />
                                )}
                        </Segment>
                    </Container>
                </div>
            </div>
        </div>
    );
};

export default Credit;
