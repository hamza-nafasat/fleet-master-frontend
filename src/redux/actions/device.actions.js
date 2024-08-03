import { customAxios } from "../../utils/customAxios";
import {
    addDeviceFailure,
    addDeviceStart,
    addDeviceSuccess,
    deleteDeviceFailure,
    deleteDeviceStart,
    deleteDeviceSuccess,
    getAllDevicesFailure,
    getAllDevicesStart,
    getAllDevicesSuccess,
    getDeviceDataFailure,
    getDeviceDataStart,
    getDeviceDataSuccess,
    updateDeviceFailure,
    updateDeviceStart,
    updateDeviceSuccess,
} from "../slices/device.slice";

// add device
// -----------
const addDeviceAction = (data) => async (dispatch) => {
    dispatch(addDeviceStart());
    try {
        const response = await customAxios.post("/device/create", data);
        // console.log("truck create api response ", response);
        dispatch(addDeviceSuccess(response.data));
    } catch (error) {
        // console.log("add device api error", error);
        dispatch(addDeviceFailure(error?.response?.data?.message || "Error ocurred while creating truck"));
    }
};

// update device
// -------------
const updateDeviceAction = (deviceId, data) => async (dispatch) => {
    dispatch(updateDeviceStart());
    try {
        const response = await customAxios.put(`/device/single/${deviceId}`, data);
        // console.log("update device api response ", response);
        dispatch(updateDeviceSuccess(response.data));
    } catch (error) {
        // console.log("update device api error", error);
        dispatch(
            updateDeviceFailure(error?.response?.data?.message || "Error ocurred while updating device")
        );
    }
};

// delete device
// -----------
const deleteDeviceAction = (deviceId) => async (dispatch) => {
    dispatch(deleteDeviceStart());
    try {
        const response = await customAxios.delete(`/device/single/${deviceId}`);
        // console.log("delete device api response ", response);
        dispatch(deleteDeviceSuccess(response.data));
    } catch (error) {
        // console.log("delete device api error", error);
        dispatch(
            deleteDeviceFailure(error?.response?.data?.message || "Error ocurred while deleting device")
        );
    }
};

// get all devices
// -------------
const getAllDevicesAction = () => async (dispatch) => {
    dispatch(getAllDevicesStart());
    try {
        const response = await customAxios.get("/device/all");
        // console.log("get all devices api response ", response);
        dispatch(getAllDevicesSuccess(response.data));
    } catch (error) {
        // console.log("get all devices api error", error);
        dispatch(
            getAllDevicesFailure(error?.response?.data?.message || "Error ocurred while getting all devices")
        );
    }
};

// get device data
// -------------
const getDeviceDataAction = (data) => (dispatch) => {
    if (!data) {
        dispatch(getDeviceDataFailure("Error While Getting Device Data"));
    }
    dispatch(getDeviceDataStart());
    dispatch(getDeviceDataSuccess(data));
};

export { addDeviceAction, deleteDeviceAction, getAllDevicesAction, updateDeviceAction, getDeviceDataAction };
