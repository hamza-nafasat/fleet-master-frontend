import { TextField } from '@mui/material'
import React from 'react'

const InputField = ({ type, label, maxLength, value, change, labelProps }) => {
  return (
    <>
        <TextField 
            label={label}
            variant='outlined'
            fullWidth
            type={type}
            value={value}
            onChange={change}
            InputLabelProps={{
                shrink: labelProps,
            }}
            inputProps={{ maxLength: maxLength }}
        />
    </>
  )
}

export default InputField