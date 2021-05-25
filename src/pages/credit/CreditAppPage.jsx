import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Icon, Segment, Loader } from "semantic-ui-react";
import queryString from "query-string";
import { numbers } from "./CreditAppConstants";
import PersonalForm from "./components/mainComponents/personalForm/PersonalForm";
import PurchaseForm from "./components/mainComponents/purchaseForm/PurchaseForm";
import BankForm from "./components/mainComponents/bankForm/BankForm";
import ResidentialForm from "./components/mainComponents/residentialForm/ResidentialForm";
import EmploymentForm from "./components/mainComponents/employmentForm/EmploymentForm";
import BuyerForm from "./components/mainComponents/buyerForm/BuyerForm";
import TermForm from "./components/mainComponents/termForm/TermForm";
import { getApplicationData, getApplication } from "../../redux";
import Navigation from "../../components/Navbar";
import Header from "./components/helperComponents/Header";
import "../../styles/global.scss";
import "../../styles/credit.scss";

const Credit = ({ location }) => {
  const state = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const [purchaseVisible, setPurchaseVisible] = useState(true);
  const [personalVisible, setPersonalVisible] = useState(false);
  const [residentialVisible, setResidentialVisible] = useState(false);
  const [employmentVisible, setEmploymentVisible] = useState(false);
  const [bankInfoVisible, setBankInfoVisible] = useState(false);
  const [buyerInfoVisible, setBuyerInfoVisible] = useState(false);
  const [termInfo, setTermInfo] = useState(false);
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
        behavior: "smooth",
      });
    }
  }, [tab]);

  useEffect(() => {
    isEdit ? dispatch(getApplication({})) : dispatch(getApplicationData(id));
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
                    <Header
                      title="PURCHASE DETAILS"
                      isAccessible={true}
                      isVisible={purchaseVisible}
                      clickFunc={() => {
                        setPurchaseVisible(!purchaseVisible);
                      }}
                    />
                    {(purchaseVisible === true || id) && (
                      <PurchaseForm
                        id={id}
                        formData={
                          state.application && state.application.purchase_detail
                        }
                        onSubmit={nextStep}
                        setPersonalVisible={setPersonalVisible}
                        setPurchaseVisible={setPurchaseVisible}
                      />
                    )}
                  </div>

                  {/* Personal Information */}
                  <div className="box-with-shadow">
                    <Header
                      title="PERSONAL INFORMATION"
                      isAccessible={
                        formTab !== 2 && isPersonalVisited === false
                      }
                      isVisible={personalVisible}
                      clickFunc={() => {
                        setPersonalVisible(!personalVisible);
                      }}
                    />
                    {(personalVisible === true || id) && (
                      <PersonalForm
                        id={id}
                        formData={
                          state.application && state.application.personal_info
                        }
                        setIsPersonalVisited={setIsPersonalVisited}
                        onSubmit={nextStep}
                        setResidentialVisible={setPersonalVisible}
                        setPersonalVisible={setPersonalVisible}
                      />
                    )}
                  </div>

                  {/* Residential Information */}
                  <div className="box-with-shadow">
                    <Header
                      title="RESIDENTIAL INFORMATION"
                      isAccessible={
                        formTab !== 3 && isResidentialVisited === false
                      }
                      isVisible={residentialVisible}
                      clickFunc={() => {
                        setResidentialVisible(!residentialVisible);
                      }}
                    />
                    {(formTab === 3 || residentialVisible || id) && (
                      <ResidentialForm
                        id={id}
                        formData={
                          state.application &&
                          state.application.residential_info
                        }
                        setIsResidentialVisited={setIsResidentialVisited}
                        onSubmit={nextStep}
                        setResidentialVisible={setResidentialVisible}
                        setEmploymentVisible={setEmploymentVisible}
                      />
                    )}
                  </div>

                  {/* Employment Information */}
                  <div className="box-with-shadow">
                    <Header
                      title="EMPLOYMENT INFORMATION"
                      isAccessible={
                        formTab !== 4 && isEmploymentVisited === false
                      }
                      isVisible={employmentVisible}
                      clickFunc={() => {
                        setEmploymentVisible(!employmentVisible);
                      }}
                    />
                    {(formTab === 4 || employmentVisible || id) && (
                      <EmploymentForm
                        id={id}
                        formData={
                          state.application && state.application.employment_info
                        }
                        setIsEmploymentVisited={setIsEmploymentVisited}
                        onSubmit={nextStep}
                        setEmploymentVisible={setEmploymentVisible}
                        setBankInfoVisible={setBankInfoVisible}
                      />
                    )}
                  </div>

                  {/* Banking Information */}
                  <div className="box-with-shadow">
                    <Header
                      title="BANKING INFORMATION"
                      isAccessible={formTab !== 5 && isBankVisited === false}
                      isVisible={bankInfoVisible}
                      clickFunc={() => {
                        setBankInfoVisible(!bankInfoVisible);
                      }}
                    />
                    {(formTab === 5 || bankInfoVisible || id) && (
                      <BankForm
                        id={id}
                        formData={
                          state.application && state.application.banking_info
                        }
                        setIsBankVisited={setIsBankVisited}
                        visible={bankInfoVisible}
                        onSubmit={nextStep}
                        setBankInfoVisible={setBankInfoVisible}
                        setBuyerInfoVisible={setBuyerInfoVisible}
                      />
                    )}
                  </div>

                  {/* Co-Buyer Information */}
                  <div className="box-with-shadow">
                    <Header
                      title="CO-BUYER INFORMATION (OPTIONAL)"
                      isAccessible={formTab !== 6 && isBuyerVisited === false}
                      isVisible={buyerInfoVisible}
                      clickFunc={() => {
                        setBuyerInfoVisible(!buyerInfoVisible);
                      }}
                    />
                    {(formTab === 6 || buyerInfoVisible || id) && (
                      <BuyerForm
                        id={id}
                        formData={
                          state.application && state.application.co_buyer_info
                        }
                        setIsBuyerVisited={setIsBuyerVisited}
                        onSubmit={nextStep}
                        setBuyerInfoVisible={setBuyerInfoVisible}
                        setTermVisible={setTermInfo}
                      />
                    )}
                  </div>

                  {/* Terms and conditions */}
                  <div className="box-with-shadow">
                    <Header
                      title="TERMS &amp; CONDITIONS"
                      isAccessible={formTab !== 7}
                      isVisible={termInfo}
                      clickFunc={() => {
                        setTermInfo(!termInfo);
                      }}
                    />
                    {termInfo && (
                      <TermForm
                        id={id}
                        formData={state.application && state.application.terms}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <Loader
                  className="loader-applications"
                  active
                  inline="centered"
                />
              )}
            </Segment>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default Credit;
