import { Box, Table, TableBody, TableCell, TableHead, TableRow, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { subscriptionListAction } from "../../../../redux/actions/subscription.action";

const SubscriptionHistory = () => {
  const dispatch = useDispatch();
  const { subscriptionList } = useSelector((state) => state.subscription);
  const [rows, setRows] = useState([]);

  const headCells = ["NAME", "CustomerId", "START DATE", "END DATE", "STATUS"];

  useEffect(() => {
    dispatch(subscriptionListAction());
  }, [dispatch]);
  useEffect(() => {
    if (subscriptionList?.length > 0) {
      setRows(subscriptionList);
    }
  }, [subscriptionList]);
  return (
    <TableBox>
      <Table>
        <TableHead>
          <TableRow>
            {headCells?.map((cell, i) => (
              <TableCell align="center" key={i}>
                <TypographyOne sx={{ color: "rgba(17, 17, 17, 1)", fontWeight: 600 }}>{cell}</TypographyOne>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((tableRow, i) => (
            <TableRow key={i}>
              <TableCell align="center">
                <TypographyOne>{`${tableRow?.user?.firstName} ${tableRow?.user?.lastName}`}</TypographyOne>
              </TableCell>
              <TableCell align="center">
                <TypographyOne>{`${tableRow?.stripeCustomerId}`}</TypographyOne>
              </TableCell>
              <TableCell align="center">
                <TypographyOne>{new Date(tableRow?.subscriptionStartDate).toLocaleString()}</TypographyOne>
              </TableCell>
              <TableCell align="center">
                <TypographyOne>{new Date(tableRow?.subscriptionEndDate).toLocaleString()}</TypographyOne>
              </TableCell>
              <TableCell align="center">
                <TypographyOne
                  sx={{
                    borderRadius: ".5rem",
                    background:
                      tableRow.subscriptionStatus === "active"
                        ? "rgba(80, 212, 80, 1)"
                        : "rgba(255, 0, 0, 1)",
                    color: tableRow.subscriptionStatus === "active" ? "#000" : "#fff",
                    fontWeight: tableRow.subscriptionStatus === "active" ? 600 : 400,
                    display: "inline",
                    padding: ".5rem .9375rem",
                  }}
                >
                  {tableRow.subscriptionStatus}
                </TypographyOne>
              </TableCell>
              <TableCell align="center">
                <TypographyOne sx={{ cursor: "pointer" }}>{tableRow.invoice}</TypographyOne>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableBox>
  );
};

export default SubscriptionHistory;

const TypographyOne = styled(Typography)({
  fontSize: "1rem",
  color: "rgba(17, 17, 17, 0.6)",
});

const TableBox = styled(Box)({
  background: "#fff",
  borderRadius: "1.5rem 1.5rem 0 0",
  marginTop: "-64px",
  height: "100%",
  padding: "1.875rem 0",
});
