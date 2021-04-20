import React from "react";
import TermPdf from "./TermPdf";
import { Grid } from "semantic-ui-react";
import { formatNumber } from "../utils/Utils";
import dayjs from "dayjs";

const PdfDisplay = React.forwardRef(({ userData }, ref) => {
    // console.log(userData, 'the data')
    return (
        <div id="pdf" className="outer" ref={ref}>
            <div className="pdf">
                <div className="pdf-content">
                    <div className="income-head">
                        <div>
                            <img src="/assets/logo.png" alt="Logo" />
                        </div>
                        <div>
                            <h1 className="h1">CREDIT APPLICATION</h1>
                        </div>
                    </div>
                </div>
                <div className="personal-information">
                    <h2 className="pdf-heads personal-information__title">PERSONAL INFORMATION</h2>
                    <div className="personal-information__content">
                        <div>
                            <h3>Customer Name</h3>
                            <strong>
                                {userData && userData.personal_info && userData.personal_info.form && (
                                    <span>
                                        {userData.personal_info.form.firstName}{" "}
                                        <span>{userData.personal_info.form.middleName}. </span>
                                        <span>{userData.personal_info.form.lastName}</span>
                                    </span>
                                )}
                            </strong>
                        </div>
                        <div>
                            <h3>Mobile Phone</h3>
                            <strong>
                                {userData &&
                                    userData.personal_info &&
                                    userData.personal_info.form &&
                                    userData.personal_info.form.mobileNumber}
                            </strong>
                        </div>
                        <div>
                            <h3>Social Security</h3>
                            <strong>*******</strong>
                        </div>
                    </div>
                    <div className="personal-information">
                        <h2 className="pdf-heads personal-information__title">PERSONAL INFORMATION</h2>
                        <div className="personal-information__content">
                            <div>
                                <h3>Customer Name</h3>
                                <strong>
                                    {userData && userData.personal_info && userData.personal_info.form && (
                                        <span>
                                            {userData.personal_info.form.firstName}{" "}
                                            <span>{userData.personal_info.form.middleName}. </span>
                                            <span>{userData.personal_info.form.lastName}</span>
                                        </span>
                                    )}
                                </strong>
                            </div>
                            <div>
                                <h3>Mobile Phone</h3>
                                <strong>
                                    {userData &&
                                        userData.personal_info &&
                                        userData.personal_info.form &&
                                        userData.personal_info.form.mobileNumber}
                                </strong>
                            </div>
                            <div>
                                <h3>Social Security</h3>
                                <strong>*******</strong>
                            </div>
                            <div>
                                <h3>Home Phone</h3>
                                <strong>
                                    {userData &&
                                        userData.personal_info &&
                                        userData.personal_info.form &&
                                        userData.personal_info.form.homeNumber}
                                </strong>
                            </div>
                            <div>
                                <h3>Birth Date</h3>
                                <strong>
                                    {userData &&
                                        userData.personal_info &&
                                        userData.personal_info.form &&
                                        userData.personal_info.form.dateOfBirth}
                                </strong>
                            </div>
                            <div>
                                <h3>Customer Email Address</h3>
                                <strong>
                                    {userData &&
                                        userData.personal_info &&
                                        userData.personal_info.form &&
                                        userData.personal_info.form.email}
                                </strong>
                            </div>
                            <div>
                                <h3>Address</h3>
                                <strong>
                                    {userData &&
                                        userData.personal_info &&
                                        userData.personal_info.form &&
                                        userData.personal_info.form.address}
                                </strong>
                            </div>

                            <div>
                                <h3>City of Residence</h3>
                                <strong>
                                    {userData &&
                                        userData.personal_info &&
                                        userData.personal_info.form &&
                                        userData.personal_info.form.city}
                                </strong>
                            </div>

                            <div>
                                <h3>Zip Code</h3>
                                <strong>
                                    {userData &&
                                        userData.personal_info &&
                                        userData.personal_info.form &&
                                        userData.personal_info.form.zipCode}
                                </strong>
                            </div>

                            <div>
                                <h3>App Suite, Etc </h3>
                                <strong>
                                    {userData &&
                                        userData.personal_info &&
                                        userData.personal_info.form &&
                                        userData.personal_info.form.appSuite}
                                </strong>
                            </div>

                            <div>
                                <h3>State of Residence</h3>
                                <strong>
                                    {userData &&
                                        userData.personal_info &&
                                        userData.personal_info.form &&
                                        userData.personal_info.form.state}
                                </strong>
                            </div>
                        </div>
                    </div>

                    <div className="residence-information">
                        <h2 className="pdf-heads residence-information__title">RESIDENCE INFORMATION</h2>
                        <div className="residence-information__content">
                            <div>
                                <h3>Type of Housing</h3>
                                <strong>
                                    {userData &&
                                        userData.residential_info &&
                                        userData.residential_info.form &&
                                        userData.residential_info.form.housingType}
                                </strong>
                            </div>
                            <div>
                                <h3>Monthly House Expense</h3>
                                <strong>
                                    {userData &&
                                        userData.residential_info &&
                                        userData.residential_info.form &&
                                        userData.residential_info.form.monthlyHouseExpense}
                                </strong>
                            </div>
                            <div>
                                <h3>Months At Address</h3>
                                <strong>
                                    {userData &&
                                        userData.residential_info &&
                                        userData.residential_info.form &&
                                        userData.residential_info.form.timeAtCurrentAddress}
                                </strong>
                            </div>

                            <div>
                                <h3>Type of Residence</h3>
                                <strong>
                                    {userData &&
                                        userData.residential_info &&
                                        userData.residential_info.form &&
                                        userData.residential_info.form.residenceType}
                                </strong>
                            </div>
                            <div>
                                <h3>Year At Address</h3>
                                <strong>
                                    {userData &&
                                        userData.residential_info &&
                                        userData.residential_info.form &&
                                        userData.residential_info.form.timeAtCurrentAddress}
                                </strong>
                            </div>
                        </div>
                    </div>

                    <div className="employment-information">
                        <h2 className="pdf-heads employment-information__title">EMPLOYMENT INFORMATION</h2>

                        <div className="employment-information__content">
                            <div>
                                <h3>Income Source</h3>
                                <strong>
                                    {userData &&
                                        userData.employment_info &&
                                        userData.employment_info.form &&
                                        userData.employment_info.form.sourceOfIncome}
                                </strong>
                            </div>
                            <div>
                                <h3>Description</h3>
                                <strong>Description...</strong>
                            </div>
                            <div>
                                <h3>Monthly Gross Income</h3>
                                <strong>
                                    {userData &&
                                        userData.employment_info &&
                                        userData.employment_info.form &&
                                        userData.employment_info.form.monthlyGrossIncome}
                                </strong>
                            </div>
                            <div>
                                <h3>Years at Current Employer</h3>
                                <strong>
                                    {userData &&
                                        userData.employment_info &&
                                        userData.employment_info.form &&
                                        userData.employment_info.form.yearAtCurrentEmployer &&
                                        userData.employment_info.form.yearAtCurrentEmployer}
                                </strong>
                            </div>
                            <div>
                                <h3>Months at Current Employer</h3>
                                <strong>
                                    {userData &&
                                        userData.employment_info &&
                                        userData.employment_info.form &&
                                        userData.employment_info.form.monthAtCurrentEmployer &&
                                        userData.employment_info.form.monthAtCurrentEmployer}
                                </strong>
                            </div>

                            <div>
                                <h3>Employer Name</h3>
                                <strong>
                                    {userData &&
                                        userData.employment_info &&
                                        userData.employment_info.form &&
                                        userData.employment_info.form.employerName &&
                                        userData.employment_info.form.employerName}
                                </strong>
                            </div>
                            <div>
                                <h3>Job Title</h3>
                                <strong>
                                    {userData &&
                                        userData.employment_info &&
                                        userData.employment_info.form &&
                                        userData.employment_info.form.jobTitle &&
                                        userData.employment_info.form.jobTitle}
                                </strong>
                            </div>
                            <div>
                                <h3>Years at Previous Employer</h3>
                                <strong>
                                    {userData &&
                                        userData.employment_info &&
                                        userData.employment_info.form &&
                                        userData.employment_info.form.yearAtPreviousEmployer &&
                                        userData.employment_info.form.yearAtPreviousEmployer}
                                </strong>
                            </div>
                            <div>
                                <h3>Months at Previous Employer</h3>
                                <strong>
                                    {userData &&
                                        userData.employment_info &&
                                        userData.employment_info.form &&
                                        userData.employment_info.form.monthAtPreviousEmployer &&
                                        userData.employment_info.form.monthAtPreviousEmployer}
                                </strong>
                            </div>
                        </div>
                    </div>

                    <div className="banking-information">
                        <h2 className="pdf-heads banking-information__title">BANKING INFORMATION</h2>
                        <div className="banking-information__content">
                            <div>
                                <h3>Has Checking Account</h3>
                                <strong>
                                    {" "}
                                    {userData &&
                                    userData.banking_info &&
                                    userData.banking_info.form &&
                                    userData.banking_info.form.checking &&
                                    userData.banking_info.form.checking
                                        ? "True"
                                        : "False"}
                                </strong>
                            </div>
                            <div>
                                <h3>Has Debit/Credit Card</h3>
                                <strong>
                                    {userData &&
                                    userData.banking_info &&
                                    userData.banking_info.form &&
                                    (userData.banking_info.form.credit || userData.banking_info.form.debit) &&
                                    (userData.banking_info.form.credit || userData.banking_info.form.debit)
                                        ? "True"
                                        : "False"}
                                </strong>
                            </div>

                            <div>
                                <h3>Has Savings Account</h3>
                                <strong>
                                    {userData &&
                                    userData.banking_info &&
                                    userData.banking_info.form &&
                                    userData.banking_info.form.savings &&
                                    userData.banking_info.form.savings
                                        ? "True"
                                        : "False"}
                                </strong>
                            </div>
                        </div>
                    </div>

                    <div className="terms-and-conditions">
                        <h2 className="pdf-heads terms-and-conditions__title">TERMS & CONDITIONS</h2>
                        <TermPdf />

                        <div className="terms-and-conditions__footer">
                            <div>
                                <h3>Buyer Initials</h3>
                                <strong>
                                    {userData &&
                                        userData.banking_info &&
                                        userData.terms.form &&
                                        userData.terms.form.buyerSellerInitial}
                                </strong>
                            </div>
                            <div>
                                <h3>Seller Initials </h3>
                                <strong>
                                    {userData &&
                                        userData.banking_info &&
                                        userData.terms.form &&
                                        userData.terms.form.buyerSellerInitial}
                                </strong>
                            </div>

                            <div>
                                <h3>Co-Buyer Initials</h3>
                                <strong>
                                    {userData &&
                                        userData.banking_info &&
                                        userData.terms.form &&
                                        userData.terms.form.buyerSellerInitial}
                                </strong>
                            </div>
                            <div>
                                <h3>Application Submitted Date</h3>
                                <strong>
                                    {userData && dayjs(userData.createdAt).format("dddd, MMMM DD YYYY, hh:mm A")}
                                </strong>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

export default PdfDisplay;
