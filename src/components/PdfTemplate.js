import React from "react";
import dayjs from "dayjs";

import TermPdf from "./TermPdf";

const PdfTemplate = ({ userData }) => {
  console.log({ userData });
  return (
    <div className="wrap">
      <div className="pdf-template-wrapper">
        <header className="pdf-template-wrapper__header">
          <img src="/assets/logo.png" alt="Logo" />
          <h1>Credit Application</h1>
        </header>
        <main className="pdf-template-wrapper__content">
          {/* Personal Information */}
          <section className="section">
            <h2 className="section__title">Personal Information</h2>
            <div className="section__content">
              <div>
                <h3>Customer Name</h3>
                <p>
                  {" "}
                  {userData?.personal_info?.form?.firstName}{" "}
                  {userData?.personal_info?.form?.middleName}.
                  {userData?.personal_info?.form?.lastName}
                </p>
              </div>
              <div>
                <h3>Mobile Phone</h3>
                <p>{userData?.personal_info?.form?.mobileNumber}</p>
              </div>
              <div>
                <h3>Social Security</h3>
                <p>*****</p>
              </div>
            </div>
          </section>

          {/* Personal Information */}
          <section className="section">
            <h2 className="section__title">Personal Information</h2>
            <div className="section__content">
              <div>
                <h3>Customer Name</h3>
                <p>
                  {" "}
                  {userData?.personal_info?.form?.firstName}{" "}
                  {userData?.personal_info?.form?.middleName}.
                  {userData?.personal_info?.form?.lastName}
                </p>
              </div>
              <div>
                <h3>Mobile Phone</h3>
                <p>{userData?.personal_info?.form?.mobileNumber}</p>
              </div>
              <div>
                <h3>Social Security</h3>
                <p>*****</p>
              </div>
              <div>
                <h3>Home Phone</h3>
                <p>{userData?.personal_info?.form?.homeNumber || "None"}</p>
              </div>
              <div>
                <h3>Birth Date</h3>
                <p>{userData?.personal_info?.form?.dateOfBirth}</p>
              </div>
              <div>
                <h3>Customer Email Address</h3>
                <p>{userData?.personal_info?.form?.email}</p>
              </div>
              <div>
                <h3>Address</h3>
                <p>{userData?.personal_info?.form?.address}</p>
              </div>
              <div>
                <h3>City of Residence</h3>
                <p>{userData?.personal_info?.form?.city}</p>
              </div>

              <div>
                <h3>Zip Code</h3>
                <p>{userData?.personal_info?.form?.zipCode}</p>
              </div>

              <div>
                <h3>App Suite, Etc </h3>
                <p>{userData?.personal_info?.form?.appSuite}</p>
              </div>

              <div>
                <h3>State of Residence</h3>
                <p>{userData?.personal_info?.form?.state}</p>
              </div>
            </div>
          </section>

          {/* Residence Information */}
          <section className="section">
            <h2 className="section__title">Residence Information</h2>
            <div className="section__content">
              <div>
                <h3>Type of Housing</h3>
                <p>{userData?.residential_info?.form?.housingType}</p>
              </div>
              <div>
                <h3>Monthly House Expense</h3>
                <p>{userData?.residential_info?.form?.monthlyHouseExpense}</p>
              </div>
              <div>
                <h3>Months At Address</h3>
                <p>{userData?.residential_info?.form?.timeAtCurrentAddress}</p>
              </div>

              <div>
                <h3>Type of Residence</h3>
                <p>{userData?.residential_info?.form?.residenceType}</p>
              </div>
              <div>
                <h3>Year At Address</h3>
                <p>{userData?.residential_info?.form?.timeAtCurrentAddress}</p>
              </div>
            </div>
          </section>

          {/* Employment Information */}
          <section className="section">
            <h2 className="section__title">Employment Information</h2>
            <div className="section__content">
              <div>
                <h3>Income Source</h3>
                <p>{userData?.employment_info?.form?.sourceOfIncome}</p>
              </div>
              <div>
                <h3>Description</h3>
                <p>Description...</p>
              </div>
              <div>
                <h3>Monthly Gross Income</h3>
                <p>{userData?.employment_info?.form?.monthlyGrossIncome}</p>
              </div>
              <div>
                <h3>Years at Current Employer</h3>
                <p>{userData?.employment_info?.form?.yearAtCurrentEmployer}</p>
              </div>
              <div>
                <h3>Months at Current Employer</h3>
                <p>{userData?.employment_info?.form?.monthAtCurrentEmployer}</p>
              </div>

              <div>
                <h3>Employer Name</h3>
                <p>{userData?.employment_info?.form?.employerName}</p>
              </div>
              <div>
                <h3>Job Title</h3>
                <p>{userData?.employment_info?.form?.jobTitle}</p>
              </div>
              <div>
                <h3>Years at Previous Employer</h3>
                <p>{userData?.employment_info?.form?.yearAtPreviousEmployer}</p>
              </div>
              <div>
                <h3>Months at Previous Employer</h3>
                <p>
                  {userData?.employment_info?.form?.monthAtPreviousEmployer}
                </p>
              </div>
            </div>
          </section>

          {/* Banking Information */}
          <section className="section">
            <h2 className="section__title">Banking Information</h2>
            <div className="section__content">
              <div>
                <h3>Has Checking Account</h3>
                <p>
                  {" "}
                  {userData?.banking_info?.form?.checking ? "True" : "False"}
                </p>
              </div>
              <div>
                <h3>Has Debit/Credit Card</h3>
                <p>
                  {userData?.banking_info?.form?.credit ||
                  userData?.banking_info?.form?.debit
                    ? "True"
                    : "False"}
                </p>
              </div>

              <div>
                <h3>Has Savings Account</h3>
                <p>
                  {userData?.banking_info?.form?.savings ? "True" : "False"}
                </p>
              </div>
            </div>
          </section>

          {/* Terms and Conditions */}
          <section className="terms-wrapper">
            <h2 className="terms-wrapper__title">Terms and Conditions</h2>
            <TermPdf />
            <div className="terms-wrapper__footer">
              <div>
                <h3>Buyer Initials</h3>
                {userData?.terms?.form.authorizedBy === "Buyer" && (
                  <p>{userData?.terms?.form.buyerSellerInitial}</p>
                )}
              </div>
              <div>
                <h3>Seller Initials</h3>
                {userData?.terms?.form.authorizedBy === "Seller" && (
                  <p>{userData?.terms?.form.buyerSellerInitial}</p>
                )}
              </div>

              {userData?.co_buyer_info?.form.coBuyer === "Yes" && (
                <div>
                  <h3>Co-Buyer Initials</h3>
                  <p></p>
                </div>
              )}
              <div>
                <h3>Application Submitted Date</h3>
                <p>
                  {userData &&
                    dayjs(userData.createdAt).format(
                      "dddd, MMMM DD YYYY, hh:mm A"
                    )}
                </p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default PdfTemplate;
