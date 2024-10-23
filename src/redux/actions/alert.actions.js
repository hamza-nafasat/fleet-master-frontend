import { customAxios } from "../../utils/customAxios";
import {
  createAlertFailure,
  createAlertStart,
  createAlertSuccess,
  deleteAlertFailure,
  deleteAlertStart,
  deleteAlertSuccess,
  getAllAlertsFailure,
  getAllAlertsStart,
  getAllAlertsSuccess,
  updateAlertFailure,
  updateAlertStart,
  updateAlertSuccess,
} from "../slices/alert.slice";

// create alert
const createAlertActions = ({ platform, severity, type }) => {
  return async (dispatch) => {
    dispatch(createAlertStart());
    try {
      const response = await customAxios.post("/alert/create", { platform, severity, type });
      // console.log("create alert api response ", response);
      dispatch(createAlertSuccess(response.data));
    } catch (error) {
      // console.log("create alert api error", error);
      dispatch(createAlertFailure(error?.response?.data?.message || "Error ocurred while creating alert"));
    }
  };
};

// get all alert Action
const getAllAlertsActions = () => async (dispatch) => {
  try {
    dispatch(getAllAlertsStart());
    const response = await customAxios.get("/alert/all");
    console.log("alert get all api response ", response);
    dispatch(getAllAlertsSuccess(response.data));
  } catch (error) {
    console.log("alert get all api error", error);
    dispatch(getAllAlertsFailure(error?.response?.data?.message || "Error ocurred while getting alerts"));
  }
};

// update alert
const updateAlertAction =
  ({ alertId = "", platform = "", severity = "", type = "", status = "" }) =>
  async (dispatch) => {
    try {
      dispatch(updateAlertStart());
      const response = await customAxios.put(`/alert/single/${alertId}`, {
        platform,
        severity,
        type,
        status,
      });
      // console.log("update alert api response ", response);
      dispatch(updateAlertSuccess(response.data));
    } catch (error) {
      updateAlertFailure(error?.response?.data?.message || "Error ocurred while updating alert");
      // console.log("update alert api error", error);
    }
  };

// delete alert
const deleteAlertAction = (alertId) => async (dispatch) => {
  try {
    dispatch(deleteAlertStart());
    const response = await customAxios.delete(`/alert/single/${alertId}`);
    // console.log("delete alert api response ", response);
    dispatch(deleteAlertSuccess(response.data));
  } catch (error) {
    // console.log("delete alert api error", error);
    dispatch(deleteAlertFailure(error?.response?.data?.message || "Error ocurred while deleting alert"));
  }
};

export { createAlertActions, getAllAlertsActions, updateAlertAction, deleteAlertAction };
