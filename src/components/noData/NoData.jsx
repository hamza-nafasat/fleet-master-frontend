import { Box, styled, Typography } from '@mui/material'
import React from 'react'
import noDataPic from '../../assets/images/no-data.png'

const NoData = () => {
  return (
    <Box sx={{display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem', padding: '30px 15px'}}>
        <Image src={noDataPic} alt='image' />
        <Typography sx={{fontSize:'16px', fontWeight: 600, color: 'rgba(71, 149, 234, 1)'}}>NO DATA</Typography>
    </Box>
  )
}

export default NoData

const Image = styled('img')({
    width:'207px',
    height:'207px',
})