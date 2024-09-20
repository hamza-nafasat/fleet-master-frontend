import {
  Avatar,
  Box,
  Button,
  Grid,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import profilePic from "../../../assets/images/asif.png";
import SaveIcon from "../../../assets/svgs/settings/SaveIcon";
import { useSelector } from "react-redux";

const Profile = () => {
  const [profilePicture, setProfilePicture] = useState("");

  const {user}=useSelector(state=>state.user)

  const handleImageSrc = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Box
      sx={{
        background: "#F5F4F4",
        padding: { xs: "20px 16px", md: "40px 30px" },
        borderRadius: "24px",
      }}
    >
      <Typography
        sx={{ fontSize: { xs: "16px", md: "20px" }, fontWeight: 600 }}
      >
        Profile
      </Typography>
      <Box sx={{ padding: { xs: "16px 0 20px 20px", md: "20px 0 40px 50px" } }}>
        <Typography
          sx={{ fontSize: { xs: "14px", md: "16px" }, fontWeight: 600 }}
        >
          PROFILE PICTURE
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap:'wrap',
            gap: { xs: "1rem", md: "2rem" },
            mt: 1,
          }}
        >
          <Avatar
            alt="profile pic"
            src={profilePicture||user?.image?.url}
            sx={{ width: 121, height: 121 }}
          />
          <ChangeButton>
            CHANGE PHOTOS
            <FileInput type="file" onChange={handleImageSrc} />
          </ChangeButton>
          <DeleteButton>
            Delete Picture
          </DeleteButton>
        </Box>
        <Grid container mt={3} spacing={2}>
          <Grid item xs={12} lg={8}>
            <TextField
              fullWidth
              type="text"
              label="First Name"
              value={user?.firstName}
              maxLength="30"
              name="profile-name"
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <TextField
              fullWidth
              type="text"
              label="Last Name"
              value={user?.lastName}
              maxLength="30"
              name="username"
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <TextField
              fullWidth
              type="email"
              label="Email Address"
              value={user?.email}
              maxLength="30"
              name="email"
              InputLabelProps={styled}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <TextField
              fullWidth
              type="tel"
              label="Phone Number"
              value={user?.phoneNumber}
              maxLength="30"
              name="phone"
            />
          </Grid>
          <Grid item xs="12" mt={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: 'wrap',
                gap: "1rem",
                //   width: "255px",
                justifyContent: "flex-end",
              }}
            >
              <Button
                type="button"
                sx={{
                  color: "#fff",
                  background: "rgba(160, 160, 160, 1)",
                  borderRadius: "16px",
                  width: "177px",
                  padding: "16px",
                  "&:disabled": {
                    opacity: "0.3",
                    color: "white",
                    cursor: "not-allowed",
                  },
                }}
              >
                CANCEL
              </Button>
              <Button
                type="submit"
                startIcon={<SaveIcon />}
                sx={{
                  color: "#fff",
                  borderRadius: "16px",
                  width: "177px",
                  padding: "16px",
                  "&:disabled": {
                    opacity: "0.3",
                    color: "white",
                    cursor: "not-allowed",
                  },
                }}
                // disabled={isLoading}
              >
                {/* {isLoading ? "Saving..." : "SAVE CHANGES"} */}
                SAVE CHANGES
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;

const ChangeButton = styled(Button)({
    borderRadius: "14px",
    position: "relative",
    color:'#fff',
    background: "rgba(0, 107, 206, 1)",
    padding: "0.9rem",
    width: "166px",
    "@media (max-width:768px)": {
        width: "100%",
    },
    "&:hover": {
        background: "transparent",
        border: "1px solid rgba(0, 107, 206, 1)",
        color: "rgba(0, 107, 206, 1)",
    },
});
const DeleteButton = styled(Button)({
    border: '0.4px solid rgba(60, 13, 13, 1)',
    borderRadius: "14px",
    position: "relative",
    color:'rgba(169, 11, 11, 1)',
    background: "rgba(216, 216, 216, 1)",
    padding: "0.8rem",
    width: "166px",
    "@media (max-width:768px)": {
        width: "100%",
    },
    "&:hover": {
        background: "transparent",
        border: "1px solid rgba(0, 107, 206, 1)",
        color: "rgba(169, 11, 11, 1)",
    },
});

const FileInput = styled("input")({
    position: "absolute",
    inset: 0,
    opacity: "0",
    cursor: "pointer",
});
