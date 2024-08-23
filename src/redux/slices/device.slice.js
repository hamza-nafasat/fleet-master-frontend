import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    message: null,
    devices: [],
    devicesData: {},
};

const deviceSlice = createSlice({
    name: "device",
    initialState,
    reducers: {
        // add device
        // ------------
        addDeviceStart: (state) => {
            state.loading = true;
        },
        addDeviceSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        addDeviceFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // update device
        // ------------
        updateDeviceStart: (state) => {
            state.loading = true;
        },
        updateDeviceSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        updateDeviceFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // delete device
        // ------------
        deleteDeviceStart: (state) => {
            state.loading = true;
        },
        deleteDeviceSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        deleteDeviceFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // get all devices
        // ------------
        getAllDevicesStart: (state) => {
            state.loading = true;
        },
        getAllDevicesSuccess: (state, action) => {
            state.loading = false;
            state.devices = action.payload.data;
        },
        getAllDevicesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // get device data
        // ------------
        getDeviceDataStart: (state) => {
            state.loading = true;
        },
        getDeviceDataSuccess: (state, action) => {
            state.loading = false;
            state.devicesData = action.payload;
        },
        getDeviceDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // clear error and message
        // ------------------------
        clearDeviceMessage: (state) => {
            state.message = null;
        },
        clearDeviceError: (state) => {
            state.error = null;
        },
    },
});

export const {
    clearDeviceMessage,
    clearDeviceError,
    addDeviceStart,
    addDeviceSuccess,
    addDeviceFailure,
    updateDeviceStart,
    updateDeviceSuccess,
    updateDeviceFailure,
    deleteDeviceStart,
    deleteDeviceSuccess,
    deleteDeviceFailure,
    getAllDevicesStart,
    getAllDevicesSuccess,
    getAllDevicesFailure,
    getDeviceDataStart,
    getDeviceDataSuccess,
    getDeviceDataFailure,
} = deviceSlice.actions;
export default deviceSlice;
