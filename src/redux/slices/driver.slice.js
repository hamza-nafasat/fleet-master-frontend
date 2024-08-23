import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    message: null,
    drivers: [],
};

const driverSlice = createSlice({
    name: "driver",
    initialState,
    reducers: {
        // add driver
        // ------------
        addDriverStart: (state) => {
            state.loading = true;
        },
        addDriverSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        addDriverFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // update driver
        // ------------
        updateDriverStart: (state) => {
            state.loading = true;
        },
        updateDriverSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        updateDriverFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // delete driver
        // ------------
        deleteDriverStart: (state) => {
            state.loading = true;
        },
        deleteDriverSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        deleteDriverFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // get all drivers
        // ------------
        getAllDriversStart: (state) => {
            state.loading = true;
        },
        getAllDriversSuccess: (state, action) => {
            state.loading = false;
            state.drivers = action.payload.drivers;
        },
        getAllDriversFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // clear error and message
        // ------------------------
        clearDriverMessage: (state) => {
            state.message = null;
        },
        clearDriverError: (state) => {
            state.error = null;
        },
    },
});

export const {
    addDriverStart,
    addDriverSuccess,
    addDriverFailure,
    updateDriverStart,
    updateDriverSuccess,
    updateDriverFailure,
    deleteDriverStart,
    deleteDriverSuccess,
    deleteDriverFailure,
    getAllDriversStart,
    getAllDriversSuccess,
    getAllDriversFailure,
    clearDriverMessage,
    clearDriverError,
} = driverSlice.actions;
export default driverSlice;
