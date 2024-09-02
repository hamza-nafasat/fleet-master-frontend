import * as Yup from "yup";

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Email is required"),
  password: Yup.string().min(6).required("Password is required"),
});

export const truckSchema = Yup.object({
  truckName: Yup.string().required("Truck name is required"),
  fleetNumber: Yup.number().required("Fleet Number is required"),
  plateNumber: Yup.string().required("Plate Number is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileFormat",
      "Unsupported file format",
      (value) => value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
    )
    .test(
      "fileSize",
      "File is too large",
      (value) => value && value.size <= 1024 * 1024 // 1MB limit
    ),
});

export const addDriverSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  fleetNumber: Yup.number().required("Fleet number is required"),
  licenseExpiry: Yup.string().required("License Expiry is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileFormat",
      "Unsupported file format",
      (value) => value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
    )
    .test(
      "fileSize",
      "File is too large",
      (value) => value && value.size <= 1024 * 1024 // 1MB limit
    ),
});

export const addEmployeeSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().required("Email is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  role: Yup.string().required("Role is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileFormat",
      "Unsupported file format",
      (value) => value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
    )
    .test(
      "fileSize",
      "File is too large",
      (value) => value && value.size <= 1024 * 1024 // 1MB limit
    ),
});

export const attachModalSchema = Yup.object({
  deviceId: Yup.string().required("Device name is required"),
  deviceType: Yup.string().required("Device type is required"),
});

export const addDeviceSchema = Yup.object({
  deviceName: Yup.string().required("Device name is required and unique"),
  deviceType: Yup.string().required("Device type is required"),
  uniqueId: Yup.string().required("Unique id is required"),
  ipAddress: Yup.string().required("Ip address is required"),
});

export const addFenceSchema = Yup.object({
  name: Yup.string().required("Geofence name is required"),
  status: Yup.string().required("Status is required"),
  alert: Yup.string().required("Alert name is required"),
  startDate: Yup.date().required("Start date is required").typeError("Start date must be a valid date"),
  endDate: Yup.date()
    .required("End date is required")
    .typeError("End date must be a valid date")
    .min(Yup.ref("startDate"), "End date must be later than start date"),
});

export const registerSchema = Yup.object({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().required("Email is required"),
  phone: Yup.string().required("Phone number is required"),
  password: Yup.string().min(6).required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .min(6)
    .required("Password is required"),
  address: Yup.string().required("Address is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test(
      "fileFormat",
      "Unsupported file format",
      (value) => value && ["image/jpeg", "image/png", "image/gif"].includes(value.type)
    )
    .test("fileSize", "File is too large", (value) => value && value.size <= 1024 * 1024),
});
