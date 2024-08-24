import { customAxios } from "../../utils/customAxios";
import {
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
    console.log("truck report api response ", response);
    dispatch(getSingleTruckReportSuccess(response.data));
  } catch (error) {
    console.log("truck report api error", error);
    dispatch(
      getSingleTruckReportFailure(error?.response?.data?.message || "Error ocurred while creating truck")
    );
  }
};

export { getSingleTruckReportsAction };
