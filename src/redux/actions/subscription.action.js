import { customAxios } from "../../utils/customAxios";
import {
  createStripeSessionFailure,
  createStripeSessionStart,
  createStripeSessionSuccess,
  getSubscriptionListFailure,
  getSubscriptionListStart,
  getSubscriptionListSuccess,
} from "../slices/subscription.slice";

const createSubscriptionAction = (plan) => async (dispatch) => {
  dispatch(createStripeSessionStart());
  try {
    const response = await customAxios.post("/subscription/create-session", { plan });
    // console.log("response data getted", response.data);
    dispatch(createStripeSessionSuccess(response.data));
    return response.data;
  } catch (error) {
    // console.log("create stripe session error", error);
    dispatch(createStripeSessionFailure(error?.response?.data?.message || "Error creating Stripe session"));
  }
};

const subscriptionListAction = () => async (dispatch) => {
  try {
    dispatch(getSubscriptionListStart());
    const response = await customAxios.get("/subscription/list");
    // console.log("subscription get all api response ", response);
    dispatch(getSubscriptionListSuccess(response.data));
  } catch (error) {
    // console.log(error);
    dispatch(
      getSubscriptionListFailure(
        error?.response?.data?.message || "Error ocurred while getting all subscriptions"
      )
    );
  }
};

export { createSubscriptionAction, subscriptionListAction };
