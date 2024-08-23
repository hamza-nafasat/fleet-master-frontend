import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    message: null,
    trucks: [],
    truck: null,
};

const truckSlice = createSlice({
    name: "truck",
    initialState,
    reducers: {
        // add Truck
        // -----------
        addTruckStart: (state) => {
            state.loading = true;
        },
        addTruckSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        addTruckFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // update Truck
        // -----------
        updateTruckStart: (state) => {
            state.loading = true;
        },
        updateTruckSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        updateTruckFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // delete Truck
        // -----------
        deleteTruckStart: (state) => {
            state.loading = true;
        },
        deleteTruckSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        deleteTruckFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // get single truck
        // -----------
        getSingleTruckStart: (state) => {
            state.loading = true;
        },
        getSingleTruckSuccess: (state, action) => {
            state.loading = false;
            state.truck = action.payload.truck;
        },
        getSingleTruckFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // get all trucks
        // -----------
        getAllTrucksStart: (state) => {
            state.loading = true;
        },
        getAllTrucksSuccess: (state, action) => {
            state.loading = false;
            state.trucks = action.payload.trucks;
        },
        getAllTrucksFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // attach device
        // ---------------
        attachDeviceToTruckStart: (state) => {
            state.loading = true;
        },
        attachDeviceToTruckSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        attachDeviceToTruckFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // detach device
        // ---------------
        detachDeviceFromTruckStart: (state) => {
            state.loading = true;
        },
        detachDeviceFromTruckSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        detachDeviceFromTruckFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // clear error and message
        // ------------------------
        clearTruckMessage: (state) => {
            state.message = null;
        },
        clearTruckError: (state) => {
            state.error = null;
        },
    },
});

export const {
    clearTruckMessage,
    clearTruckError,
    addTruckStart,
    addTruckSuccess,
    addTruckFailure,
    updateTruckStart,
    updateTruckSuccess,
    updateTruckFailure,
    deleteTruckStart,
    deleteTruckSuccess,
    deleteTruckFailure,
    getAllTrucksStart,
    getAllTrucksSuccess,
    getAllTrucksFailure,
    attachDeviceToTruckStart,
    attachDeviceToTruckSuccess,
    attachDeviceToTruckFailure,
    detachDeviceFromTruckStart,
    detachDeviceFromTruckSuccess,
    detachDeviceFromTruckFailure,
    getSingleTruckStart,
    getSingleTruckSuccess,
    getSingleTruckFailure,
} = truckSlice.actions;
export default truckSlice;
