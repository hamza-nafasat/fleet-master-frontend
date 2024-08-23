import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newNotifications: [],
    notifications: [],
    loading: false,
    error: null,
    message: null,
};

const notificationSlice = createSlice({
    name: "notification",
    initialState,
    reducers: {
        // get new notifications
        // ------------------
        getNewNotificationsStart: (state) => {
            state.loading = true;
        },
        getNewNotificationsSuccess: (state, action) => {
            state.loading = false;
            state.newNotifications = action.payload.notifications;
        },
        getNewNotificationsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // get all notifications
        // ------------------
        getAllNotificationsStart: (state) => {
            state.loading = true;
        },
        getAllNotificationsSuccess: (state, action) => {
            state.loading = false;
            state.notifications = action.payload.notifications;
        },
        getAllNotificationsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // read notification
        // ------------------
        readNotificationStart: (state) => {
            state.loading = true;
        },
        readNotificationSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        readNotificationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // read all notifications
        // ------------------
        readAllNotificationsStart: (state) => {
            state.loading = true;
        },
        readAllNotificationsSuccess: (state) => {
            state.loading = false;
        },
        readAllNotificationsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // delete notification
        // ------------------
        deleteNotificationStart: (state) => {
            state.loading = true;
        },
        deleteNotificationSuccess: (state, action) => {
            state.loading = false;
            state.message = action.payload.message;
        },
        deleteNotificationFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // clear error and message
        // ------------------------
        clearNotificationMessage: (state) => {
            state.message = null;
        },
        clearNotificationError: (state) => {
            state.error = null;
        },
    },
});

export const {
    getAllNotificationsStart,
    getAllNotificationsSuccess,
    getAllNotificationsFailure,
    readNotificationStart,
    readNotificationSuccess,
    readNotificationFailure,
    readAllNotificationsStart,
    readAllNotificationsSuccess,
    readAllNotificationsFailure,
    deleteNotificationStart,
    deleteNotificationSuccess,
    deleteNotificationFailure,
    getNewNotificationsStart,
    getNewNotificationsSuccess,
    getNewNotificationsFailure,
    clearNotificationMessage,
    clearNotificationError,
} = notificationSlice.actions;
export default notificationSlice;
