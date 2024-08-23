import React from 'react';
import Card from './components/Card';
import { Box, Grid } from '@mui/material';
import PiechartFleet from './components/PiechartFleet';
import ReportChart from './components/ReportChart';
import ListOfTrucks from './components/ListOfTrucks';
import Map from './components/map/Map'
const Home = () => {
  return (
    <>
      <Box sx={{
        marginTop: '-5rem',
        width: '100%'
      }}>
        <Card />
      </Box>
      <Grid container spacing={3} sx={{ margin: 0 }}>
        <Grid item xs={12} md={4} sx={{ pl: '0 !important' }}>
          <Box sx={{ height: '300px', paddingRight: {
            xs: '24px',
            md: '0'
          } 
          }}>
            <PiechartFleet />
          </Box>
        </Grid>
        <Grid item xs={12} md={8} sx={{ paddingLeft: {
          xs: '0 !important',
          md: '24px !important'
          },
          paddingRight: '24px'
        }}>
          <Box sx={{ 
            height: '300px',
            background: '#fff',
            borderRadius: '16px',
          }}>
            <ReportChart />
          </Box>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ margin: 0 }}>
        <Grid item xs={12} md={4} lg={3} sx={{ pl: '0 !important', paddingRight: {
            xs: '24px',
            md: '0'
          } 
          }}>
          <ListOfTrucks />
        </Grid>
        <Grid item xs={12} md={8} lg={9} sx={{ paddingLeft: {
            xs: '0 !important',
            md: '24px !important'
            },
            paddingRight: '24px'
          }}>
          <Box sx={{
            background: '#fff',
            borderRadius: '12px',
            height: '300px'
          }}>
           <Map />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
