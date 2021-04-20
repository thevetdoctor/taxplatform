import {
    getAllApplication,
    setApplicationLoading,
} from "../index";
import axios from "axios";
import { BILLING_URL } from "../../utils/Constants";
import { setTransactionHistory, setActiveSubscriptions } from "../slices/billing";

export const getBillingTransactionHistory = (applicationId) => async (dispatch) => {
    dispatch(setApplicationLoading(true));
    console.log("getBillingTransactionHistory")
    try {
        const res = await axios.get(`${BILLING_URL}/charge/${applicationId}`);
        if (res) {
            console.log({res})
            dispatch(setTransactionHistory(res.data.data));
            dispatch(setApplicationLoading(false));
        }
    } catch (err) {
        console.log(err.response);
    }
};

export const getActiveStripeSubscriptions = () => async (dispatch) => {
    dispatch(setApplicationLoading(true));
    console.log("getActiveStripeSubscriptions")
    try {
        const res = await axios.get(`${BILLING_URL}/subscription?filter=active`);
        if (res) {
            console.log({res})
            dispatch(setActiveSubscriptions(res.data.data));
            dispatch(setApplicationLoading(false));
        }
    } catch (err) {
        console.log(err.response);
    }
}