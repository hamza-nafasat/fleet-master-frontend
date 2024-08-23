/* eslint-disable react/prop-types */

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { Avatar, Box, Button, Card, CardActions, CardContent, Grid, Tooltip, Typography, styled } from "@mui/material";
import Loader from "../../../../../assets/svgs/Loader";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';

const TruckCard = ({ truck, handleOpenEditModal, deleteTruckHandler }) => {
    const { truckName, fleetNumber, plateNumber, status, image, assignedTo, _id, updatedAt } = truck;
    return truck ? (
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
                        alt={truckName}
                        src={image?.url}
                        sx={{
                            width: "80px",
                            height: "80px",
                            position: "relative",
                            overflow: "hidden",
                            borderRadius: "50%",
                            objectFit: "cover",
                        }}
                    />
                    <Box
                        sx={{
                            width: "15px",
                            height: "15px",
                            backgroundColor: status === "connected" ? "#00A389" : "#FF0000",
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
                            {truckName}
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
                                Fleet Number
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
                                {fleetNumber}
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
                                Plate Number
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
                                {plateNumber}
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
                                Status
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
                                {status.toUpperCase()}
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
                                Driver
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
                                {assignedTo
                                    ? `${assignedTo.firstName} ${assignedTo.lastName}`
                                    : "Not Assigned"}
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
                                Last Update
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
                                {updatedAt?.split("T")[0]}
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
                                Created At
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
                                {truck.createdAt.split('T')[0]}
                            </Typography>
                        </Box>
                    </Box>
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
                            onClick={() => handleOpenEditModal(truck)}
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
                            size="small"
                            color="error"
                            sx={{
                                background: "#FFCCC6",
                                minWidth: "127px",
                                "&:hover": {
                                    background: "transparent",
                                },
                            }}
                            onClick={() => deleteTruckHandler(_id)}
                            startIcon={<DeleteIcon sx={{ color: "#FF1900" }} />}
                        >
                            Delete
                        </Button>
                    </Box>
                </CardActions>
                <DetailPageLink>
                    <Link to={`/dashboard/truck-detail/${_id}`}>
                        <Tooltip title='Device Info'>
                            <InfoRoundedIcon sx={{color: '#006BCE'}} />
                        </Tooltip>
                    </Link>
                </DetailPageLink>
            </Card>
        </Grid>
    ) : (
        <Loader />
    );
};

export default TruckCard;

const DetailPageLink = styled(Box)({
    position: 'absolute',
    top: '10px',
    right: '10px',
    cursor: 'pointer'
})
