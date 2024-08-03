import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    message: null,
    sessionId: null,
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
    clearSubscriptionMessage,
    clearSubscriptionError,
} = subscriptionSlice.actions;
export default subscriptionSlice;
