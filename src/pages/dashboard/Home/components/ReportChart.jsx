import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Box, Typography } from '@mui/material';

const data = [
  { day: -1, crashes: 0 },
  { day: 0, crashes: 5 },
  { day: 1, crashes: 10 },
  { day: 2, crashes: 15 },
  { day: 3, crashes: 10 },
  { day: 4, crashes: 20 },
  { day: 5, crashes: 30 },
  { day: 6, crashes: 45 },
  { day: 7, crashes: 35 },
  { day: 8, crashes: 20 },
  { day: 9, crashes: 10 },
  { day: 10, crashes: 15 },
  { day: 11, crashes: 25 },
  { day: 12, crashes: 40 },
  { day: 13, crashes: 50 },
  { day: 14, crashes: 30 },
  { day: 15, crashes: 10 },
  { day: 16, crashes: 0 }
];

const ReportChart = () => {
  return (
    <Box>
      <Typography variant='h3' sx={{
            fontSize: {
                xs: '16px',
                md: '24px'
            },
            fontWeight: '600',
            textTransform: 'uppercase',
            padding: '1rem'
        }}>
            Reported Crashes on the Road
      </Typography>
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 20, right: 20, left: -20, bottom: 20 }}>
          <defs>
            <linearGradient id="colorCrashes" x1="0" y1="0" x2="0" y2="1">
              <stop offset="49.51%" stopColor="#D5E4FF" stopOpacity={1} />
              <stop offset="130.54%" stopColor="rgba(255, 255, 255, 0)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis 
            dataKey="day" 
            domain={[-1, 16]}
            tickCount={18}
            tick={{ fontSize: 12 }} 
            axisLine={false} 
            tickLine={false} 
          />
          <YAxis 
            domain={[0, 60]} 
            tickCount={7} 
            tick={{ fontSize: 12 }} 
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip />
          <Area 
            type="linear" 
            dataKey="crashes" 
            stroke="#8884d8" 
            fillOpacity={1} 
            fill="url(#colorCrashes)" 
          />
        </AreaChart>
      </ResponsiveContainer>
    </Box>
  );
}

export default ReportChart;
