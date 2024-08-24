import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DeleteIcon from "../../../../../assets/svgs/geofence/DeleteIcon";
import DownloadIcon from "../../../../../assets/svgs/reports/DownloadIcon";
import {
  deleteNotificationAction,
  getAllNotificationsAction,
  getNewNotificationsAction,
  readAllNotificationsAction,
} from "../../../../../redux/actions/notification.actions";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-toastify";

const NotificationDetail = () => {
  const dispatch = useDispatch();
  const [isDelLoading, setIsDelLoading] = useState(false);
  const [rows, setRows] = useState([]);
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
            await dispatch(deleteNotificationAction(row.id));
            await dispatch(getAllNotificationsAction());
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
      width: 300,
    },

    {
      field: "operation",
      headerName: "OPERATION",
      align: "center",
      width: 120,
      renderCell: (params) => (
        <Box
          sx={{
            cursor: isDelLoading ? "not-allowed" : "pointer",
          }}
          onClick={() => handleDeleteList(params.row)}
        >
          <DeleteIcon />
        </Box>
      ),
    },
  ];
  useEffect(() => {
    if (notifications) {
      setRows(
        notifications.map((notification) => {
          return {
            id: notification._id,
            type: notification.type,
            message: notification.message,
            createdAt:
              notification.createdAt.split("T")[0].split("-").reverse().join("-") +
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

  useEffect(() => {
    dispatch(readAllNotificationsAction());
    dispatch(getAllNotificationsAction());
    dispatch(getNewNotificationsAction());
  }, [dispatch]);
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
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5, 10, 20]}
        headerClassName={() => {
          return "MuiDataGrid-colCell-center";
        }}
        cellClassName={() => {
          return "MuiDataGrid-cell-center";
        }}
        sx={{
          "& .MuiDataGrid-row.even-row": {
            backgroundColor: "#fafafa",
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
            padding: "0 10px",
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
    </Box>
  );
};

export default NotificationDetail;
