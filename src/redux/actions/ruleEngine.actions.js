import { customAxios } from "../../utils/customAxios";
import {
  createRuleEngineFailure,
  createRuleEngineStart,
  createRuleEngineSuccess,
  deleteRuleEngineFailure,
  deleteRuleEngineStart,
  deleteRuleEngineSuccess,
  getAllRuleEngineFailure,
  getAllRuleEngineStart,
  getAllRuleEngineSuccess,
  updateRuleEngineFailure,
  updateRuleEngineStart,
  updateRuleEngineSuccess,
} from "../slices/ruleEngine.slice";

// create ruleEngine
const createRuleEngineActions = ({ name, alerts, platform, severity, onMil, status }) => {
  return async (dispatch) => {
    dispatch(createRuleEngineStart());
    try {
      const response = await customAxios.post("/ruleengine/create", {
        name,
        alerts,
        platform,
        severity,
        onMil,
        status,
      });
      // console.log("create alert api response ", response);
      dispatch(createRuleEngineSuccess(response.data));
    } catch (error) {
      // console.log("create alert api error", error);
      dispatch(createRuleEngineFailure(error?.response?.data?.message || "Error occurred while creating alert"));
    }
  };
};
// update ruleEngine
const updateRuleEngineActions = ({ id, name, alerts, platform, severity, onMil, status }) => {
  return async (dispatch) => {
    dispatch(updateRuleEngineStart());
    try {
      const response = await customAxios.put(`/ruleengine/single/${id}`, {
        name,
        alerts,
        platform,
        severity,
        onMil,
        status,
      });
      // console.log("create alert api response ", response);
      dispatch(updateRuleEngineSuccess(response.data));
    } catch (error) {
      // console.log("create alert api error", error);
      dispatch(updateRuleEngineFailure(error?.response?.data?.message || "Error occurred while creating alert"));
    }
  };
};
// delete ruleEngine
const deleteRuleEngineActions = (id) => {
  return async (dispatch) => {
    dispatch(deleteRuleEngineStart());
    try {
      const response = await customAxios.delete(`/ruleengine/single/${id}`);
      // console.log("create alert api response ", response);
      dispatch(deleteRuleEngineSuccess(response.data));
    } catch (error) {
      // console.log("create alert api error", error);
      dispatch(deleteRuleEngineFailure(error?.response?.data?.message || "Error occurred while creating alert"));
    }
  };
};
// get all ruleEngine Action
const getAllRuleEngineActions = () => async (dispatch) => {
  try {
    dispatch(getAllRuleEngineStart());
    const response = await customAxios.get("/ruleengine/all");
    console.log("alert get all api response ", response);
    dispatch(getAllRuleEngineSuccess(response.data));
  } catch (error) {
    console.log("alert get all api error", error);
    dispatch(getAllRuleEngineFailure(error?.response?.data?.message || "Error occurred while getting alerts"));
  }
};

export { createRuleEngineActions, updateRuleEngineActions, deleteRuleEngineActions, getAllRuleEngineActions };
