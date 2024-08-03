/* eslint-disable react/prop-types */
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { Avatar, Box, Button, Card, CardActions, CardContent, Grid, Typography } from "@mui/material";

const CustomCard = ({ driver, handleOpenEditModal, onDelete }) => {
    return (
        <Grid item xs={12} md={4}>
            <Card
                sx={{
                    position: "relative",
                    overflow: "visible",
                    border: "none",
                    boxShadow: "none",
                    borderRadius: "12px",
                    padding: {
                        xs: "0px",
                        md: "10px",
                    },
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "-15%",
                        left: "50%",
                        transform: "translate(-50%, 0)",
                    }}
                >
                    <Avatar
                        alt={driver?.firstName}
                        src={driver?.image?.url}
                        sx={{
                            width: "80px",
                            height: "80px",
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                    ></Avatar>
                    <Box
                        sx={{
                            width: "15px",
                            height: "15px",
                            backgroundColor: "#00A389",
                            borderRadius: "100%",
                            position: "absolute",
                            border: "2px solid white",
                            bottom: "-7px",
                            left: "50%",
                            transform: "translate(-50%, 0px)",
                        }}
                    ></Box>
                </Box>
                <CardContent>
                    <Box sx={{ textAlign: "center", marginTop: "25px" }}>
                        <Typography
                            variant="h6"
                            component="Box"
                            sx={{
                                fontSize: {
                                    xs: "14px",
                                    md: "18px",
                                },
                                color: "#464255",
                                fontWeight: "500",
                            }}
                        >
                            {driver?._id}
                        </Typography>
                    </Box>
                    <Box
                        style={{
                            marginTop: "8px",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{
                                    fontSize: {
                                        xs: "10px",
                                        md: "12px",
                                    },
                                    color: "#7F7F92",
                                    fontWeight: "400",
                                }}
                            >
                                Creation Date
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: {
                                        xs: "14px",
                                        md: "16px",
                                    },
                                    color: "#006BCE",
                                    fontWeight: "400",
                                }}
                            >
                                {driver?.createdAt?.split("T")[0]}
                            </Typography>
                        </Box>
                        <Box>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{
                                    textAlign: "end",
                                    fontSize: {
                                        xs: "10px",
                                        md: "12px",
                                    },
                                    color: "#7F7F92",
                                    fontWeight: "400",
                                }}
                            >
                                Driver Name
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: {
                                        xs: "14px",
                                        md: "16px",
                                    },
                                    color: "#006BCE",
                                    fontWeight: "400",
                                }}
                            >
                                {driver?.firstName} {driver?.lastName}
                            </Typography>
                        </Box>
                    </Box>
                    <Box
                        style={{
                            marginTop: "13px",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <Box>
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{
                                    fontSize: {
                                        xs: "10px",
                                        md: "12px",
                                    },
                                    color: "#7F7F92",
                                    fontWeight: "400",
                                }}
                            >
                                License Expiry
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: {
                                        xs: "14px",
                                        md: "16px",
                                    },
                                    color: "#006BCE",
                                    fontWeight: "400",
                                }}
                            >
                                {driver?.licenseExpiry?.split("T")[0]}
                            </Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "end",
                            }}
                        >
                            <Typography
                                variant="body2"
                                color="textSecondary"
                                sx={{
                                    fontSize: {
                                        xs: "10px",
                                        md: "12px",
                                    },
                                    color: "#7F7F92",
                                    fontWeight: "400",
                                }}
                            >
                                Assign Truck
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontSize: {
                                        xs: "14px",
                                        md: "16px",
                                    },
                                    color: "#006BCE",
                                    fontWeight: "400",
                                }}
                            >
                                {driver?.assignedTruck
                                    ? driver?.assignedTruckDetails?.truckName
                                    : "Not Assigned"}
                            </Typography>
                        </Box>
                    </Box>
                    <Button
                        variant="outlined"
                        size="small"
                        sx={{
                            color: "black",
                            marginTop: "27px",
                            width: "100%",
                            background: "transparent",
                            "&:hover": {
                                background: "transparent",
                            },
                        }}
                        startIcon={<LocalPhoneIcon sx={{ color: "#006BCE" }} />}
                    >
                        {driver?.phoneNumber}
                    </Button>
                </CardContent>

                <CardActions>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            gap: "10px",
                        }}
                    >
                        <Button
                            onClick={() => handleOpenEditModal(driver)}
                            size="small"
                            sx={{
                                background: "#006BCE33",
                                minWidth: "127px",
                                "&:hover": {
                                    background: "transparent",
                                },
                            }}
                            startIcon={<EditIcon sx={{ color: "#006BCE" }} />}
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={() => onDelete(driver._id)}
                            size="small"
                            color="error"
                            sx={{
                                background: "#FFCCC6",
                                minWidth: "127px",
                                "&:hover": {
                                    background: "transparent",
                                },
                            }}
                            startIcon={<DeleteIcon sx={{ color: "#FF1900" }} />}
                        >
                            Delete
                        </Button>
                    </Box>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default CustomCard;
