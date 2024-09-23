import { Avatar, Box, Button, Grid, styled, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SaveIcon from "../../../assets/svgs/settings/SaveIcon";
import { updateMyProfileAction } from "../../../redux/actions/user.actions";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [profilePicture, setProfilePicture] = useState("");
  const [image, setImage] = useState("");
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [isEditAble, setIsEditAble] = useState(false);

  const handleImageSrc = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setIsSaveLoading(true);
    try {
      const formData = new FormData();
      formData.append("firstName", profileData.firstName);
      formData.append("lastName", profileData.lastName);
      formData.append("email", profileData.email);
      formData.append("phoneNumber", profileData.phoneNumber);
      formData.append("image", image);
      await dispatch(updateMyProfileAction(formData));
      setIsSaveLoading(false);
      setIsEditAble(false);
    } catch (error) {
      console.log(error);
      setIsSaveLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        phoneNumber: user?.phoneNumber,
      });
    }
  }, [user]);

  return (
    <Box
      sx={{
        background: "#F5F4F4",
        padding: { xs: "20px 16px", md: "40px 30px" },
        borderRadius: "24px",
      }}
    >
      <Typography sx={{ fontSize: { xs: "16px", md: "20px" }, fontWeight: 600 }}>Profile</Typography>
      <Box sx={{ padding: { xs: "16px 0 20px 20px", md: "20px 0 40px 50px" } }}>
        <Typography sx={{ fontSize: { xs: "14px", md: "16px" }, fontWeight: 600 }}>
          PROFILE PICTURE
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
            gap: { xs: "1rem", md: "2rem" },
            mt: 1,
          }}
        >
          <Avatar
            alt="profile pic"
            src={profilePicture || user?.image?.url}
            sx={{ width: 121, height: 121 }}
          />
          {isEditAble && (
            <ChangeButton>
              CHANGE PHOTOS
              <FileInput type="file" onChange={handleImageSrc} />
            </ChangeButton>
          )}
        </Box>
        <Grid container mt={3} spacing={2}>
          <Grid item xs={12} lg={8}>
            <TextField
              fullWidth
              type="text"
              label="First Name"
              value={profileData?.firstName}
              onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
              maxLength="30"
              name="profile-name"
              disabled={!isEditAble}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <TextField
              fullWidth
              type="text"
              label="Last Name"
              value={profileData?.lastName}
              onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
              maxLength="30"
              name="username"
              disabled={!isEditAble}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <TextField
              fullWidth
              type="email"
              label="Email Address"
              value={profileData?.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              maxLength="30"
              name="email"
              InputLabelProps={styled}
              disabled={!isEditAble}
            />
          </Grid>
          <Grid item xs={12} lg={8}>
            <TextField
              fullWidth
              type="tel"
              label="Phone Number"
              value={profileData?.phoneNumber}
              onChange={(e) => setProfileData({ ...profileData, phoneNumber: e.target.value })}
              maxLength="30"
              name="phone"
              disabled={!isEditAble}
            />
          </Grid>
          <Grid item xs="12" mt={3}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "1rem",
                justifyContent: "flex-end",
              }}
            >
              <Button
                type="button"
                onClick={() => setIsEditAble(false)}
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
              {isEditAble ? (
                <Button
                  type="submit"
                  onClick={handleUpdateProfile}
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
                  disabled={isSaveLoading}
                >
                  {isSaveLoading ? "Saving..." : "SAVE CHANGES"}
                </Button>
              ) : (
                <Button
                  onClick={() => setIsEditAble(true)}
                  sx={{
                    color: "#fff",
                    borderRadius: "16px",
                    width: "177px",
                    padding: "16px",
                    fontSize: "16px",
                    "&:disabled": {
                      opacity: "0.3",
                      color: "white",
                      cursor: "not-allowed",
                    },
                  }}
                >
                  Edit
                </Button>
              )}
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
  color: "#fff",
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

const FileInput = styled("input")({
  position: "absolute",
  inset: 0,
  opacity: "0",
  cursor: "pointer",
});
