import { change } from "redux-form";

export const bankDispatch = (formData, dispatch, batch) => {
    if (formData && formData.form !== null && dispatch) {
        batch(() => {
            dispatch(change("bank", "checking", formData.form.checking));
            dispatch(change("bank", "plannedAutoPayMethod", formData.form.plannedAutoPayMethod));
            dispatch(change("bank", "savings", formData.form.savings));
            dispatch(change("bank", "debitCard", formData.form.debitCard));
            dispatch(change("bank", "creditCard", formData.form.creditCard));
        });
    }
};

export const buyerDispatch = (formData, dispatch, batch) => {
    if (formData && formData.form !== null && dispatch) {
        batch(() => {
            dispatch(change("buyer", "coFirstName", formData.form.coFirstName));
            dispatch(change("buyer", "coLastName", formData.form.coLastName));
            dispatch(change("buyer", "coMiddleName", formData.form.coMiddleName));
            dispatch(change("buyer", "coCity", formData.form.coCity));
            dispatch(change("buyer", "coState", formData.form.coState));
            dispatch(change("buyer", "coAddress", formData.form.coAddress));
            dispatch(change("buyer", "coAppSuite", formData.form.coAppSuite));
            dispatch(change("buyer", "coZipCode", formData.form.coZipCode));
            dispatch(change("buyer", "coEmail", formData.form.coEmail));
            dispatch(change("buyer", "coSocialSecurity", formData.form.coSocialSecurity));
            dispatch(change("buyer", "coConfirmSocialSecurity", formData.form.coConfirmSocialSecurity));
            dispatch(change("buyer", "coHomeNumber", formData.form.coHomeNumber));
            dispatch(change("buyer", "coMobileNumber", formData.form.coMobileNumber));
            dispatch(change("buyer", "coDateOfBirth", formData.form.coDateOfBirth));
            dispatch(change("buyer", "coConfirmEmail", formData.form.coConfirmEmail));
            dispatch(change("buyer", "coSuffix", formData.form.coSuffix));

            dispatch(change("buyer", "coBuyer", formData.form.coBuyer));
            dispatch(change("buyer", "coSourceOfIncome", formData.form.coSourceOfIncome));
            dispatch(change("buyer", "coSourceOfIncomeSecondary", formData.form.coSourceOfIncomeSecondary));
            dispatch(change("buyer", "coSourceOfIncomeTertiary", formData.form.coSourceOfIncomeTertiary));
            dispatch(change("buyer", "coMonthlyGrossIncome", formData.form.coMonthlyGrossIncome));
            dispatch(change("buyer", "coMonthlyGrossIncomeSecondary", formData.form.coMonthlyGrossIncomeSecondary));
            dispatch(change("buyer", "coMonthlyGrossIncomeTertiary", formData.form.coMonthlyGrossIncomeTertiary));
            dispatch(change("buyer", "description", formData.form.description));
            dispatch(change("buyer", "coDescriptionSecondary", formData.form.coDescriptionSecondary));
            dispatch(change("buyer", "coDescriptionTertiary", formData.form.coDescriptionTertiary));
            dispatch(change("buyer", "coEmployerName", formData.form.coEmployerName));
            dispatch(change("buyer", "coEmployerNameSecondary", formData.form.coEmployerNameSecondary));
            dispatch(change("buyer", "coEmployerNameTertiary", formData.form.coEmployerNameTertiary));
            dispatch(change("buyer", "jobTitle", formData.form.jobTitle));
            dispatch(change("buyer", "coJobTitleSecondary", formData.form.coJobTitleSecondary));
            dispatch(change("buyer", "coJobTitleTertiary", formData.form.coJobTitleTertiary));
            dispatch(change("buyer", "coTimeAtCurrentEmployer", formData.form.coTimeAtCurrentEmployer));
            dispatch(
                change("buyer", "coTimeAtCurrentEmployerSecondary", formData.form.coTimeAtCurrentEmployerSecondary)
            );
            dispatch(change("buyer", "coTimeAtCurrentEmployerTertiary", formData.form.coTimeAtCurrentEmployerTertiary));
            dispatch(change("buyer", "coAnotherSourceOfIncome", formData.form.coAnotherSourceOfIncome));
            dispatch(change("buyer", "coAnotherSourceOfIncomeTertiary", formData.form.coAnotherSourceOfIncomeTertiary));
            dispatch(
                change("buyer", "coAnothercoSourceOfIncomeSecondary", formData.form.coAnothercoSourceOfIncomeSecondary)
            );
        });
    }
};

export const employmentDispatch = (formData, dispatch, batch) => {
    if (formData && formData.form !== null && dispatch) {
        batch(() => {
            dispatch(change("employment", "sourceOfIncome", formData.form.sourceOfIncome));
            dispatch(change("employment", "sourceOfIncomeSecondary", formData.form.sourceOfIncomeSecondary));
            dispatch(change("employment", "sourceOfIncomeTertiary", formData.form.sourceOfIncomeTertiary));
            dispatch(change("employment", "monthlyGrossIncome", formData.form.monthlyGrossIncome));
            dispatch(change("employment", "monthlyGrossIncomeSecondary", formData.form.monthlyGrossIncomeSecondary));
            dispatch(change("employment", "monthlyGrossIncomeTertiary", formData.form.monthlyGrossIncomeTertiary));
            dispatch(change("employment", "description", formData.form.description));
            dispatch(change("employment", "descriptionSecondary", formData.form.descriptionSecondary));
            dispatch(change("employment", "descriptionTertiary", formData.form.descriptionTertiary));
            dispatch(change("employment", "employerName", formData.form.employerName));
            dispatch(change("employment", "employerNameSecondary", formData.form.employerNameSecondary));
            dispatch(change("employment", "employerNameTertiary", formData.form.employerNameTertiary));
            dispatch(change("employment", "jobTitle", formData.form.jobTitle));
            dispatch(change("employment", "jobTitleSecondary", formData.form.jobTitleSecondary));
            dispatch(change("employment", "jobTitleTertiary", formData.form.jobTitleTertiary));
            dispatch(change("employment", "timeAtCurrentEmployer", formData.form.timeAtCurrentEmployer));
            dispatch(
                change("employment", "timeAtCurrentEmployerSecondary", formData.form.timeAtCurrentEmployerSecondary)
            );
            dispatch(
                change("employment", "timeAtCurrentEmployerTertiary", formData.form.timeAtCurrentEmployerTertiary)
            );
            dispatch(change("employment", "anotherSourceOfIncome", formData.form.anotherSourceOfIncome));
            dispatch(
                change("employment", "anotherSourceOfIncomeTertiary", formData.form.anotherSourceOfIncomeTertiary)
            );
            dispatch(
                change("employment", "anotherSourceOfIncomeSecondary", formData.form.anotherSourceOfIncomeSecondary)
            );
        });
    }
};

export const personalDispatch = (formData, dispatch, batch) => {
    if (formData && formData.form !== null && dispatch) {
        batch(() => {
            dispatch(change("personal", "firstName", formData.form.firstName));
            dispatch(change("personal", "lastName", formData.form.lastName));
            dispatch(change("personal", "middleName", formData.form.middleName));
            dispatch(change("personal", "city", formData.form.city));
            dispatch(change("personal", "state", formData.form.state));
            dispatch(change("personal", "address", formData.form.address));
            dispatch(change("personal", "appSuite", formData.form.appSuite));
            dispatch(change("personal", "zipCode", formData.form.zipCode));
            dispatch(change("personal", "email", formData.form.email));
            dispatch(change("personal", "socialSecurity", formData.form.socialSecurity));
            dispatch(change("personal", "confirmSocialSecurity", formData.form.confirmSocialSecurity));
            dispatch(change("personal", "homeNumber", formData.form.homeNumber));
            dispatch(change("personal", "mobileNumber", formData.form.mobileNumber));
            dispatch(change("personal", "dateOfBirth", formData.form.dateOfBirth));
            dispatch(change("personal", "confirmEmail", formData.form.confirmEmail));
            dispatch(change("personal", "suffix", formData.form.suffix));
        });
    }
};

export const purchaseDispatch = (formData, dispatch, batch) => {
    console.log({ dispatch });
    if (formData && formData.form !== null && dispatch) {
        batch(() => {
            dispatch(change("purchase", "price", formData.form.price));
            dispatch(change("purchase", "numberOfmonthlyPayment", formData.form.numberOfmonthlyPayment));
            dispatch(change("purchase", "downPayment", formData.form.downPayment));
            dispatch(change("purchase", "unpaidBalance", formData.form.unpaidBalance));
            dispatch(change("purchase", "contractLocation", formData.form.contractLocation));
            dispatch(change("purchase", "cashOption", formData.form.cashOption));
            dispatch(change("purchase", "amountFinance", formData.form.amountFinance));
            dispatch(change("purchase", "apr", formData.form.apr));
            dispatch(change("purchase", "monthlyPayment", formData.form.monthlyPayment));
            dispatch(change("purchase", "firstPayment", formData.form.firstPayment));
            dispatch(change("purchase", "totalLoanAmount", formData.form.totalLoanAmount));
            dispatch(change("purchase", "financeCharge", formData.form.financeCharge));
            dispatch(change("purchase", "defferedFirstPayment", formData.form.defferedFirstPayment));
            dispatch(change("purchase", "cashPrice", formData.form.cashPrice));
        });
    }
};

export const residentialDispatch = (formData, dispatch, batch) => {
    if (formData && formData.form !== null && dispatch) {
        batch(() => {
            dispatch(change("credit", "housingType", formData.form.housingType));
            dispatch(change("credit", "residenceType", formData.form.residenceType));
            dispatch(change("credit", "monthlyHouseExpense", formData.form.monthlyHouseExpense));
            dispatch(change("credit", "timeAtCurrentAddressMonth", formData.form.timeAtCurrentAddressMonth));
            dispatch(change("credit", "timeAtCurrentAddressYear", formData.form.timeAtCurrentAddressYear));
            dispatch(change("credit", "anotherMailingAddress", formData.form.anotherMailingAddress));
            dispatch(change("credit", "cityTwo", formData.form.cityTwo));
            dispatch(change("credit", "stateTwo", formData.form.stateTwo));
            dispatch(change("credit", "addressTwo", formData.form.addressTwo));
            dispatch(change("credit", "appSuiteTwo", formData.form.appSuiteTwo));
            dispatch(change("credit", "zipCodeTwo", formData.form.zipCodeTwo));
        });
    }
};

export const termDispatch = (formData, dispatch, batch) => {
    if (formData && formData.form !== null && dispatch) {
        batch(() => {
            dispatch(change("term", "authorizedBy", formData.form.authorizedBy));
            dispatch(change("term", "currentDate", formData.form.currentDate));
            dispatch(change("term", "buyerSellerInitial", formData.form.buyerSellerInitial));
        });
    }
};
