import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  message: null,
  singleTruckReport: [],
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
  },
});

export const { getSingleTruckReportStart, getSingleTruckReportSuccess, getSingleTruckReportFailure } =
  adminSlice.actions;
export default adminSlice;
