import { customAxios } from "../../utils/customAxios";
import { createRuleEngineFailure, createRuleEngineStart, createRuleEngineSuccess } from "../slices/ruleEngine.slice";

// create ruleEngine
const createRuleEngineActions = ({ name, alert, platform, severity, onMil, status }) => {
  return async (dispatch) => {
    dispatch(createRuleEngineStart());
    try {
      const response = await customAxios.post("/ruleengine/create", { name, alert, platform, severity, onMil, status });
      // console.log("create alert api response ", response);
      dispatch(createRuleEngineSuccess(response.data));
    } catch (error) {
      // console.log("create alert api error", error);
      dispatch(createRuleEngineFailure(error?.response?.data?.message || "Error occurred while creating alert"));
    }
  };
};
// update ruleEngine
const updateRuleEngineActions = ({ id, name, alert, platform, severity, onMil, status }) => {
  return async (dispatch) => {
    dispatch(createRuleEngineStart());
    try {
      const response = await customAxios.put(`/ruleengine/single/${id}`, {
        name,
        alert,
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
// delete ruleEngine
const deleteRuleEngineActions = (id) => {
  return async (dispatch) => {
    dispatch(createRuleEngineStart());
    try {
      const response = await customAxios.delete(`/ruleengine/single/${id}`);
      // console.log("create alert api response ", response);
      dispatch(createRuleEngineSuccess(response.data));
    } catch (error) {
      // console.log("create alert api error", error);
      dispatch(createRuleEngineFailure(error?.response?.data?.message || "Error occurred while creating alert"));
    }
  };
};
// get all ruleEngine Action
const getAllRuleEngineActions = () => async (dispatch) => {
  try {
    dispatch(createRuleEngineStart());
    const response = await customAxios.get("/ruleengine/all");
    // console.log("alert get all api response ", response);
    dispatch(createRuleEngineSuccess(response.data));
  } catch (error) {
    // console.log("alert get all api error", error);
    dispatch(createRuleEngineFailure(error?.response?.data?.message || "Error occurred while getting alerts"));
  }
};

export { createRuleEngineActions, updateRuleEngineActions, deleteRuleEngineActions, getAllRuleEngineActions };
