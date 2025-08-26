// /* eslint-disable react/prop-types */
// import { Box, Button, Grid, MenuItem, Select, TextField, Typography, styled } from "@mui/material";
// import { useFormik } from "formik";
// import { Fragment, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import BackIcon from "../../../../../assets/svgs/modal/BackIcon";
// import CameraIcon from "../../../../../assets/svgs/modal/CameraIcon";
// import CloseIcon from "../../../../../assets/svgs/modal/CloseIcon";
// import SaveIcon from "../../../../../assets/svgs/settings/SaveIcon";
// import { getAllTrucksAction, updateTruckAction } from "../../../../../redux/actions/truck.actions";
// import MultiSelectParameters from "../../devices/components/MultiSelectParameters";

// const EditTruck = ({ onClose, singleTruck }) => {
//   const [imageSrc, setImageSrc] = useState(singleTruck?.image?.url);
//   const [isLoading, setIsLoading] = useState(false);
//   const { devices } = useSelector((state) => state.device);
//   console.log("devices", devices);
//   const [parameters, setParameters] = useState([]);
//   const [selectedParameters, setSelectedParameters] = useState([]);
//   const dispatch = useDispatch();

//   const initialValues = {
//     truckName: singleTruck?.truckName,
//     fleetNumber: singleTruck?.fleetNumber,
//     plateNumber: singleTruck?.plateNumber,
//     deviceID: singleTruck?.deviceId ? singleTruck?.deviceId : "",
//     image: "",
//     setSelectedParameters(selectedParameters);
//     setParameters(deviceOptions);
//   };

//   const { values, errors, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
//     initialValues,
//     onSubmit: async (values, { resetForm }) => {
//       setIsLoading(true);
//       const formData = new FormData();
//       formData.append("truckName", values.truckName);
//       formData.append("fleetNumber", values.fleetNumber);
//       formData.append("plateNumber", values.plateNumber);
//       formData.append("deviceID", values.deviceID);
//       if (values.image) formData.append("file", values.image);
//       await dispatch(updateTruckAction(singleTruck?._id, formData));
//       await dispatch(getAllTrucksAction());
//       resetForm();
//       onClose();
//       setIsLoading(false);
//     },
//   });

//   const handleImageSrc = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setImageSrc(reader.result);
//         setFieldValue("image", file);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   return (
//     <Fragment>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             gap: "1rem",
//             color: "rgba(17, 17, 17, 1)",
//             fontSize: { xs: "1rem", md: "1.5rem" },
//             fontWeight: 600,
//           }}
//         >
//           <Box sx={{ cursor: "pointer", height: "25px" }} onClick={onClose}>
//             <BackIcon />
//           </Box>
//           EDIT TRUCK
//         </Box>
//         <Box sx={{ cursor: "pointer" }} onClick={onClose}>
//           <CloseIcon onClick={onClose} />
//         </Box>
//       </Box>
//       <Box sx={{ marginTop: { xs: "1rem", lg: "2.5rem" } }}>
//         <Typography sx={{ fontWeight: 700, fontSize: "20px", marginBottom: "2rem" }}>
//           General Info
//         </Typography>
//         <form onSubmit={handleSubmit}>
//           <Grid container spacing="2rem">
//             <Grid item xs="12" lg="8">
//               <Grid container spacing="14">
//                 <Grid item xs="12" lg="6">
//                   <TextField
//                     type="text"
//                     label="Truck Name"
//                     value={values.truckName}
//                     onChange={handleChange}
//                     fullWidth
//                     name="truckName"
//                   />
//                 </Grid>
//                 <Grid item xs="12" lg="6">
//                   <TextField
//                     type="number"
//                     label="Fleet Number"
//                     value={values.fleetNumber}
//                     onChange={handleChange}
//                     fullWidth
//                     name="fleetNumber"
//                   />
//                 </Grid>
//                 <Grid item xs="12" lg="6">
//                   <TextField
//                     type="text"
//                     label="Plate Number"
//                     value={values.plateNumber}
//                     onChange={handleChange}
//                     fullWidth
//                     name="plateNumber"
//                   />
//                 </Grid>
//                 <Grid item xs="12" lg="6">
//                   <Select
//                     labelId="deviceID-label"
//                     id="deviceID"
//                     name="deviceID"
//                     value={values.deviceID}
//                     onChange={handleChange} // ✅ Fix: Connects with Formik
//                     fullWidth
//                   >
//                     {devices?.map((option, i) => (
//                       <MenuItem key={i} value={option?._id}>
//                         {option?.name}
//                       </MenuItem>
//                     ))}
//                   </Select>
//                     <MultiSelectParameters
//                                   selectedParameters={selectedParameters}
//                                   setSelectedParameters={setSelectedParameters}
//                                   parameters={parameters}
//                                 />

//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item xs="12" lg="4">
//               <Typography
//                 sx={{
//                   color: "rgba(113, 117, 121, 1)",
//                   fontSize: "18px",
//                   fontWeight: 600,
//                 }}
//               >
//                 Truck PICTURE
//               </Typography>
//               <Image src={imageSrc} />
//               <ChangeButton startIcon={<CameraIcon />}>
//                 CHANGE PHOTOS
//                 <FileInput type="file" onChange={handleImageSrc} />
//               </ChangeButton>
//               {touched.image && errors.image && <Typography color="error">{errors.image}</Typography>}
//             </Grid>
//             <Grid item xs="12">
//               <Box
//                 sx={{
//                   display: "flex",
//                   alignItems: "center",
//                   gap: "1rem",
//                   width: "255px",
//                   justifyContent: "center",
//                 }}
//               >
//                 <CancelBtn onClick={onClose}>Cancel</CancelBtn>
//                 <Button
//                   type="submit"
//                   startIcon={<SaveIcon />}
//                   sx={{
//                     color: "#fff",
//                     borderRadius: "16px",
//                     width: "137px",
//                     padding: "16px",
//                     "&:disabled": {
//                       color: "#fff",
//                       opacity: "0.3",
//                       cursor: "not-allowed",
//                     },
//                   }}
//                   disabled={isLoading}
//                 >
//                   {isLoading ? "Saving..." : "Save"}
//                 </Button>
//               </Box>
//             </Grid>
//           </Grid>
//         </form>
//       </Box>
//     </Fragment>
//   );
// };

// export default EditTruck;

// const ChangeButton = styled(Button)({
//   border: "1px solid rgba(0, 107, 206, 1)",
//   borderRadius: "14px",
//   position: "relative",
//   background: "transparent",
//   padding: "1rem",
//   width: "255px",
//   "@media (max-width:768px)": {
//     width: "100%",
//   },
//   "&:hover": {
//     background: "transparent",
//   },
//   marginBottom: "2rem",
// });

// const FileInput = styled("input")({
//   position: "absolute",
//   inset: 0,
//   opacity: "0",
//   cursor: "pointer",
// });

// const Image = styled("img")({
//   maxWidth: "100%",
//   width: "255px",
//   "@media (max-width:768px)": {
//     width: "100%",
//   },
//   borderRadius: "14px",
//   margin: "10px 0 20px",
// });

// const CancelBtn = styled("span")({
//   fontSize: "16px",
//   fontWeight: 600,
//   color: "rgba(17, 17, 17, 1)",
//   cursor: "pointer",
// });

/* eslint-disable react/prop-types */
import { Box, Button, Grid, TextField, Typography, styled } from "@mui/material";
import { useFormik } from "formik";
import { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BackIcon from "../../../../../assets/svgs/modal/BackIcon";
import CameraIcon from "../../../../../assets/svgs/modal/CameraIcon";
import CloseIcon from "../../../../../assets/svgs/modal/CloseIcon";
import SaveIcon from "../../../../../assets/svgs/settings/SaveIcon";
import { getAllTrucksAction, updateTruckAction } from "../../../../../redux/actions/truck.actions";
import MultiSelectParameters from "../../devices/components/MultiSelectParameters";

const EditTruck = ({ onClose, singleTruck }) => {
  const [imageSrc, setImageSrc] = useState(singleTruck?.image?.url);
  const [isLoading, setIsLoading] = useState(false);
  const { devices } = useSelector((state) => state.device);
  const [selectedParameters, setSelectedParameters] = useState(
    singleTruck?.devices?.map((d) => ({
      ...d,
      parameter: d.parameters?.length ? d.parameters[0] : undefined, // if has parameters, take first
      name: d.name, // fallback label
    })) || []
  );

  const dispatch = useDispatch();
  console.log("singleTruck", singleTruck);

  const initialValues = {
    truckName: singleTruck?.truckName || "",
    fleetNumber: singleTruck?.fleetNumber || "",
    plateNumber: singleTruck?.plateNumber || "",
    image: "",
  };

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("truckName", values.truckName);
      formData.append("fleetNumber", values.fleetNumber);
      formData.append("plateNumber", values.plateNumber);

      // ✅ Save selected multi parameters
      formData.append("deviceIDs", JSON.stringify(selectedParameters.map(d => d._id)));


      if (values.image) formData.append("file", values.image);

      await dispatch(updateTruckAction(singleTruck?._id, formData));
      await dispatch(getAllTrucksAction());
      resetForm();
      onClose();
      setIsLoading(false);
    },
  });

  const handleImageSrc = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
        setFieldValue("image", file);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Fragment>
      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: { xs: "1rem", md: "1.5rem" }, fontWeight: 600 }}>
          <Box sx={{ cursor: "pointer", height: "25px" }} onClick={onClose}>
            <BackIcon />
          </Box>
          EDIT TRUCK
        </Box>
        <Box sx={{ cursor: "pointer" }} onClick={onClose}>
          <CloseIcon onClick={onClose} />
        </Box>
      </Box>

      {/* Form */}
      <Box sx={{ marginTop: { xs: "1rem", lg: "2.5rem" } }}>
        <Typography sx={{ fontWeight: 700, fontSize: "20px", marginBottom: "2rem" }}>General Info</Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing="2rem">
            <Grid item xs="12" lg="8">
              <Grid container spacing="14">
                <Grid item xs="12" lg="6">
                  <TextField
                    type="text"
                    label="Truck Name"
                    value={values.truckName}
                    onChange={handleChange}
                    fullWidth
                    name="truckName"
                  />
                </Grid>
                <Grid item xs="12" lg="6">
                  <TextField
                    type="number"
                    label="Fleet Number"
                    value={values.fleetNumber}
                    onChange={handleChange}
                    fullWidth
                    name="fleetNumber"
                  />
                </Grid>
                <Grid item xs="12" lg="6">
                  <TextField
                    type="text"
                    label="Plate Number"
                    value={values.plateNumber}
                    onChange={handleChange}
                    fullWidth
                    name="plateNumber"
                  />
                </Grid>

                {/* ✅ Multi Select Replaces Device Select */}
                <Grid item xs="12" lg="6">
                  <MultiSelectParameters
                    selectedParameters={selectedParameters}
                    setSelectedParameters={setSelectedParameters}
                    parameters={devices} // using devices directly
                  />
                </Grid>
              </Grid>
            </Grid>

            {/* Truck Image */}
            <Grid item xs="12" lg="4">
              <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>Truck PICTURE</Typography>
              <Image src={imageSrc} />
              <ChangeButton startIcon={<CameraIcon />}>
                CHANGE PHOTOS
                <FileInput type="file" onChange={handleImageSrc} />
              </ChangeButton>
              {touched.image && errors.image && <Typography color="error">{errors.image}</Typography>}
            </Grid>

            {/* Buttons */}
            <Grid item xs="12">
              <Box sx={{ display: "flex", alignItems: "center", gap: "1rem", width: "255px", justifyContent: "center" }}>
                <CancelBtn onClick={onClose}>Cancel</CancelBtn>
                <Button
                  type="submit"
                  startIcon={<SaveIcon />}
                  sx={{
                    color: "#fff",
                    borderRadius: "16px",
                    width: "137px",
                    padding: "16px",
                    "&:disabled": { color: "#fff", opacity: "0.3", cursor: "not-allowed" },
                  }}
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Fragment>
  );
};

export default EditTruck;

/* ---- Styled Components ---- */
const ChangeButton = styled(Button)({
  border: "1px solid rgba(0, 107, 206, 1)",
  borderRadius: "14px",
  position: "relative",
  background: "transparent",
  padding: "1rem",
  width: "255px",
  "@media (max-width:768px)": { width: "100%" },
  "&:hover": { background: "transparent" },
  marginBottom: "2rem",
});

const FileInput = styled("input")({
  position: "absolute",
  inset: 0,
  opacity: "0",
  cursor: "pointer",
});

const Image = styled("img")({
  maxWidth: "100%",
  width: "255px",
  "@media (max-width:768px)": { width: "100%" },
  borderRadius: "14px",
  margin: "10px 0 20px",
});

const CancelBtn = styled("span")({
  fontSize: "16px",
  fontWeight: 600,
  color: "rgba(17, 17, 17, 1)",
  cursor: "pointer",
});
