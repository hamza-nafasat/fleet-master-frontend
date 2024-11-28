import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/user.slice";
import getEnv from "../config/getEnv";
import truckSlice from "./slices/truck.slice";
import driverSlice from "./slices/driver.slice";
import employeesSlice from "./slices/employees.slice";
import deviceSlice from "./slices/device.slice";
import geofenceSlice from "./slices/geofence.slice";
import subscriptionSlice from "./slices/subscription.slice";
import notificationSlice from "./slices/notification.slice";
import adminSlice from "./slices/admin.slice";
import alertSlice from "./slices/alert.slice";
import ruleEngineSlice from "./slices/ruleEngine.slice";

const baseUrl = getEnv("VITE_SERVER_URL");

const store = configureStore({
  reducer: {
    [userSlice.name]: userSlice.reducer,
    [truckSlice.name]: truckSlice.reducer,
    [driverSlice.name]: driverSlice.reducer,
    [employeesSlice.name]: employeesSlice.reducer,
    [deviceSlice.name]: deviceSlice.reducer,
    [geofenceSlice.name]: geofenceSlice.reducer,
    [subscriptionSlice.name]: subscriptionSlice.reducer,
    [notificationSlice.name]: notificationSlice.reducer,
    [adminSlice.name]: adminSlice.reducer,

    [alertSlice.name]: alertSlice.reducer,
    [ruleEngineSlice.name]: ruleEngineSlice.reducer,
  },
});

export default store;
export { baseUrl };
