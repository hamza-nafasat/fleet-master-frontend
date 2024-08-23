import React from 'react'
import fleetIcon from '../../../../assets/images/cards/your-fleet-truck.png'
import assignIcon from '../../../../assets/images/cards/vehicle-assignment-truck.png'
import issuesIcon from '../../../../assets/images/cards/issues-truck.png'
import alarmsIcon from '../../../../assets/images/cards/alarms-vehicle.png'
import { Box, Stack, Typography, styled } from '@mui/material'

const Card = () => {
  const cardsData = [
    {
      title: 'Your Fleet',
      subtitleOneTxt: 'Vehicles',
      subtitleOneValue: '254',
      subtitleTwoTxt: 'Drivers',
      subtitleTwoValue: '230',
      Icon: fleetIcon,
    },
    {
      title: 'Vehicle Assignment',
      subtitleOneTxt: 'Assigned',
      subtitleOneValue: '230',
      subtitleTwoTxt: 'Unassigned',
      subtitleTwoValue: '24',
      Icon: assignIcon,
    },
    {
      title: 'Issues',
      subtitleOneTxt: 'Idle',
      subtitleOneValue: '32',
      subtitleTwoTxt: 'Overdue',
      subtitleTwoValue: '24',
      Icon: issuesIcon,
    },
    {
      title: 'Alarms',
      subtitleOneTxt: 'Critical',
      subtitleOneValue: '8',
      Icon: alarmsIcon,
    },
  ]

  return (
    <>
      <Stack
        direction={{
          xs: 'column',
          md: 'row',
        }}
        justifyContent="space-between"
        flexWrap="wrap"
        sx={{ gap: '1.5rem' }}
      >
        {cardsData.map((card, i) => (
          <InnerCard key={i}>
            <Stack justifyContent="space-between" sx={{ gap: '3rem' }}>
              <Typography
                variant="h2"
                sx={{
                  fontSize: {
                    xs: '18px',
                    md: '20px',
                  },
                  fontWeight: '600',
                  color: '#000',
                }}
              >
                {card.title}
              </Typography>
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  gap: {
                    xs: '1rem',
                    md: '4rem',
                  },
                }}
              >
                <Stack sx={{ gap: '2px' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: {
                        xs: '30px',
                        md: '40px',
                      },
                      fontWeight: '500',
                      lineHeight: '24px',
                      color: 'rgba(0, 107, 206, 1)',
                    }}
                  >
                    {card.subtitleOneValue}
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ gap: '4px' }}
                  >
                    {card.subtitleOneTxt === 'Critical' && (
                      <Box
                        sx={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#ff6454',
                        }}
                      ></Box>
                    )}
                    {card.subtitleOneTxt === 'Idle' && (
                      <Box
                        sx={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#969696',
                        }}
                      ></Box>
                    )}
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '16px',
                        fontWeight: '400',
                        color: 'rgba(17, 17, 17, 0.6)',
                        marginTop: '0 !important',
                      }}
                    >
                      {card?.subtitleOneTxt}
                    </Typography>
                  </Stack>
                </Stack>
                <Stack sx={{ gap: '2px' }}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: {
                        xs: '30px',
                        md: '40px',
                      },
                      fontWeight: '500',
                      lineHeight: '24px',
                      color: 'rgba(0, 107, 206, 1)',
                    }}
                  >
                    {card?.subtitleTwoValue}
                  </Typography>
                  <Stack
                    direction="row"
                    alignItems="center"
                    sx={{ gap: '4px' }}
                  >
                    {card.subtitleTwoTxt === 'Overdue' && (
                      <Box
                        sx={{
                          width: '8px',
                          height: '8px',
                          borderRadius: '50%',
                          background: '#edec0b',
                        }}
                      ></Box>
                    )}
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: '16px',
                        fontWeight: '400',
                        color: 'rgba(17, 17, 17, 0.6)',
                        marginTop: '0 !important',
                      }}
                    >
                      {card?.subtitleTwoTxt}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
            <Box>
              <img src={card.Icon} alt="truck image" />
            </Box>
          </InnerCard>
        ))}
      </Stack>
    </>
  )
}

export default Card

const InnerCard = styled('Box')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '0',
  width: '100%',
  minWidth: '290px',
  overflow: 'hidden',
  [theme.breakpoints.up('sm')]: {
    gap: '2rem',
    width: 'unset',
  },
  minHeight: '180px',
  borderRadius: '16px',
  boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
  padding: '16px',
  flexGrow: 1,
  background: '#fff',
}))
