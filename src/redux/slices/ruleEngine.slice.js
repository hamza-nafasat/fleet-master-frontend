import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  message: null,
  ruleEngine: [],
};

const ruleEngineSlice = createSlice({
  name: "ruleEngine",
  initialState,
  reducers: {
    // create ruleEngine
    createRuleEngineStart: (state) => {
      state.loading = true;
    },
    createRuleEngineSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    createRuleEngineFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    // update ruleEngine
    updateRuleEngineStart: (state) => {
      state.loading = true;
    },
    updateRuleEngineSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updateRuleEngineFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // delete ruleEngine
    deleteRuleEngineStart: (state) => {
      state.loading = true;
    },
    deleteRuleEngineSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    deleteRuleEngineFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get all ruleEngine
    getAllRuleEngineStart: (state) => {
      state.loading = true;
    },
    getAllRuleEngineSuccess: (state, action) => {
      state.loading = false;
      state.alerts = action.payload.data;
    },
    getAllRuleEngineFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // clear ruleEngine error and message
    clearRuleEngineError: (state) => {
      state.error = null;
    },
    clearRuleEngineMessage: (state) => {
      state.message = null;
    },
  },
});

export const {
  clearRuleEngineError,
  clearRuleEngineMessage,
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
} = ruleEngineSlice.actions;
export default ruleEngineSlice;
