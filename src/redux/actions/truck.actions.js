import { customAxios, customFormAxios } from "../../utils/customAxios";
import {
    addTruckFailure,
    addTruckStart,
    addTruckSuccess,
    attachDeviceToTruckFailure,
    attachDeviceToTruckStart,
    attachDeviceToTruckSuccess,
    deleteTruckFailure,
    deleteTruckStart,
    deleteTruckSuccess,
    detachDeviceFromTruckFailure,
    detachDeviceFromTruckStart,
    detachDeviceFromTruckSuccess,
    getAllTrucksFailure,
    getAllTrucksStart,
    getAllTrucksSuccess,
    getSingleTruckFailure,
    getSingleTruckStart,
    getSingleTruckSuccess,
    updateTruckFailure,
    updateTruckStart,
    updateTruckSuccess,
} from "../slices/truck.slice";

// add truck
// -----------
const addTruckAction = (formData) => async (dispatch) => {
    dispatch(addTruckStart());
    try {
        const response = await customFormAxios.post("/truck/create", formData);
        // console.log("truck create api response ", response);
        dispatch(addTruckSuccess(response.data));
    } catch (error) {
        // console.log(error);
        dispatch(addTruckFailure(error?.response?.data?.message || "Error ocurred while creating truck"));
    }
};

// update truck
// ------------
const updateTruckAction = (truckId, formData) => async (dispatch) => {
    dispatch(updateTruckStart());
    try {
        const response = await customFormAxios.put(`/truck/single/${truckId}`, formData);
        // console.log("truck update api response ", response);
        dispatch(updateTruckSuccess(response.data));
    } catch (error) {
        // console.log(error);
        dispatch(updateTruckFailure(error?.response?.data?.message || "Error ocurred while updating truck"));
    }
};

// delete truck
// ------------
const deleteTruckAction = (truckId) => async (dispatch) => {
    dispatch(deleteTruckStart());
    try {
        const response = await customAxios.delete(`/truck/single/${truckId}`);
        // console.log("truck delete api response ", response);
        dispatch(deleteTruckSuccess(response.data));
    } catch (error) {
        // console.log(error);
        dispatch(deleteTruckFailure(error?.response?.data?.message || "Error ocurred while deleting truck"));
    }
};

// get single truck
// ---------------
const getSingleTruckAction = (truckId) => async (dispatch) => {
    dispatch(getSingleTruckStart());
    try {
        const response = await customAxios.get(`/truck/single/${truckId}`);
        // console.log("truck get single api response ", response);
        dispatch(getSingleTruckSuccess(response.data));
    } catch (error) {
        // console.log(error);
        dispatch(
            getSingleTruckFailure(
                error?.response?.data?.message || "Error ocurred while getting single truck"
            )
        );
    }
};

// get all trucks
// --------------
const getAllTrucksAction = () => async (dispatch) => {
    dispatch(getAllTrucksStart());
    try {
        const response = await customAxios.get("/truck/all");
        // console.log("truck get all api response ", response);
        dispatch(getAllTrucksSuccess(response.data));
    } catch (error) {
        // console.log(error);
        dispatch(
            getAllTrucksFailure(error?.response?.data?.message || "Error ocurred while getting all trucks")
        );
    }
};

// attach device
// ---------------
const attachDeviceToTruckAction = (truckId, deviceId) => async (dispatch) => {
    dispatch(attachDeviceToTruckStart());
    try {
        const response = await customAxios.put(`/truck/${truckId}/attach-device`, { deviceId });
        // console.log("truck attach device api success ", response);
        dispatch(attachDeviceToTruckSuccess(response.data));
    } catch (error) {
        // console.log("truck attach device api error ", error);
        dispatch(
            attachDeviceToTruckFailure(
                error?.response?.data?.message || "Error ocurred while attaching device"
            )
        );
    }
};

// detach device
// ---------------
const detachDeviceFromTruckAction = (truckId, deviceId) => async (dispatch) => {
    dispatch(detachDeviceFromTruckStart());
    try {
        const response = await customAxios.put(`/truck/${truckId}/detach-device`, { deviceId });
        // console.log("truck detach device api success ", response);
        dispatch(detachDeviceFromTruckSuccess(response.data));
    } catch (error) {
        // console.log("truck detach device api error ", error);
        dispatch(
            detachDeviceFromTruckFailure(
                error?.response?.data?.message || "Error ocurred while detaching device"
            )
        );
    }
};
export {
    addTruckAction,
    updateTruckAction,
    deleteTruckAction,
    getAllTrucksAction,
    attachDeviceToTruckAction,
    detachDeviceFromTruckAction,
    getSingleTruckAction,
};
