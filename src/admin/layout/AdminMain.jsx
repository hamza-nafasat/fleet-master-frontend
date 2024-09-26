import { Box } from '@mui/material';
import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';

const AdminMain = () => {
  const location = useLocation()

  return (
    <>
    <Box className='fadeInUp' key={location.pathname} sx={{
      padding: {
        xs: '0 16px 16px 16px',
        lg: '0 36px 36px 36px'
      }, 
      position: 'relative',
      zIndex: '10',
      marginTop: '-3rem',
      height: '100%',
      overflowX: 'clip'
    }}>
      <Outlet />
    </Box>
    </>
  );
}

export default AdminMain;
