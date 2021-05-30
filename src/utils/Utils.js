const moment = require("moment");

export const formatDate = (date) => {
  const dateObj = new Date(date);
  const momentObj = moment(dateObj);
  const formattedDate = momentObj.format("MM/DD/YYYY hh:mm:ss");
  return formattedDate;
};

export const formatSemanticUIDate = (date) => {
    const milliSecondFormat = Date.parse(date);
    const ISOFormat = new Date(milliSecondFormat).toISOString();
    const dateString = moment(milliSecondFormat).format("MM/DD/YYYY");
  return [ milliSecondFormat, ISOFormat, dateString ];
};

export const isEmail = (email) => {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (email.match(regEx)) return true;
    else return false;
};

export const formatNumber = (num) => {
    const str = parseInt(String(num));
    return "$" + str.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
};

export const normalizeSSN = (value) => {
    // Non Masked Normalization
    if (value) {
        value = value.replace(/\D/g, "");
        value = value.slice(0, 9);
        return value;
    }
    return value;
};

export const formatSSN = (value) => {
    if (value) {
        if (value.length <= 3) {
            value = value.slice(0, 3);
        } else if (value.length <= 5) {
            value = value.slice(0, 3) + "-" + value.slice(3, 5);
        } else {
            value = value.slice(0, 3) + "-" + value.slice(3, 5) + "-" + value.slice(5, 9);
        }
        return value;
    }
    return "";
};

export const normalizeZipCode = (value) => {
    if (value) {
        value = value.replace(/\D/g, "");
        value = value.slice(0, 5);
        return value;
    }
    return value;
};

export const normalizeDob = (val, prevVal) => {
    if (isNaN(parseInt(val[val.length - 1], 10))) {
        return val.slice(0, -1);
    }

    if (prevVal && prevVal.length >= val.length) {
        return val;
    }

    if (val.length === 2 || val.length === 5) {
        val += "/";
    }

    if (val.length >= 10) {
        return val.slice(0, 10);
    }

    return val;
};

export const normalizePhone = (value) => {
    if (!value) {
        return value;
    }

    const onlyNums = value.replace(/[^\d]/g, "");
    if (onlyNums.length <= 3) {
        return onlyNums;
    }
    if (onlyNums.length <= 7) {
        return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    }
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(6, 10)}`;
};

export const formatAmount = (input) => {
    if (!input) return;

    if (isNaN(parseInt(input[input.length - 1], 10))) {
        return input.slice(0, -1);
    }

    return input.replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const maxLenghth = (max) => (value) => {
    let v;
    let result = value.length > max;

    if (result === false) {
        v = value;
    }
    return v;
};

export const normalizeAmount = (value) => {
    return "$" + value.replace(/[^\d]/g, "");
};

export const normalizePerct = (value) => {
    if (!value) {
        return value;
    }

    // const onlyNums = value.replace(/[^\d]/g, "");
    const onlyNums = value.replace(/[^\d*\.?\d*]$/g, "");

    return onlyNums;
};

export const normalizeTry = (value) => {
    if (!value) {
        return value;
    }

    return value.slice(1, 3) + ".00";
};

export const getFilterNumber = (filter) => {
    switch (filter) {
        case "rejected":
            return -1;
        case "pending":
            return 0;
        case "approved":
            return 1;
        case "signed":
            return 2;
        case "completed":
            return 3;
    }
};

export const validateLogin = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = "Required";
    }
    if (!values.password) {
        errors.password = "Required";
    }

    return errors;
};

export const validateRegister = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = "Required";
    }
    if (!values.email) {
        errors.email = "Required";
    }
    if (!values.phone) {
        errors.phone = "Required";
    }
    if (!values.password) {
        errors.password = "Required";
    }
    if (!values.confirmPassword) {
        errors.confirmPassword = "Required";
    }

    return errors;
};
