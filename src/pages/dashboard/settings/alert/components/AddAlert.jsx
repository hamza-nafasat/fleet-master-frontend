/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BackIcon from "../../../../../assets/svgs/modal/BackIcon";
import CloseIcon from "../../../../../assets/svgs/modal/CloseIcon";
import {
  createAlertActions,
  getAllAlertsActions,
} from "../../../../../redux/actions/alert.actions";

const alertType = [
  { type: "infence" },
  { type: "outfence" },
  { type: "speed-alert" },
  { type: "sudden-stop" },
  { type: "two-detection" },
  { type: "tire-pressure" },
  { type: "sensor-offline" },
  { type: "idle-engine" },
  { type: "damage-alert" },
];
const severityType = [{ type: "high" }, { type: "medium" }, { type: "low" }];

const AddAlert = ({ onClose }) => {
  const dispatch = useDispatch();
  const { message } = useSelector((state) => state.alert);
  const [inputEmail, setInputEmail] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    alertType: "",
    severityType: "",
    email: "",
    platform: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    setIsLoading(true);
    if (!formData.alertType || !formData.severityType || !formData.platform) {
      return toast.error("All fields are required");
    }
    try {
      await dispatch(
        createAlertActions({
          platform: formData.platform,
          severity: formData.severityType,
          type: formData.alertType,
        })
      );
      await dispatch(getAllAlertsActions());
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (message) onClose();
  }, [message, onClose]);

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            color: "rgba(17, 17, 17, 1)",
            fontSize: {
              xs: "1rem",
              md: "1.5rem",
            },
            fontWeight: 600,
          }}
        >
          <Box sx={{ cursor: "pointer", height: "25px" }} onClick={onClose}>
            <BackIcon />
          </Box>
          ADD ALERT
        </Box>
        <Box sx={{ cursor: "pointer" }} onClick={onClose}>
          <CloseIcon />
        </Box>
      </Box>
      {/* Form  */}
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          marginTop: {
            xs: "1rem",
            lg: "2.5rem",
          },
        }}
      >
        <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={12}>
              <TextField
                name="alertName"
                type="text"
                fullWidth
                label="Alert Name"
              />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name="alertType"
                onChange={handleChange}
                select
                fullWidth
                label="Alert Type"
                value={formData.alertType}
              >
                {alertType.map((type, i) => (
                  <MenuItem key={i} value={type.type}>
                    {type.type?.toUpperCase()}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} lg={6}>
              <TextField
                name="severityType"
                onChange={handleChange}
                select
                fullWidth
                label="Severity Type"
                value={formData.severityType}
              >
                {severityType.map((type, i) => (
                  <MenuItem key={i} value={type.type}>
                    {type.type?.toUpperCase()}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {formData.alertType == "idle-engine" && (
              <Grid item xs={12} lg={12}>
                <TextField name="alertName" fullWidth type="time" />
              </Grid>
            )}
            {formData.alertType == "tire-pressure" && (
              <Grid item xs={12} lg={12}>
                <TextField
                  name="alertName"
                  label="Tyre Pressure"
                  fullWidth
                  type="number"
                />
              </Grid>
            )}
            {formData.alertType == "speed-alert" && (
              <Grid item xs={12} lg={12}>
                <TextField
                  name="alertName"
                  label="Speed Alert"
                  fullWidth
                  type="number"
                />
              </Grid>
            )}
            {inputEmail && (
              <Grid item xs={12} lg={6}>
                <TextField
                  type="email"
                  name="email"
                  onChange={handleChange}
                  fullWidth
                  label="Email"
                  value={formData.email}
                />
              </Grid>
            )}
            <Grid
              item
              xs={12}
              mt={3}
              sx={{
                display: { xs: "block", sm: "flex" },
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  color: "rgba(17, 17, 17, 1)",
                  fontSize: "16px",
                  fontWeight: 600,
                }}
              >
                NOTIFICATION TYPE*
              </Typography>
              <FormGroup row>
                <FormControlLabel
                  sx={{ color: "rgba(17, 17, 17, 1)", fontWeight: 600 }}
                  control={
                    <Checkbox
                      checked={formData.platform === "email"}
                      value={"email"}
                      onChange={(event) => {
                        handleChange(event);
                        if (event.target.checked) {
                          setInputEmail(true);
                        }
                      }}
                      name="platform"
                    />
                  }
                  label="email"
                />
                <FormControlLabel
                  sx={{ color: "rgba(17, 17, 17, 1)", fontWeight: 600 }}
                  control={
                    <Checkbox
                      value={"platform"}
                      checked={formData.platform === "platform"}
                      onChange={(event) => {
                        handleChange(event);
                        if (event.target.checked) {
                          setInputEmail(false);
                        }
                      }}
                      name="platform"
                    />
                  }
                  label="platform"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-end",
              gap: "1rem",
              justifyContent: "flex-end",
              flexGrow: 1,
              mt: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <Button
                variant="outlined"
                onClick={onClose}
                sx={{
                  color: "#fff",
                  borderRadius: "16px",
                  width: "137px",
                  padding: "16px",
                }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                disabled={isLoading}
                onClick={handleSave}
                sx={{
                  color: "#fff",
                  borderRadius: "16px",
                  width: "137px",
                  padding: "16px",
                  ":disabled": {
                    opacity: 0.5,
                    cursor: "not-allowed",
                  },
                }}
              >
                {isLoading ? "Saving..." : "Save"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default AddAlert;

// /* eslint-disable react/prop-types */
// import {
//   Box,
//   Button,
//   Checkbox,
//   FormControlLabel,
//   FormGroup,
//   Grid,
//   MenuItem,
//   styled,
//   TextField,
//   Typography,
// } from "@mui/material";
// import { useState } from "react";
// import BackIcon from "../../../../../assets/svgs/modal/BackIcon";
// import CloseIcon from "../../../../../assets/svgs/modal/CloseIcon";

// const AddAlert = ({ onClose, label, maxLength, type }) => {
//   const [selected, setSelected] = useState("platform");
//   // const [severity, setSeverity] = useState("low");

//   const handleChange = (event) => {
//     setSelected(event.target.name);
//   };

//   return (
//     <>
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
//             fontSize: {
//               xs: "1rem",
//               md: "1.5rem",
//             },
//             fontWeight: 600,
//           }}
//         >
//           <Box sx={{ cursor: "pointer", height: "25px" }} onClick={onClose}>
//             <BackIcon />
//           </Box>
//           ADD ALERT
//         </Box>
//         <Box sx={{ cursor: "pointer" }} onClick={onClose}>
//           <CloseIcon onClick={onClose} />
//         </Box>
//       </Box>
//       {/* Form  */}
//       <Box
//         sx={{
//           display: "flex",
//           flexGrow: 1,
//           marginTop: {
//             xs: "1rem",
//             lg: "2.5rem",
//           },
//         }}
//       >
//         <Box sx={{ width: "100%", display: "flex", flexDirection: "column" }}>
//           <Grid container spacing="16">
//             <Grid item xs="12" lg="6">
//               <TextField select fullWidth label="Alert Type">
//                 {alertType.map((type, i) => (
//                   <MenuItem key={i} value={type.type}>
//                     {type.type?.toUpperCase()}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid item xs="12" lg="6">
//               <TextField select fullWidth label="Severity Type">
//                 {severityType.map((type, i) => (
//                   <MenuItem key={i} value={type.type}>
//                     {type.type?.toUpperCase()}
//                   </MenuItem>
//                 ))}
//               </TextField>
//             </Grid>
//             <Grid
//               item
//               xs="12"
//               mt={3}
//               sx={{
//                 display: { xs: "block", sm: "flex" },
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <Typography
//                 sx={{
//                   color: "rgba(17, 17, 17, 1)",
//                   fontSize: "16px",
//                   fontWeight: 600,
//                 }}
//               >
//                 NOTIFICATION TYPE*
//               </Typography>
//               <FormGroup row>
//                 <FormControlLabel
//                   sx={{ color: "rgba(17, 17, 17, 1)", fontWeight: 600 }}
//                   control={<Checkbox checked={selected === "Email"} onChange={handleChange} name="Email" />}
//                   label="Email"
//                 />
//                 <FormControlLabel
//                   sx={{ color: "rgba(17, 17, 17, 1)", fontWeight: 600 }}
//                   control={
//                     <Checkbox
//                       checked={selected === "On Platform"}
//                       onChange={handleChange}
//                       name="On Platform"
//                     />
//                   }
//                   label="On Platform"
//                 />
//               </FormGroup>
//             </Grid>
//           </Grid>
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "flex-end",
//               gap: "1rem",
//               justifyContent: "flex-end",
//               flexGrow: 1,
//               mt: 2,
//             }}
//           >
//             <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
//               <CancelBtn onClick={onClose}>Cancel</CancelBtn>
//               <Button
//                 sx={{
//                   color: "#fff",
//                   borderRadius: "16px",
//                   width: "137px",
//                   padding: "16px",
//                 }}
//               >
//                 Save
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </>
//   );
// };

// export default AddAlert;

// const CancelBtn = styled("span")({
//   fontsize: "16px",
//   fontWeight: 600,
//   color: "rgba(17, 17, 17, 1)",
//   cursor: "pointer",
// });
