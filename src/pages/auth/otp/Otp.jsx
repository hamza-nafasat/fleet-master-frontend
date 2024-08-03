import React, { useState, useRef, useEffect } from 'react'
import { Box, Grid, styled, Typography, TextField, Button } from '@mui/material'
import Icon from '../../../assets/images/login/icon.png'
import LoginBg from '../../../assets/images/login/loginbg.png'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Otp = () => {
  const [otp, setOtp] = useState(['', '', '', ''])
  const inputRefs = useRef([])
  const [timer, setTimer] = useState('60')
  const { isLoading, error, otpSent, otpVerified } = useSelector(
    (state) => state.auth,
  )
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    let interval
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else if (timer === 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [timer])

  const handleChange = (e, index) => {
    const value = e.target.value
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp]
      newOtp[index] = value
      setOtp(newOtp)
      if (index < 3) {
        inputRefs.current[index + 1].focus()
      }
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp]
      if (otp[index] !== '') {
        newOtp[index] = ''
        setOtp(newOtp)
      } else if (index > 0) {
        inputRefs.current[index - 1].focus()
        newOtp[index - 1] = ''
        setOtp(newOtp)
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      inputRefs.current[index - 1].focus()
    } else if (e.key === 'ArrowRight' && index < 3) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text')
    if (paste.length === 4 && /^[0-9]+$/.test(paste)) {
      const newOtp = paste.split('')
      setOtp(newOtp)
      newOtp.forEach((digit, idx) => {
        if (inputRefs.current[idx]) {
          inputRefs.current[idx].value = digit
        }
      })
      if (inputRefs.current[3]) {
        inputRefs.current[3].focus()
      }
      e.preventDefault()
    }
  }

  const handleTimerClick = () => {
    setTimer(60)
  }
  const handleSubmit = () => {
    console.log('submittttttttttttt')
  }
  return (
    <>
      <Main container>
        <Grid
          item
          md={8}
          sx={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h5" sx={{ mb: 2 }}>
            Enter OTP
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 5 }}>
            {otp.map((value, index) => (
              <TextField
                key={index}
                inputRef={(el) => (inputRefs.current[index] = el)}
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onPaste={handlePaste}
                inputProps={{
                  maxLength: 1,
                  style: { textAlign: 'center', fontSize: '24px' },
                }}
                sx={{ width: '50px', height: '50px' }}
              />
            ))}
          </Box>
          <Button
            size="medium"
            sx={{
              color: '#fff',
              width: '150px',
            }}
            onClick={handleSubmit}
          >
            Verify
          </Button>
          {timer > 0 ? (
            <Typography sx={{ mt: 2 }}>Time remaining: {timer}s</Typography>
          ) : (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mt: 2,
                gap: '3px',
              }}
            >
              Didn't get a verification code?
              <Typography
                sx={{
                  background: 'transparent',
                  padding: 0,
                  fontWeight: 500,
                  cursor: 'pointer',
                  color: '#006bce',
                  fontSize: '14px',
                  '&:hover': {
                    fontWeight: 600,
                  },
                }}
                onClick={handleTimerClick}
              >
                Resend
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid
          item
          md={4}
          sx={{
            height: '100vh',
            width: '100%',
            backgroundImage: `url(${LoginBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            display: {
              xs: 'none',
              md: 'block',
            },
          }}
        >
          <Box
            sx={{
              height: '100%',
              width: '100%',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <Box
              sx={{
                height: '60%',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={Icon} alt="icon" width="200" height="150" />
              <Typography
                sx={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 18,
                  mt: 2,
                }}
              >
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum.
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Main>
    </>
  )
}

export default Otp

const Main = styled(Grid)({
  height: '100vh',
  display: 'flex',
})
