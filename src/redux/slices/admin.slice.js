import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  message: null,
  singleTruckReport: [],
  dashboardDetails: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // get single truck report
    getSingleTruckReportStart: (state) => {
      state.loading = true;
    },
    getSingleTruckReportSuccess: (state, action) => {
      state.loading = false;
      state.singleTruckReport = action.payload.data;
    },
    getSingleTruckReportFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get admin dashboard details
    getAdminDashboardDetailsStart: (state) => {
      state.loading = true;
    },
    getAdminDashboardDetailsSuccess: (state, action) => {
      state.loading = false;
      state.dashboardDetails = action.payload.data;
    },
    getAdminDashboardDetailsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // clear error and message
    clearAdminError: (state) => {
      state.error = null;
    },
    clearAdminMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  getSingleTruckReportStart,
  getSingleTruckReportSuccess,
  getSingleTruckReportFailure,
  getAdminDashboardDetailsStart,
  getAdminDashboardDetailsSuccess,
  getAdminDashboardDetailsFailure,
  clearAdminError,
  clearAdminMessage,
} = adminSlice.actions;
export default adminSlice;
