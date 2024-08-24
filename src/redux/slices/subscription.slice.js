import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  message: null,
  sessionId: null,
  subscriptionList: [],
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    // Create Stripe Session
    // ----------------------
    createStripeSessionStart: (state) => {
      state.loading = true;
    },
    createStripeSessionSuccess: (state, action) => {
      state.loading = false;
      state.sessionId = action.payload.sessionId;
      state.message = action.payload.message;
    },
    createStripeSessionFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get subscription list
    // ----------------------
    getSubscriptionListStart: (state) => {
      state.loading = true;
    },
    getSubscriptionListSuccess: (state, action) => {
      state.loading = false;
      state.subscriptionList = action.payload.data;
    },
    getSubscriptionListFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // Clear messages and errors
    // -------------------------
    clearSubscriptionMessage: (state) => {
      state.message = null;
    },
    clearSubscriptionError: (state) => {
      state.error = null;
    },
  },
});

export const {
  createStripeSessionStart,
  createStripeSessionSuccess,
  createStripeSessionFailure,

  getSubscriptionListStart,
  getSubscriptionListSuccess,
  getSubscriptionListFailure,

  clearSubscriptionMessage,
  clearSubscriptionError,
} = subscriptionSlice.actions;
export default subscriptionSlice;
