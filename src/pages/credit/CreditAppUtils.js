export const validate = (values) => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = "Required";
    }
    if (!values.lastName) {
        errors.lastName = "Required";
    }
    if (!values.email) {
        errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }

    if (values.email !== values.confirmEmail) {
        errors.confirmEmail = "Email must match!";
    }

    if (!values.price) {
        errors.price = "Required";
    }
    if (!values.favoriteColor) {
        errors.favoriteColor = "Required";
    }
    return errors;
};

export const validateBank = (values) => {
    const errors = {};
    /*if (
      !values.checking ||
      !values.savings ||
      !values.creditCard ||
      !values.debitCard
    ) {
      errors.savings = "Required";
    }*/

    if (!values.plannedAutoPayMethod) {
        errors.plannedAutoPayMethod = "Required";
    }

    return errors;
};

export const validateBuyer = (values) => {
    const errors = {};
    if (!values.coBuyer) {
        errors.coBuyer = "Required";
    }

    if (values.coBuyer === "Yes" && !values.coFirstName) {
        errors.coFirstName = "Required";
    }
    if (values.coBuyer === "Yes" && !values.coMiddleName) {
        errors.coMiddleName = "Required";
    }
    if (values.coBuyer === "Yes" && !values.coLastName) {
        errors.coLastName = "Required";
    }
    // if (values.coBuyer === "Yes" && !values.coSuffix) {
    //   errors.coSuffix = "Required";
    // }
    if (values.coBuyer === "Yes" && !values.coAddress) {
        errors.coAddress = "Required";
    }
    // if (values.coBuyer === "Yes" && !values.coAppSuite) {
    //   errors.coAppSuite = "Required";
    // }

    if (values.coBuyer === "Yes" && !values.coCity) {
        errors.coCity = "Required";
    }
    if (values.coBuyer === "Yes" && !values.coZipCode) {
        errors.coZipCode = "Required";
    }
    if (values.coBuyer === "Yes" && !values.coState) {
        errors.coState = "Required";
    }
    if (values.coBuyer === "Yes" && !values.coMobileNumber) {
        errors.coMobileNumber = "Required";
    }

    if (values.coBuyer === "Yes" && !values.coEmail) {
        errors.coEmail = "Required";
    }

    if (values.coBuyer === "Yes" && values.coEmail !== values.coConfirmEmail) {
        errors.coConfirmEmail = "Email must match!";
    }

    if (values.coBuyer === "Yes" && !values.coHomeNumber) {
        errors.coHomeNumber = "Required";
    }
    if (values.coBuyer === "Yes" && !values.coDateOfBirth) {
        errors.coDateOfBirth = "Required";
    }
    if (values.coBuyer === "Yes" && !values.coSocialSecurity) {
        errors.coSocialSecurity = "Required";
    }
    if (values.coBuyer === "Yes" && !values.coConfirmSocialSecurity) {
        errors.coConfirmSocialSecurity = "Required";
    }

    if (values.coBuyer === "Yes" && values.coSocialSecurity !== values.coConfirmSocialSecurity) {
        errors.coConfirmSocialSecurity = "Security keys must match!";
    }

    if (values.coBuyer === "Yes" && !values.coSourceOfIncome) {
        errors.coSourceOfIncome = "Required";
    }

    if (
        values.coBuyer === "Yes" &&
        (values.coSourceOfIncome === "Self-employed" ||
            values.coSourceOfIncome === "Military" ||
            values.coSourceOfIncome === "Job") &&
        !values.coEmployerName
    ) {
        errors.coEmployerName = "Required";
    }

    if (
        values.coBuyer === "Yes" &&
        (values.coSourceOfIncome === "Self-employed" ||
            values.coSourceOfIncome === "Military" ||
            values.coSourceOfIncome === "Job") &&
        !values.coJobTitle
    ) {
        errors.coJobTitle = "Required";
    }

    if (
        values.coBuyer === "Yes" &&
        (values.coSourceOfIncome === "Self-employed" ||
            values.coSourceOfIncome === "Military" ||
            values.coSourceOfIncome === "Job") &&
        !values.coMonthlyGrossIncome
    ) {
        errors.coMonthlyGrossIncome = "Required";
    }

    if (
        values.coBuyer === "Yes" &&
        (values.coSourceOfIncome === "Self-employed" ||
            values.coSourceOfIncome === "Military" ||
            values.coSourceOfIncome === "Job") &&
        !values.coTimeAtCurrentEmployer
    ) {
        errors.coTimeAtCurrentEmployer = "Required";
    }

    if (values.coBuyer === "Yes" && values.coSourceOfIncome === "Retired" && !values.coMonthlyGrossIncome) {
        errors.coMonthlyGrossIncome = "Required";
    }

    if (values.coBuyer === "Yes" && values.coSourceOfIncome === "Other" && !values.coMonthlyGrossIncome) {
        errors.coMonthlyGrossIncome = "Required";
    }

    /////////////////////////////////////////////////////

    if (
        values.coBuyer === "Yes" &&
        (values.coSourceOfIncomeSecondary === "Self-employed" ||
            values.coSourceOfIncomeSecondary === "Military" ||
            values.coSourceOfIncomeSecondary === "Job") &&
        !values.coEmployerNameSecondary
    ) {
        errors.coEmployerNameSecondary = "Required";
    }

    if (
        values.coBuyer === "Yes" &&
        (values.coSourceOfIncomeSecondary === "Self-employed" ||
            values.coSourceOfIncomeSecondary === "Military" ||
            values.coSourceOfIncomeSecondary === "Job") &&
        !values.coJobTitleSecondary
    ) {
        errors.coJobTitleSecondary = "Required";
    }

    if (
        values.coBuyerSecondary === "Yes" &&
        (values.coSourceOfIncomeSecondary === "Self-employed" ||
            values.coSourceOfIncomeSecondary === "Military" ||
            values.coSourceOfIncomeSecondary === "Job") &&
        !values.coMonthlyGrossIncomeSecondary
    ) {
        errors.coMonthlyGrossIncomeSecondary = "Required";
    }

    if (
        values.coBuyer === "Yes" &&
        (values.coSourceOfIncomeSecondary === "Self-employed" ||
            values.coSourceOfIncomeSecondary === "Military" ||
            values.coSourceOfIncomeSecondary === "Job") &&
        !values.coTimeAtCurrentEmployerSecondary
    ) {
        errors.coTimeAtCurrentEmployerSecondary = "Required";
    }

    if (
        values.coBuyer === "Yes" &&
        values.coSourceOfIncomeSecondary === "Retired" &&
        !values.coMonthlyGrossIncomeSecondary
    ) {
        errors.coMonthlyGrossIncomeSecondary = "Required";
    }

    if (
        values.coBuyer === "Yes" &&
        values.coSourceOfIncomeSecondary === "Other" &&
        !values.coMonthlyGrossIncomeSecondary
    ) {
        errors.coMonthlyGrossIncomeSecondary = "Required";
    }

    /////////////////////////////////////////////////////

    if (
        values.coBuyer === "Yes" &&
        (values.coSourceOfIncomeTertiary === "Self-employed" ||
            values.coSourceOfIncomeTertiary === "Military" ||
            values.coSourceOfIncomeTertiary === "Job") &&
        !values.coEmployerNameTertiary
    ) {
        errors.coEmployerNameTertiary = "Required";
    }

    if (
        values.coBuyer === "Yes" &&
        (values.coSourceOfIncomeTertiary === "Self-employed" ||
            values.coSourceOfIncomeTertiary === "Military" ||
            values.coSourceOfIncomeTertiary === "Job") &&
        !values.coJobTitleTertiary
    ) {
        errors.coJobTitleTertiary = "Required";
    }

    if (
        values.coBuyerSecondary === "Yes" &&
        (values.coSourceOfIncomeTertiary === "Self-employed" ||
            values.coSourceOfIncomeTertiary === "Military" ||
            values.coSourceOfIncomeTertiary === "Job") &&
        !values.coMonthlyGrossIncomeTertiary
    ) {
        errors.coMonthlyGrossIncomeTertiary = "Required";
    }

    if (
        values.coBuyer === "Yes" &&
        (values.coSourceOfIncomeTertiary === "Self-employed" ||
            values.coSourceOfIncomeTertiary === "Military" ||
            values.coSourceOfIncomeTertiary === "Job") &&
        !values.coTimeAtCurrentEmployerTertiary
    ) {
        errors.coTimeAtCurrentEmployerTertiary = "Required";
    }

    if (
        values.coBuyer === "Yes" &&
        values.coSourceOfIncomeTertiary === "Retired" &&
        !values.coMonthlyGrossIncomeTertiary
    ) {
        errors.coMonthlyGrossIncomeTertiary = "Required";
    }

    if (
        values.coBuyer === "Yes" &&
        values.coSourceOfIncomeTertiary === "Other" &&
        !values.coMonthlyGrossIncomeTertiary
    ) {
        errors.coMonthlyGrossIncomeTertiary = "Required";
    }

    return errors;
};

export const validateEmployment = (values) => {
    const errors = {};
    if (!values.sourceOfIncome) {
        errors.sourceOfIncome = "Required";
    }
    if (
        (values.sourceOfIncome === "Self-employed" ||
            values.sourceOfIncome === "Military" ||
            values.sourceOfIncome === "Job") &&
        !values.employerName
    ) {
        errors.employerName = "Required";
    }
    if (
        (values.sourceOfIncome === "Self-employed" ||
            values.sourceOfIncome === "Military" ||
            values.sourceOfIncome === "Job") &&
        !values.jobTitle
    ) {
        errors.jobTitle = "Required";
    }
    if (
        (values.sourceOfIncome === "Self-employed" ||
            values.sourceOfIncome === "Military" ||
            values.sourceOfIncome === "Job") &&
        !values.monthlyGrossIncome
    ) {
        errors.monthlyGrossIncome = "Required";
    }
    if (
        (values.sourceOfIncome === "Self-employed" ||
            values.sourceOfIncome === "Military" ||
            values.sourceOfIncome === "Job") &&
        !values.timeAtCurrentEmployer
    ) {
        errors.timeAtCurrentEmployer = "Required";
    }

    if ((values.sourceOfIncome === "Other" || values.sourceOfIncome === "Retired") && !values.monthlyGrossIncome) {
        errors.monthlyGrossIncome = "Required";
    }

    //////////////////////////////////////////

    if (values.anotherSourceOfIncomeSecondary && !values.sourceOfIncomeSecondary) {
        errors.sourceOfIncomeSecondary = "Required";
    }
    if (
        (values.sourceOfIncomeSecondary === "Self-employed" ||
            values.sourceOfIncomeSecondary === "Military" ||
            values.sourceOfIncomeSecondary === "Job") &&
        !values.employerNameSecondary
    ) {
        errors.employerNameSecondary = "Required";
    }
    if (
        (values.sourceOfIncomeSecondary === "Self-employed" ||
            values.sourceOfIncomeSecondary === "Military" ||
            values.sourceOfIncomeSecondary === "Job") &&
        !values.jobTitleSecondary
    ) {
        errors.jobTitleSecondary = "Required";
    }
    if (
        (values.sourceOfIncomeSecondary === "Self-employed" ||
            values.sourceOfIncomeSecondary === "Military" ||
            values.sourceOfIncomeSecondary === "Job") &&
        !values.monthlyGrossIncomeSecondary
    ) {
        errors.monthlyGrossIncomeSecondary = "Required";
    }
    if (
        (values.sourceOfIncomeSecondary === "Self-employed" ||
            values.sourceOfIncomeSecondary === "Military" ||
            values.sourceOfIncomeSecondary === "Job") &&
        !values.timeAtCurrentEmployerSecondary
    ) {
        errors.timeAtCurrentEmployerSecondary = "Required";
    }

    if (
        (values.sourceOfIncomeSecondary === "Other" || values.sourceOfIncomeSecondary === "Retired") &&
        !values.monthlyGrossIncomeSecondary
    ) {
        errors.monthlyGrossIncomeSecondary = "Required";
    }

    /////////////////////////////////////////////////////

    if (values.anotherSourceOfIncomeTertiary && !values.sourceOfIncomeTertiary) {
        errors.sourceOfIncomeTertiary = "Required";
    }
    if (
        (values.sourceOfIncomeTertiary === "Self-employed" ||
            values.sourceOfIncomeTertiary === "Military" ||
            values.sourceOfIncomeTertiary === "Job") &&
        !values.employerNameTertiary
    ) {
        errors.employerNameTertiary = "Required";
    }

    if (
        (values.sourceOfIncomeTertiary === "Self-employed" ||
            values.sourceOfIncomeTertiary === "Military" ||
            values.sourceOfIncomeTertiary === "Job") &&
        !values.jobTitleTertiary
    ) {
        errors.jobTitleTertiary = "Required";
    }
    if (
        (values.sourceOfIncomeTertiary === "Self-employed" ||
            values.sourceOfIncomeTertiary === "Military" ||
            values.sourceOfIncomeTertiary === "Job") &&
        !values.monthlyGrossIncomeTertiary
    ) {
        errors.monthlyGrossIncomeTertiary = "Required";
    }
    if (
        (values.sourceOfIncomeTertiary === "Self-employed" ||
            values.sourceOfIncomeTertiary === "Military" ||
            values.sourceOfIncomeTertiary === "Job") &&
        !values.timeAtCurrentEmployerTertiary
    ) {
        errors.timeAtCurrentEmployerTertiary = "Required";
    }

    if (
        (values.sourceOfIncomeTertiary === "Other" || values.sourceOfIncomeTertiary === "Retired") &&
        !values.monthlyGrossIncomeTertiary
    ) {
        errors.monthlyGrossIncomeTertiary = "Required";
    }

    return errors;
};

export const validatePersonal = (values) => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = "Required";
    }
    if (!values.lastName) {
        errors.lastName = "Required";
    }
    if (!values.middleName) {
        errors.middleName = "Required";
    }
    if (!values.address) {
        errors.address = "Required";
    }
    if (!values.state) {
        errors.state = "Required";
    }
    if (!values.city) {
        errors.city = "Required";
    }
    if (!values.zipCode) {
        errors.zipCode = "Required";
    }
    // if (!values.homeNumber) {
    //   errors.homeNumber = "Required";
    // }
    if (!values.mobileNumber) {
        errors.mobileNumber = "Required";
    }

    if (!values.email) {
        errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }

    if (values.email !== values.confirmEmail) {
        errors.confirmEmail = "Email must match!";
    }

    if (!values.confirmEmail) {
        errors.confirmEmail = "Required";
    }
    if (!values.dateOfBirth) {
        errors.dateOfBirth = "Required";
    }
    if (!values.socialSecurity) {
        errors.socialSecurity = "Required";
    }
    if (!values.confirmSocialSecurity) {
        errors.confirmSocialSecurity = "Required";
    }

    if (values.socialSecurity !== values.confirmSocialSecurity) {
        errors.confirmSocialSecurity = "Security keys must match!";
    }

    return errors;
};

export const validatePurchase = (values) => {
    const errors = {};
    if (!values.numberOfmonthlyPayment) {
        errors.numberOfmonthlyPayment = "Required";
    }
    if (!values.downPayment) {
        errors.downPayment = "Required";
    }
    if (!values.price) {
        errors.price = "Required";
    }
    if (!values.unpaidBalance) {
        errors.unpaidBalance = "Required";
    }
    if (!values.contractLocation) {
        errors.contractLocation = "Required";
    }
    if (!values.cashOption) {
        errors.cashOption = "Required";
    }
    if (!values.defferedFirstPayment) {
        errors.defferedFirstPayment = "Required";
    }

    if (!values.financeCharge) {
        errors.financeCharge = "Required";
    }
    if (!values.apr) {
        errors.apr = "Required";
    }
    if (!values.totalLoanAmount) {
        errors.totalLoanAmount = "Required";
    }
    if (!values.monthlyPayment) {
        errors.monthlyPayment = "Required";
    }

    if (!values.firstPayment) {
        errors.firstPayment = "Required";
    }
    if (!values.cashPrice) {
        errors.cashPrice = "Required";
    }
    return errors;
};

export const validateResidential = (values) => {
    const errors = {};
    if (!values.housingType) {
        errors.housingType = "Required";
    }
    if (!values.residenceType) {
        errors.residenceType = "Required";
    }
    if (!values.monthlyHouseExpense) {
        errors.monthlyHouseExpense = "Required";
    }
    if (!values.timeAtCurrentAddressMonth) {
        errors.timeAtCurrentAddressMonth = "Required";
    }

    if (values.anotherMailingAddress === true && !values.addressTwo) {
        errors.addressTwo = "Required";
    }
    // if (values.anotherMailingAddress === true && !values.appSuiteTwo) {
    //   errors.appSuiteTwo = "Required";
    // }

    if (values.anotherMailingAddress === true && !values.cityTwo) {
        errors.suffix = "Required";
    }
    if (values.anotherMailingAddress === true && !values.cityTwo) {
        errors.zipCode = "Required";
    }
    if (values.anotherMailingAddress === true && !values.stateTwo) {
        errors.stateTwo = "Required";
    }
    if (values.anotherMailingAddress === true && !values.zipCodeTwo) {
        errors.zipCodeTwo = "Required";
    }

    return errors;
};

export const validateTerm = (values) => {
    const errors = {};
    if (!values.authorizedBy) {
        errors.authorizedBy = "Required";
    }
    if (!values.currentDate) {
        errors.currentDate = "Required";
    }
    return errors;
};
