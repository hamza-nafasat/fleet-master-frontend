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

export { createRuleEngineActions };
