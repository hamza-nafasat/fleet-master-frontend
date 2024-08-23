import { Box, Button, Grid, styled, MenuItem, TextField, Typography, FormControlLabel, Checkbox, FormGroup } from '@mui/material'
import React, { useState } from 'react'
import BackIcon from '../../../../../assets/svgs/modal/BackIcon'
import CloseIcon from '../../../../../assets/svgs/modal/CloseIcon'
import { roles } from '../../../../../data/data'
import { regions } from '../../../../../data/data'

const EditAlert = ({ onClose, label, maxLength, type }) => {
    const [selected, setSelected] = useState('On Platform');

    const handleChange = (event) => {
        setSelected(event.target.name);
    };

  
  return (
    <>
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
             <Box sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                color: 'rgba(17, 17, 17, 1)',
                fontSize: {
                    xs: '1rem',
                    md: '1.5rem'
                },
                fontWeight: 600
             }}>
                <Box sx={{cursor: 'pointer', height: '25px'}} onClick={onClose}>
                    <BackIcon />
                </Box>
                EDIT ALERT
             </Box>
             <Box sx={{cursor: 'pointer'}} onClick={onClose}>
                <CloseIcon onClick={onClose} />
            </Box>  
        </Box>
        {/* Form  */}
        <Box sx={{
            display: 'flex',
            flexGrow: 1,
            marginTop: {
                xs: '1rem',
                lg: '2.5rem',
            }
        }}>
            <Box sx={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                <Grid container spacing='16'>
                    <Grid item xs='12' lg='6'>
                        <TextField 
                            select
                            fullWidth
                            label='Role'
                        >
                            {roles.map((role, i) => (
                                <MenuItem key={i} value={role.role}>
                                    {role.role}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs='12' lg='6'>
                        <TextField 
                            select
                            fullWidth
                            label='Region'
                        >
                            {regions.map((region, i) => (
                                <MenuItem key={i} value={region.region}>
                                    {region.region}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs='12' mt={3}>
                        <Typography sx={{
                            color: 'rgba(17, 17, 17, 1)',
                            fontSize: '16px',
                            fontWeight: 600
                        }}>
                            NOTIFICATION TYPE*
                        </Typography>
                        <FormGroup row>
                            <FormControlLabel
                                sx={{color: 'rgba(17, 17, 17, 1)', fontWeight: 600}}
                                control={
                                    <Checkbox
                                    checked={selected === 'Email'}
                                    onChange={handleChange}
                                    name="Email"
                                    />
                                }
                                label="Email"
                            />
                            <FormControlLabel
                                sx={{color: 'rgba(17, 17, 17, 1)', fontWeight: 600}}
                                control={
                                    <Checkbox
                                    checked={selected === 'On Platform'}
                                    onChange={handleChange}
                                    name="On Platform"
                                    />
                                }
                                label="On Platform"
                                />
                        </FormGroup>
                    </Grid>
                </Grid>
                <Box sx={{
                    display: 'flex',
                    alignItems: 'flex-end',
                    gap: '1rem',
                    justifyContent: 'flex-end',
                    flexGrow: 1,
                }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <CancelBtn onClick={onClose}>Cancel</CancelBtn>
                        <Button sx={{
                            color: '#fff',
                            borderRadius: '16px',
                            width: '137px',
                            padding: '16px'
                        }}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    </>
  )
}

export default EditAlert

const CancelBtn = styled('span')({
    fontsize: '16px',
    fontWeight: 600,
    color: 'rgba(17, 17, 17, 1)',
    cursor: 'pointer',
})