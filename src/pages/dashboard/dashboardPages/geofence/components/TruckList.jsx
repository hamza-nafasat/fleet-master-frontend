/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import DeleteIcon from "../../../../../assets/svgs/geofence/DeleteIcon";
import {
    getAllGeofenceAction,
    getSingleGeofenceAction,
    removeTruckFromGeofenceAction,
} from "../../../../../redux/actions/geofence.action";

const TruckList = ({ trucks, geofenceId }) => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const handleDeleteList = async (row) => {
        confirmAlert({
            title: "Confirm Remove",
            message: "Are you sure you want to Remove this truck?",
            buttons: [
                {
                    label: "Yes",
                    onClick: async () => {
                        setIsLoading(true);
                        await dispatch(removeTruckFromGeofenceAction(geofenceId, row._id));
                        await dispatch(getSingleGeofenceAction(geofenceId));
                        await dispatch(getAllGeofenceAction());
                        setIsLoading(false);
                    },
                },
                {
                    label: "No",
                    onClick: () => toast.info("Delete action cancelled", { autoClose: 2000 }),
                },
            ],
        });
    };

    const columns = [
        {
            field: "truckName",
            headerName: " TRUCK NAME",
            headerAlign: "center",
            align: "center",
            width: 180,
        },
        {
            field: "fleetNumber",
            headerName: "FLEET NUMBER",
            headerAlign: "center",
            align: "center",
            width: 180,
        },
        {
            field: "status",
            headerName: "STATUS",
            headerAlign: "center",
            align: "center",
            width: 180,
        },
        {
            field: "plateNumber",
            headerName: "PLATE NUMBER",
            headerAlign: "center",
            align: "center",
            width: 150,
        },
        {
            field: "delete",
            headerName: "DELETE",
            headerAlign: "center",
            align: "center",
            width: 100,
            renderCell: (params) => (
                <Box
                    sx={{ cursor: isLoading ? "not-allowed" : "pointer" }}
                    onClick={() => handleDeleteList(params.row)}
                >
                    <DeleteIcon />
                </Box>
            ),
        },
    ];
    return (
        <>
            <React.Fragment>
                <DataGrid
                    rows={trucks}
                    columns={columns}
                    getRowId={(row) => row._id}
                    pageSize={5}
                    rowsPerPageOptions={[5, 10, 20]}
                    sx={{
                        "& .MuiDataGrid-row.even-row": {
                            backgroundColor: "#fafafa",
                        },
                        "& .MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitle": {
                            fontSize: {
                                xs: "12px",
                                md: "13px",
                            },
                            fontWeight: 600,
                            color: "#111111",
                        },
                        "& .MuiDataGrid-row .MuiDataGrid-cell": {
                            fontSize: {
                                xs: "12px",
                                md: "13px",
                            },
                            background: "#fafafa",
                            fontWeight: 400,
                            color: "rgba(17, 17, 17, 0.6)",
                        },
                        "& .MuiDataGrid-root": {
                            borderTopLeftRadius: "24px !important",
                            borderTopRightRadius: "24px !important",
                            border: "0 !important",
                            overflow: "hidden",
                            width: "100%",
                        },
                        "& .MuiDataGrid-main": {
                            borderTopLeftRadius: "24px",
                            borderTopRightRadius: "24px",
                            width: "100%",
                            padding: "0px",
                        },
                        "& .MuiDataGrid-overlay": {
                            borderTopLeftRadius: "24px",
                            borderTopRightRadius: "24px",
                        },
                        "& .MuiDataGrid-footerContainer": {
                            display: "none",
                        },
                        "& .MuiDataGrid-scrollbar": {
                            "&::-webkit-scrollbar": {
                                width: "6px",
                                height: "6px",
                            },
                            "&::-webkit-scrollbar-track": {
                                background: "#00193333",
                                borderRadius: "6px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                background: "#006bce",
                                borderRadius: "10px",
                            },
                        },
                    }}
                />
            </React.Fragment>
        </>
    );
};

export default TruckList;
