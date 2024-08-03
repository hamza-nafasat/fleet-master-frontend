import { customAxios } from "../../utils/customAxios";
import {
    createStripeSessionFailure,
    createStripeSessionStart,
    createStripeSessionSuccess,
} from "../slices/subscription.slice";

const createSubscriptionAction = (plan) => async (dispatch) => {
    dispatch(createStripeSessionStart());
    try {
        const response = await customAxios.post("/subscription/create-session", { plan });
        console.log("response data getted", response.data);
        dispatch(createStripeSessionSuccess(response.data));
        return response.data;
    } catch (error) {
        console.log("create stripe session error", error);
        dispatch(
            createStripeSessionFailure(error?.response?.data?.message || "Error creating Stripe session")
        );
    }
};

export { createSubscriptionAction };
