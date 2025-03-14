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
  getMyAllSensorsDataFailure,
  getMyAllSensorsDataStart,
  getMyAllSensorsDataSuccess,
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
    console.log("truck create api response ", response);
    dispatch(addDeviceSuccess(response.data));
  } catch (error) {
    console.log("add device api error", error);
    dispatch(addDeviceFailure(error?.response?.data?.message || "Error occurred while creating truck"));
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
    dispatch(updateDeviceFailure(error?.response?.data?.message || "Error occurred while updating device"));
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
    dispatch(deleteDeviceFailure(error?.response?.data?.message || "Error occurred while deleting device"));
  }
};

// get all devices
// -------------
const getAllDevicesAction = (timeTo, timeFrom, type) => async (dispatch) => {
  dispatch(getAllDevicesStart());
  try {
    let url = "/device/all?";
    if (timeTo) url += `timeTo=${timeTo}&`;
    if (timeFrom) url += `timeFrom=${timeFrom}&`;
    if (type) url += `type=${type}&`;

    const response = await customAxios.get(url);
    console.log("get all devices api response ", response);
    dispatch(getAllDevicesSuccess(response.data));
  } catch (error) {
    // console.log("get all devices api error", error);
    dispatch(getAllDevicesFailure(error?.response?.data?.message || "Error occurred while getting all devices"));
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

// get my all sensors latest data
// -----------------------------
const getMyAllSensorsDataAction = () => async (dispatch) => {
  dispatch(getMyAllSensorsDataStart());
  try {
    const response = await customAxios.get("/sensors/latest-data");
    // console.log("get my all sensors latest data api response ", response?.data?.data);
    dispatch(getMyAllSensorsDataSuccess(response.data));
  } catch (error) {
    console.log("get my all sensors latest data api error", error);
    // getMyAllSensorsDataFailure(
    //   error?.response?.data?.message || "Error occurred while getting my all sensors latest data"
    // )
  }
};

export {
  addDeviceAction,
  deleteDeviceAction,
  getAllDevicesAction,
  updateDeviceAction,
  getDeviceDataAction,
  getMyAllSensorsDataAction,
};
