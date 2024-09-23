import { customAxios, customFormAxios } from "../../utils/customAxios";
import {
  forgetPasswordFailure,
  forgetPasswordStart,
  forgetPasswordSuccess,
  getMyProfileFailure,
  getMyProfileStart,
  getMyProfileSuccess,
  loginUserFailure,
  loginUserStart,
  loginUserSuccess,
  logoutUserFailure,
  logoutUserStart,
  logoutUserSuccess,
  registerUserFailure,
  registerUserStart,
  registerUserSuccess,
  resendVerificationTokenFailure,
  resendVerificationTokenStart,
  resendVerificationTokenSuccess,
  resetPasswordFailure,
  resetPasswordStart,
  resetPasswordSuccess,
  updateMyProfileFailure,
  updateMyProfileStart,
  updateMyProfileSuccess,
} from "../slices/user.slice";

// login Action
// -----------
const registerUserAction = (formData) => async (dispatch) => {
  dispatch(registerUserStart());
  try {
    const response = await customFormAxios.post("/user/register", formData);
    console.log("user login api response ", response);
    dispatch(registerUserSuccess(response.data));
  } catch (error) {
    console.log(error);
    dispatch(registerUserFailure(error?.response?.data?.message || "Error ocurred while Register"));
  }
};

// resend verification token
// -------------------------
const resendVerificationTokenAction = () => async (dispatch) => {
  dispatch(resendVerificationTokenStart());
  try {
    const response = await customAxios.get("/user/verification-url");
    // console.log("resend verification token api response ", response);
    dispatch(resendVerificationTokenSuccess(response.data));
  } catch (error) {
    // console.log(error);
    dispatch(
      resendVerificationTokenFailure(
        error?.response?.data?.message || "Error ocurred while resend verification token"
      )
    );
  }
};

// login Action
// -----------
const loginUserAction = (email, password) => async (dispatch) => {
  dispatch(loginUserStart());
  try {
    const response = await customAxios.post("/user/login", { email, password });
    // console.log("user login api response ", response);
    dispatch(loginUserSuccess(response.data));
  } catch (error) {
    // console.log(error);
    dispatch(loginUserFailure(error?.response?.data?.message || "Error ocurred while login"));
  }
};

// get my profile
// --------------
const getMyProfileAction = () => async (dispatch) => {
  dispatch(getMyProfileStart());
  try {
    const response = await customAxios.get("/user/profile");
    // console.log("get my profile api response ", response);
    dispatch(getMyProfileSuccess(response.data));
  } catch (error) {
    // console.log(error);
    dispatch(
      getMyProfileFailure(error?.response?.data?.message || "Error ocurred while getting my profile")
    );
  }
};
// update my profile
// --------------
const updateMyProfileAction = (formData) => async (dispatch) => {
  dispatch(updateMyProfileStart());
  try {
    const response = await customFormAxios.put("/user/profile", formData);
    // console.log("get my profile api response ", response);
    dispatch(updateMyProfileSuccess(response.data));
  } catch (error) {
    // console.log(error);
    dispatch(
      updateMyProfileFailure(error?.response?.data?.message || "Error ocurred while getting my profile")
    );
  }
};

// forget password
// ---------------
const forgetPasswordAction = (email) => async (dispatch) => {
  dispatch(forgetPasswordStart());
  try {
    const response = await customAxios.put("/user/forget-password", { email });
    // console.log("forget password api response ", response);
    dispatch(forgetPasswordSuccess(response.data));
  } catch (error) {
    // console.log(error);
    dispatch(
      forgetPasswordFailure(error?.response?.data?.message || "Error ocurred while forget password")
    );
  }
};

// reset password
// ---------------
const resetPasswordAction = (resetToken, newPassword) => async (dispatch) => {
  dispatch(resetPasswordStart());
  try {
    const response = await customAxios.post(`/user/reset-password?resetToken=${resetToken}`, {
      newPassword,
    });
    // console.log("reset password api response ", response);
    dispatch(resetPasswordSuccess(response?.data));
  } catch (error) {
    // console.log(error);
    dispatch(resetPasswordFailure(error?.response?.data?.message || "Error ocurred while reset password"));
  }
};

// logout user
// -----------
const logoutUserAction = () => async (dispatch) => {
  dispatch(logoutUserStart());
  try {
    const response = await customAxios.get("/user/logout");
    // console.log("logout user api response ", response);
    dispatch(logoutUserSuccess(response.data));
  } catch (error) {
    // console.log(error);
    dispatch(logoutUserFailure(error?.response?.data?.message || "Error ocurred while logout"));
  }
};

export {
  registerUserAction,
  resendVerificationTokenAction,
  loginUserAction,
  forgetPasswordAction,
  resetPasswordAction,
  logoutUserAction,
  getMyProfileAction,
  updateMyProfileAction,
};
