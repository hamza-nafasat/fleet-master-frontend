import { customAxios } from "../../utils/customAxios";
import {
    addGeofenceFailure,
    addGeofenceStart,
    addGeofenceSuccess,
    addTrucksAndAreaFailure,
    addTrucksAndAreaStart,
    addTrucksAndAreaSuccess,
    deleteGeofenceFailure,
    deleteGeofenceStart,
    deleteGeofenceSuccess,
    getAllGeofencesFailure,
    getAllGeofencesStart,
    getAllGeofencesSuccess,
    getSingleGeofenceFailure,
    getSingleGeofenceStart,
    getSingleGeofenceSuccess,
    removeTruckFromGeofenceFailure,
    removeTruckFromGeofenceStart,
    removeTruckFromGeofenceSuccess,
    updateGeofenceFailure,
    updateGeofenceStart,
    updateGeofenceSuccess,
} from "../slices/geofence.slice";

// create geofence
const createGeofenceAction = (data) => async (dispatch) => {
    dispatch(addGeofenceStart());
    try {
        const response = await customAxios.post("/geofence/create", data);
        // console.log("create geofence api response ", response);
        dispatch(addGeofenceSuccess(response.data));
    } catch (error) {
        // console.log("create geofence api error", error);
        dispatch(
            addGeofenceFailure(error?.response?.data?.message || "Error ocurred while creating geofence")
        );
    }
};

// get single geofence
const getSingleGeofenceAction = (geofenceId) => async (dispatch) => {
    dispatch(getSingleGeofenceStart());
    try {
        const response = await customAxios.get(`/geofence/single/${geofenceId}`);
        // console.log("get single geofence api response ", response);
        dispatch(getSingleGeofenceSuccess(response.data));
    } catch (error) {
        // console.log("get single geofence api error", error);
        dispatch(
            getSingleGeofenceFailure(
                error?.response?.data?.message || "Error ocurred while getting single geofence"
            )
        );
    }
};

// update geo fence
const updateGeofenceAction = (geofenceId, data) => async (dispatch) => {
    dispatch(updateGeofenceStart());
    try {
        const response = await customAxios.put(`/geofence/single/${geofenceId}`, data);
        // console.log("update geofence api response ", response);
        dispatch(updateGeofenceSuccess(response.data));
    } catch (error) {
        // console.log("update geofence api error", error);
        dispatch(
            updateGeofenceFailure(error?.response?.data?.message || "Error ocurred while updating geofence")
        );
    }
};

// delete geo fence
const deleteGeofenceAction = (geofenceId) => async (dispatch) => {
    dispatch(deleteGeofenceStart());
    try {
        const response = await customAxios.delete(`/geofence/single/${geofenceId}`);
        // console.log("delete geofence api response ", response);
        dispatch(deleteGeofenceSuccess(response.data));
    } catch (error) {
        // console.log("delete geofence api error", error);
        dispatch(
            deleteGeofenceFailure(error?.response?.data?.message || "Error ocurred while deleting geofence")
        );
    }
};

// get all geofence
const getAllGeofenceAction = () => async (dispatch) => {
    dispatch(getAllGeofencesStart());
    try {
        const response = await customAxios.get("/geofence/all");
        // console.log("get all geofence api response ", response);
        dispatch(getAllGeofencesSuccess(response.data));
    } catch (error) {
        // console.log("get all geofence api error", error);
        dispatch(
            getAllGeofencesFailure(
                error?.response?.data?.message || "Error ocurred while getting all geofence"
            )
        );
    }
};

// add truck and area
const addTruckAndAreaInGeofenceAction = (geofenceId, trucks, area) => async (dispatch) => {
    dispatch(addTrucksAndAreaStart());
    try {
        const response = await customAxios.put(`/geofence/add-truck/${geofenceId}`, { trucks, area });
        // console.log("add truck and area api response ", response);
        dispatch(addTrucksAndAreaSuccess(response.data));
    } catch (error) {
        // console.log("add truck and area api error", error);
        dispatch(
            addTrucksAndAreaFailure(
                error?.response?.data?.message || "Error ocurred while adding truck and area"
            )
        );
    }
};

const removeTruckFromGeofenceAction = (geofenceId, truckId) => async (dispatch) => {
    dispatch(removeTruckFromGeofenceStart());
    try {
        const response = await customAxios.put(`/geofence/remove-truck/${geofenceId}`, { truckId });
        // console.log("remove truck from geofence api response ", response);
        dispatch(removeTruckFromGeofenceSuccess(response.data));
    } catch (error) {
        // console.log("remove truck from geofence api error", error);
        dispatch(
            removeTruckFromGeofenceFailure(
                error?.response?.data?.message || "Error ocurred while removing truck from geofence"
            )
        );
    }
};

export {
    createGeofenceAction,
    updateGeofenceAction,
    deleteGeofenceAction,
    getSingleGeofenceAction,
    getAllGeofenceAction,
    addTruckAndAreaInGeofenceAction,
    removeTruckFromGeofenceAction,
};
