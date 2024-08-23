import { customAxios } from "../../utils/customAxios";
import {
    deleteNotificationFailure,
    deleteNotificationStart,
    deleteNotificationSuccess,
    getAllNotificationsFailure,
    getAllNotificationsStart,
    getAllNotificationsSuccess,
    getNewNotificationsFailure,
    getNewNotificationsStart,
    getNewNotificationsSuccess,
    readAllNotificationsFailure,
    readAllNotificationsStart,
    readAllNotificationsSuccess,
    readNotificationFailure,
    readNotificationStart,
    readNotificationSuccess,
} from "../slices/notification.slice";

// get new notifications
// --------------------
const getNewNotificationsAction = () => async (dispatch) => {
    dispatch(getNewNotificationsStart());
    try {
        const response = await customAxios.get("/notification/new");
        console.log("get all notifications api response ", response);
        dispatch(getNewNotificationsSuccess(response.data));
    } catch (error) {
        console.log("get all notifications api error ", error);
        dispatch(
            getNewNotificationsFailure(error?.response?.data?.message || "Error while fetching notifications")
        );
    }
};

// get all notifications
const getAllNotificationsAction = () => async (dispatch) => {
    dispatch(getAllNotificationsStart());
    try {
        const response = await customAxios.get("/notification/all");
        console.log("get all notifications api response ", response);
        dispatch(getAllNotificationsSuccess(response.data));
    } catch (error) {
        console.log("get all notifications api error ", error);
        dispatch(
            getAllNotificationsFailure(error?.response?.data?.message || "Error while fetching notifications")
        );
    }
};

// read a notification
// -------------------
const readNotificationAction = (notificationId) => async (dispatch) => {
    try {
        dispatch(readNotificationStart());
        const response = await customAxios.patch(`/notification/read/${notificationId}`);
        console.log("read notification api response ", response);
        dispatch(readNotificationSuccess(response.data));
    } catch (error) {
        console.log("read notification api error ", error);
        dispatch(
            readNotificationFailure(error?.response?.data?.message || "Error while reading notification")
        );
    }
};

// read all notification
// --------------------
const readAllNotificationsAction = () => async (dispatch) => {
    try {
        dispatch(readAllNotificationsStart());
        const response = await customAxios.put("/notifications/read-all");
        console.log("read all notification api response ", response);
        dispatch(readAllNotificationsSuccess(response.data));
    } catch (error) {
        console.log("read all notification api error ", error);
        dispatch(
            readAllNotificationsFailure(
                error?.response?.data?.message || "Error while reading all notifications"
            )
        );
    }
};

// delete notification
// ------------------
const deleteNotificationAction = (notificationId) => async (dispatch) => {
    try {
        dispatch(deleteNotificationStart());
        const response = await customAxios.delete(`/notification/single/${notificationId}`);
        console.log("delete notification api response ", response);
        dispatch(deleteNotificationSuccess(response.data));
    } catch (error) {
        console.log("delete notification api error ", error);
        dispatch(
            deleteNotificationFailure(error?.response?.data?.message || "Error while deleting notification")
        );
    }
};

export {
    getAllNotificationsAction,
    readNotificationAction,
    readAllNotificationsAction,
    deleteNotificationAction,
    getNewNotificationsAction,
};
