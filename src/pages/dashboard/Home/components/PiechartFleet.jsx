import { Box, Typography } from '@mui/material';
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const PiechartFleet = () => {
    const data = [
        { name: 'idle', value: 30 },
        { name: 'active', value: 50 },
        { name: 'critical', value: 20 },
    ];

    const COLORS = ['rgba(150, 150, 150, 1)', 'rgba(58, 163, 87, 1)', 'rgba(255, 101, 84, 1)'];

    // Calculate total value
    const totalValue = data.find(d => d.name === 'active')?.value || 0;

    const normalData = data.filter(entry => entry.name !== 'critical');
    const criticalData = data.filter(entry => entry.name === 'critical');

    return (
        <Box sx={{
            background: '#fff',
            borderRadius: '16px',
            padding: '1rem',
            height: '100%'
        }}>
            <Typography variant='h3' sx={{
                fontSize: {
                    xs: '16px',
                    md: '24px'
                },
                fontWeight: '600',
                textTransform: 'uppercase'
            }}>
                Your Fleet
            </Typography>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '2rem',
                position: 'relative',
                height: 'calc(100% - 3rem)' // Adjust height to fit container
            }}>
                <Box sx={{ width: '260px', height: '200px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            {/* Normal Segments */}
                            <Pie
                                data={normalData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={70}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {normalData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} stroke="none" />
                                ))}
                            </Pie>
                            {/* Critical Segment */}
                            <Pie
                                data={criticalData}
                                cx="50%"
                                cy="50%"
                                innerRadius={40}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                startAngle={-20}
                                endAngle={60}
                                cornerRadius={7}
                            >
                                {criticalData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[2]} stroke="none" />
                                ))}
                            </Pie>
                            {/* Display total value in the center */}
                            <text 
                                x="50%" 
                                y="50%" 
                                textAnchor="middle" 
                                dominantBaseline="middle" 
                                fontSize={32}
                                fontWeight={600}
                                fill="black"
                            >
                                {totalValue}
                            </text>
                            <text 
                                x="50%" 
                                y="50%" 
                                dy={20}
                                textAnchor="middle" 
                                dominantBaseline="middle" 
                                fontSize={14} 
                                fill="rgba(0, 0, 0, 0.6)"
                            >
                                active
                            </text>
                        </PieChart>
                    </ResponsiveContainer>
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px',
                    width: '150px'
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgba(150, 150, 150, 1)' }}></Box>
                        <Typography sx={{
                            fontSize: '16px',
                            fontWeight: '600',
                            textTransform: 'uppercase'
                        }}>
                            Idle
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgba(58, 163, 87, 1)' }}></Box>
                        <Typography sx={{
                            fontSize: '16px',
                            fontWeight: '600',
                            textTransform: 'uppercase'
                        }}>
                            Active
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <Box sx={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: 'rgba(255, 101, 84, 1)' }}></Box>
                        <Typography sx={{
                            fontSize: '16px',
                            fontWeight: '600',
                            textTransform: 'uppercase'
                        }}>
                            Critical
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default PiechartFleet;
