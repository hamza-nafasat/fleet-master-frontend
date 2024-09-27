import { customAxios } from "../../utils/customAxios";
import {
  getAdminDashboardDetailsFailure,
  getAdminDashboardDetailsStart,
  getAdminDashboardDetailsSuccess,
  getSingleTruckReportFailure,
  getSingleTruckReportStart,
  getSingleTruckReportSuccess,
} from "../slices/admin.slice";

const getSingleTruckReportsAction = (timeTo, timeFrom, plateNumber) => async (dispatch) => {
  dispatch(getSingleTruckReportStart());
  try {
    const response = await customAxios.get("/admin/truck-reports", {
      params: { timeTo, timeFrom, plateNumber },
    });
    // console.log("truck report api response ", response);
    dispatch(getSingleTruckReportSuccess(response.data));
  } catch (error) {
    // console.log("truck report api error", error);
    dispatch(
      getSingleTruckReportFailure(error?.response?.data?.message || "Error ocurred while creating truck")
    );
  }
};
// get admin dashboard details
// ---------------------------
const adminDashboardDetailsAction =
  (from = "last-month") =>
  async (dispatch) => {
    dispatch(getAdminDashboardDetailsStart());
    try {
      const response = await customAxios.get(`admin/dashboard/details?from=${from}`);
      // console.log("admin dashboard details api response ", response);
      dispatch(getAdminDashboardDetailsSuccess(response.data));
    } catch (error) {
      // console.log("admin dashboard details api error", error);
      dispatch(
        getAdminDashboardDetailsFailure(
          error?.response?.data?.message || "Error ocurred while Getting Dashboard Details"
        )
      );
    }
  };

export { getSingleTruckReportsAction, adminDashboardDetailsAction };
