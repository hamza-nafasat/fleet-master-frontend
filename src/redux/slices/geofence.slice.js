import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    error: null,
    message: null,
    geofences: [],
    geofence: null,
};

const geofenceSlice = createSlice({
    name: "geofence",
    initialState,
    reducers: {
        // add geofence
        // ------------
        addGeofenceStart: (state) => {
            state.loading = true;
        },
        addGeofenceSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        addGeofenceFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // get single geofence
        // ------------

        getSingleGeofenceStart: (state) => {
            state.loading = true;
        },
        getSingleGeofenceSuccess: (state, action) => {
            state.loading = false;
            state.geofence = action.payload.geoFence;
        },
        getSingleGeofenceFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // update geofence
        // ------------
        updateGeofenceStart: (state) => {
            state.loading = true;
        },
        updateGeofenceSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        updateGeofenceFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // delete geofence
        // ------------
        deleteGeofenceStart: (state) => {
            state.loading = true;
        },
        deleteGeofenceSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        deleteGeofenceFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // get all geofences
        // ------------
        getAllGeofencesStart: (state) => {
            state.loading = true;
        },
        getAllGeofencesSuccess: (state, action) => {
            state.loading = false;
            state.geofences = action.payload.geoFences;
        },

        getAllGeofencesFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // addTrucksAdnArea in geofence
        // ----------------------------
        addTrucksAndAreaStart: (state) => {
            state.loading = true;
        },
        addTrucksAndAreaSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        addTrucksAndAreaFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // remove truck from geofence
        // --------------------------
        removeTruckFromGeofenceStart: (state) => {
            state.loading = true;
        },
        removeTruckFromGeofenceSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        removeTruckFromGeofenceFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        // clear error and message
        // ------------------------
        clearGeofenceMessage: (state) => {
            state.message = null;
        },
        clearGeofenceError: (state) => {
            state.error = null;
        },
    },
});

export const {
    clearGeofenceMessage,
    clearGeofenceError,
    addGeofenceStart,
    addGeofenceSuccess,
    addGeofenceFailure,
    updateGeofenceStart,
    updateGeofenceSuccess,
    updateGeofenceFailure,
    deleteGeofenceStart,
    deleteGeofenceSuccess,
    deleteGeofenceFailure,
    getAllGeofencesStart,
    getAllGeofencesSuccess,
    getAllGeofencesFailure,
    addTrucksAndAreaStart,
    addTrucksAndAreaSuccess,
    addTrucksAndAreaFailure,
    getSingleGeofenceStart,
    getSingleGeofenceSuccess,
    getSingleGeofenceFailure,
    removeTruckFromGeofenceStart,
    removeTruckFromGeofenceSuccess,
    removeTruckFromGeofenceFailure,
} = geofenceSlice.actions;
export default geofenceSlice;
