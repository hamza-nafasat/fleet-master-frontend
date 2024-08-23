import { customAxios, customFormAxios } from "../../utils/customAxios";
import {
    addDriverFailure,
    addDriverStart,
    addDriverSuccess,
    deleteDriverFailure,
    deleteDriverStart,
    deleteDriverSuccess,
    getAllDriversFailure,
    getAllDriversStart,
    getAllDriversSuccess,
    updateDriverFailure,
    updateDriverStart,
    updateDriverSuccess,
} from "../slices/driver.slice";

// add new driver
// --------------
const addDriverAction = (formData) => async (dispatch) => {
    dispatch(addDriverStart());
    try {
        const res = await customFormAxios.post(`/driver/create`, formData);
        // console.log("add driver success", res);
        dispatch(addDriverSuccess(res.data));
    } catch (error) {
        // console.log("add driver error", error);
        dispatch(
            addDriverFailure(error?.response?.data?.message || "Something went wrong while adding driver")
        );
    }
};

// update driver
// -------------
const updateDriverAction = (driverId, formData) => async (dispatch) => {
    dispatch(updateDriverStart());
    try {
        const res = await customFormAxios.put(`/driver/single/${driverId}`, formData);
        // console.log("update driver success", res);
        dispatch(updateDriverSuccess(res.data));
    } catch (error) {
        // console.log("update driver error", error);
        dispatch(
            updateDriverFailure(
                error?.response?.data?.message || "Something went wrong while updating driver"
            )
        );
    }
};

// delete driver
// -------------
const deleteDriverAction = (driverId) => async (dispatch) => {
    dispatch(deleteDriverStart());
    try {
        const res = await customAxios.delete(`/driver/single/${driverId}`);
        // console.log("delete driver success", res);
        dispatch(deleteDriverSuccess(res.data));
    } catch (error) {
        // console.log("delete driver error", error);
        dispatch(
            deleteDriverFailure(
                error?.response?.data?.message || "Something went wrong while deleting driver"
            )
        );
    }
};

// get all drivers
// --------------
const getAllDriversAction = () => async (dispatch) => {
    dispatch(getAllDriversStart());
    try {
        const res = await customAxios.get(`/driver/all`);
        // console.log("get all drivers success", res);
        dispatch(getAllDriversSuccess(res.data));
    } catch (error) {
        // console.log("get all drivers error", error);
        dispatch(
            getAllDriversFailure(
                error?.response?.data?.message || "Something went wrong while getting drivers"
            )
        );
    }
};

export { addDriverAction, updateDriverAction, deleteDriverAction, getAllDriversAction };
