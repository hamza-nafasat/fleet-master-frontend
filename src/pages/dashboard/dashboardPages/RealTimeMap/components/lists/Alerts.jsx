import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material'
import React, { useState } from 'react'
import CancelIcon from '../../../../../../assets/svgs/map/CancelIcon'
import ListOfTrucks from './ListOfTrucks';

const Alerts = () => {
  const [showAlerts, setShowAlerts] = useState(false);

  const alertList = (alert, truck, date, ack) => {
    return { alert, truck, date, ack }
  }

  const alertRows = [
    alertList('SD Card Removal', '500049', '2024-04-14 02:31:23', 'cancel'),
    alertList('SD Card Removal', '500049', '2024-04-14 02:31:23', 'cancel'),
    alertList('SD Card Removal', '500049', '2024-04-14 02:31:23', 'cancel'),
    alertList('SD Card Removal', '500049', '2024-04-14 02:31:23', 'cancel'),
    alertList('SD Card Removal', '500049', '2024-04-14 02:31:23', 'cancel'),
    alertList('SD Card Removal', '500049', '2024-04-14 02:31:23', 'cancel'),
  ];

  const visibleAlertRows = showAlerts ? alertRows : alertRows.slice(0, 4);

  const toggleAlerts = () => {
    setShowAlerts(!showAlerts)
  }
  return (
    <Box>
      <Typography
        variant="h3"
        sx={{
          fontSize: {
            xs: '16px',
            md: '24px',
          },
          fontWeight: '600',
          textTransform: 'uppercase',
        }}
      >
        LISTS OF ALERTS
      </Typography>
      <Box sx={{ marginTop: '16px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <HeadTableCell>Type Of Alerts</HeadTableCell>
              <HeadTableCell>Truck</HeadTableCell>
              <HeadTableCell>Date</HeadTableCell>
              <HeadTableCell>Ack</HeadTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleAlertRows.map((alert, i) => (
              <TableRow key={i}>
                <BodyTableCell>{alert.alert}</BodyTableCell>
                <BodyTableCell>{alert.truck}</BodyTableCell>
                <BodyTableCell>{alert.date}</BodyTableCell>
                <BodyTableCell>
                  {alert.ack === 'cancel' && <CancelIcon />}
                </BodyTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {!showAlerts && (
          <Box
          sx={{
            fontSize: '16px',
            fontWeight: 600,
            color: 'rgba(0, 25, 51, 1)',
            textDecoration: 'underline',
            textAlign: 'center',
            cursor: 'pointer'
          }}
          onClick={toggleAlerts}
        >
          ALL ALERTS
        </Box>
        )}
      </Box>
      <ListOfTrucks />
    </Box>
  )
}

export default Alerts

const HeadTableCell = styled(TableCell)({
  fontSize: '16px',
  fontWeight: 600,
  borderBottom: '1px solid rgba(17, 17, 17, 0.1)',
  color: 'rgba(17, 17, 17, 1)',
  textTransform: 'uppercase',
  padding: '0 0 16px 0',
})

const BodyTableCell = styled(TableCell)({
  padding: '7px 5px',
  borderBottom: '0',
})
