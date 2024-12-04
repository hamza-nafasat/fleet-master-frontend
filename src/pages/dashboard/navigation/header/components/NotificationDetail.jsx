import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import { FcViewDetails } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import DeleteIcon from "../../../../../assets/svgs/geofence/DeleteIcon";
import DownloadIcon from "../../../../../assets/svgs/reports/DownloadIcon";

import { FaGear } from "react-icons/fa6";

import NoData from "../../../../../components/noData/NoData";
import { adminDashboardDetailsAction } from "../../../../../redux/actions/admin.actions";
import {
  deleteNotificationAction,
  getAllNotificationsAction,
  getNewNotificationsAction,
  readNotificationAction,
} from "../../../../../redux/actions/notification.actions";

const NotificationDetail = () => {
  const dispatch = useDispatch();
  const [isDelLoading, setIsDelLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0); // Current page number
  const [pageSize, setPageSize] = useState(20); // Default to 20 rows per page
  const { notifications } = useSelector((state) => state.notification);

  const handleDeleteList = async (row) => {
    confirmAlert({
      title: "Confirm delete driver",
      message: "Are you sure you want to delete the driver?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            setIsDelLoading(true);
            await Promise.all([
              dispatch(deleteNotificationAction(row.id)),
              dispatch(getAllNotificationsAction()),
              dispatch(getNewNotificationsAction()),
              dispatch(adminDashboardDetailsAction()),
            ]);
            setIsDelLoading(false);
          },
        },
        {
          label: "No",
          onClick: () => {
            toast.info("Delete action cancelled", { autoClose: 2000 });
          },
        },
      ],
    });
  };

  const columns = [
    {
      field: "type",
      headerName: "Notification Type",
      headerAlign: "center",
      align: "center",
      width: 250,
    },
    {
      field: "message",
      headerName: "Notification Message",
      headerAlign: "center",
      align: "center",
      width: 500,
    },
    {
      field: "createdAt",
      headerName: "Created At",
      headerAlign: "center",
      align: "center",
      width: 200,
    },

    {
      field: "operation",
      headerName: "OPERATION",
      align: "center",
      headerAlign: "center",
      width: 180,
      renderCell: (params) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            gap: 2,
          }}
        >
          <DeleteIcon
            onClick={() => handleDeleteList(params.row)}
            isLoading={isDelLoading}
          />
          <Link
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            to={`/dashboard/truck-detail/${params?.row?.truckId}`}
          >
            <FcViewDetails style={{ fontSize: "1.8rem", cursor: "pointer" }} />
          </Link>
          <FaGear
            onClick={() => handleReadNotification(params.row)}
            style={{ fontSize: "1.3rem", color: "#4BC5EC", cursor: "pointer" }}
          />
        </Box>
      ),
    },
  ];

  useEffect(() => {
    if (notifications) {
      setRows(
        notifications.map((notification) => {
          return {
            ...notification,
            id: notification._id,
            type: notification.type,
            message: notification.message,
            createdAt:
              notification.createdAt
                .split("T")[0]
                .split("-")
                .reverse()
                .join("-") +
              "  at  " +
              new Date(notification.createdAt).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              }),
          };
        })
      );
    }
  }, [notifications]);

  const handleReadNotification = async (row) => {
    await dispatch(readNotificationAction(row.id));
    await Promise.all([
      dispatch(getAllNotificationsAction()),
      dispatch(getNewNotificationsAction()),
    ]);
  };

  const enterInPage = useCallback(async () => {
    await Promise.all([
      dispatch(getAllNotificationsAction()),
      dispatch(getNewNotificationsAction()),
    ]);
  }, [dispatch]);

  useEffect(() => {
    enterInPage();
  }, [enterInPage]);

  return (
    <Box
      sx={{
        width: "100%",
        background: "#ffffff",
        borderRadius: "24px 24px 0 0",
        marginTop: "-3.5rem",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "16px",
        }}
      >
        <DownloadIcon />
      </Box>
      {notifications.length > 0 ? (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          page={page}
          onPageChange={(newPage) => setPage(newPage)}
          paginationMode="client"
          rowCount={rows.length}
          rowsPerPageOptions={[5, 10, 20, 50]}
          headerClassName={() => "MuiDataGrid-colCell-center"}
          cellClassName={() => "MuiDataGrid-cell-center"}
          getRowClassName={(params) => {
            const { severity, isRead } = params.row;
            if (!isRead) {
              switch (severity) {
                case "high":
                  return "severity-high";
                case "medium":
                  return "severity-medium";
                case "low":
                  return "severity-low";
                default:
                  return "";
              }
            }
            return "";
          }}
          sx={{
            height: 850,
            "& .MuiDataGrid-row.severity-high": {
              backgroundColor: "#FBDCD9",
            },
            "& .MuiDataGrid-row.severity-medium": {
              backgroundColor: "#FAE6CF",
            },
            "& .MuiDataGrid-row.severity-low": {
              backgroundColor: "#D4E9D9",
            },
            "& .MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitle": {
              fontSize: {
                xs: "14px",
                md: "16px",
              },
              fontWeight: 600,
              color: "#111111",
            },
            "& .MuiDataGrid-row .MuiDataGrid-cell": {
              fontSize: {
                xs: "14px",
                md: "16px",
              },
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
              padding: "0 10px",
            },
            "& .MuiDataGrid-overlay": {
              borderTopLeftRadius: "24px",
              borderTopRightRadius: "24px",
            },
            "& .MuiDataGrid-footerContainer": {
              padding: "16px",
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
      ) : (
        <NoData />
      )}
    </Box>
  );
};

export default NotificationDetail;
