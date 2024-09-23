import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: false,
  error: null,
  message: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // register user
    // --------------

    registerUserStart: (state) => {
      state.loading = true;
    },
    registerUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.data;
    },
    registerUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // send verification token again
    // -----------------------------
    resendVerificationTokenStart: (state) => {
      state.loading = true;
    },
    resendVerificationTokenSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    resendVerificationTokenFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // user login
    // -----------
    loginUserStart: (state) => {
      state.loading = true;
    },
    loginUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.data;
    },
    loginUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get my profile
    // --------------
    getMyProfileStart: (state) => {
      state.loading = true;
    },
    getMyProfileSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
    },
    getMyProfileFailure: (state) => {
      state.loading = false;
    },

    // update my profile
    // ----------------
    updateMyProfileStart: (state) => {
      state.loading = true;
    },
    updateMyProfileSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.data;
    },
    updateMyProfileFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // forget password
    // ----------------
    forgetPasswordStart: (state) => {
      state.loading = true;
    },
    forgetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    forgetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // reset password
    // ---------------
    resetPasswordStart: (state) => {
      state.loading = true;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    resetPasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // user logout
    // ------------
    logoutUserStart: (state) => {
      state.loading = true;
    },
    logoutUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.user = null;
    },
    logoutUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // clear error and message
    // ------------------------
    clearUserMessage: (state) => {
      state.message = null;
    },
    clearUserError: (state) => {
      state.error = null;
    },
  },
});

export const {
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  resendVerificationTokenStart,
  resendVerificationTokenSuccess,
  resendVerificationTokenFailure,
  loginUserStart,
  loginUserSuccess,
  loginUserFailure,
  getMyProfileStart,
  getMyProfileSuccess,
  getMyProfileFailure,

  updateMyProfileStart,
  updateMyProfileSuccess,
  updateMyProfileFailure,

  forgetPasswordStart,
  forgetPasswordSuccess,
  forgetPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  resetPasswordFailure,
  logoutUserStart,
  logoutUserSuccess,
  logoutUserFailure,
  clearUserMessage,
  clearUserError,
} = userSlice.actions;
export default userSlice;
