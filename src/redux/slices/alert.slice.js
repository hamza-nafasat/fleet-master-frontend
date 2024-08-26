import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  message: null,
  alerts: [],
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    // create alert
    createAlertStart: (state) => {
      state.loading = true;
    },
    createAlertSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    createAlertFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // update alert
    updateAlertStart: (state) => {
      state.loading = true;
    },
    updateAlertSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateAlertFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // delete alert
    deleteAlertStart: (state) => {
      state.loading = true;
    },
    deleteAlertSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteAlertFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get all alerts
    getAllAlertsStart: (state) => {
      state.loading = true;
    },
    getAllAlertsSuccess: (state, action) => {
      state.loading = false;
      state.alerts = action.payload.data;
    },
    getAllAlertsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // clear error and message
    clearAlertError: (state) => {
      state.error = null;
    },
    clearAlertMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  createAlertStart,
  createAlertSuccess,
  createAlertFailure,

  updateAlertStart,
  updateAlertSuccess,
  updateAlertFailure,

  deleteAlertStart,
  deleteAlertSuccess,
  deleteAlertFailure,

  getAllAlertsStart,
  getAllAlertsSuccess,
  getAllAlertsFailure,

  clearAlertError,
  clearAlertMessage,
} = alertSlice.actions;
export default alertSlice;
