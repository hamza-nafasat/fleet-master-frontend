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
import { adminDashboardDetailsAction } from "../../../../../redux/actions/admin.actions";
import {
  deleteNotificationAction,
  getAllNotificationsAction,
  getNewNotificationsAction,
  readAllNotificationsAction,
} from "../../../../../redux/actions/notification.actions";
import NoData from "../../../../../components/noData/NoData";
<<<<<<< Updated upstream
import { IoCheckmarkOutline } from "react-icons/io5";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
=======
>>>>>>> Stashed changes

const NotificationDetail = () => {
  const dispatch = useDispatch();
  const [isDelLoading, setIsDelLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0); // Note: DataGrid uses 0-based index for pagination
  const [pageSize, setPageSize] = useState(12); // Rows per page
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
<<<<<<< Updated upstream
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
=======
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%", gap: 3 }}>
          <DeleteIcon onClick={() => handleDeleteList(params.row)} isLoading={isDelLoading} />
>>>>>>> Stashed changes
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
          <Link>
            <IoCheckmarkOutline
              style={{
                fontSize: "1.6rem",
                cursor: "pointer",
              }}
            />
            {/* In case of read */}
            {/* <IoCheckmarkDoneOutline
              style={{
                fontSize: "1.6rem",
                cursor: "pointer",
                color: "#75beff",
              }}
            /> */}
          </Link>
        </Box>
      ),
    },
  ];

  useEffect(() => {
    if (notifications) {
      setRows(
        notifications.map((notification) => ({
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
        }))
      );
    }
  }, [notifications]);

  const enterInPage = useCallback(async () => {
    await Promise.all([
      dispatch(readAllNotificationsAction()),
      dispatch(getAllNotificationsAction()),
      dispatch(getNewNotificationsAction()),
    ]);
  }, [dispatch]);

  useEffect(() => {
    enterInPage();
  }, [enterInPage]);

  const handlePageChange = (params) => {
    setPage(params.page);
  };

  const handlePageSizeChange = (params) => {
    setPageSize(params.pageSize);
  };

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
<<<<<<< Updated upstream
      {notifications.length > 0 ? (
        <div style={{ height: "70%", width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pagination
            paginationMode="client"
            page={page}
            pageSize={pageSize}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
            rowCount={rows.length}
            rowsPerPageOptions={[5, 10, 12, 20, 50]}
            disableColumnMenu
            disableSelectionOnClick
            sx={{
              "& .MuiDataGrid-row.even-row": {
                backgroundColor: "#fafafa",
=======
      {notifications?.length > 0 ? (
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
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
              "& .MuiDataGrid-overlay": {
                borderTopLeftRadius: "24px",
                borderTopRightRadius: "24px",
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
        </div>
=======
            },
          }}
        />
>>>>>>> Stashed changes
      ) : (
        <NoData />
      )}
    </Box>
  );
};

export default NotificationDetail;
