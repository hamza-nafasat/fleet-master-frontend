/* eslint-disable react/prop-types */
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import CheckIcon from "../../../../../assets/svgs/plans/CheckIcon";

const PlanCard = ({ bg, title, type, price, featuresList, description, btnBg, onClick }) => {
    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card
                // key={key}
                sx={{
                    background: 'white',
                    padding: {
                        xs: "16px 16px 40px",
                        lg: "34px 24px 60px",
                    },
                    boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.25)',
                    borderTop: `6px solid ${bg}`
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        color: "#000",
                        fontSize: {
                            xs: "18px",
                            md: "22px",
                        },
                        fontWeight: 700,
                    }}
                >
                    {title}
                </Typography>
                <Typography
                    sx={{
                        fontSize: {
                            xs: "16px",
                            md: "18px",
                        },
                        fontWeight: 600,
                        color:'#006BCB'
                    }}
                >
                    {price}
                    <Typography sx={{ fontSize: "18px", fontWeight: 400 }} variant="span">
                        /{type}
                    </Typography>
                </Typography>
                {/* Features list */}
                <Typography sx={{ marginTop: "24px", fontSize: "12px", color:'#414141B2' }}>Features</Typography>
                <Box
                    sx={{
                        marginTop: "20px",
                        display: "flex",
                        flexDirection: "column",
                        gap: "18px",
                    }}
                >
                    {featuresList.map((list, i) => (
                        <Box key={i} sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                            <CheckIcon />
                            <Typography
                                sx={{
                                    fontSize: "14px",
                                    color:'#000'
                                }}
                            >
                                {list}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                <Typography sx={{ marginTop: "24px", fontSize: "12px",color:'#414141B2' }}>Description</Typography>
                <Typography sx={{ fontSize: "14px", marginTop: "10px", color:'#000' }}>{description}</Typography>
                <CustomBtn onClick={onClick} variant="contained" sx={{ background: btnBg }}>
                    Subscribe Now
                </CustomBtn>
            </Card>
        </Grid>
    );
};

export default PlanCard;

const Card = styled(Box)({
    borderRadius: "10px",
    position: "relative",
    color: "#fff",
    flexGrow: "1",
    // width: "428px",
});

const CustomBtn = styled(Button)({
    width: "200px",
    height: "50px",
    borderRadius: "10px",
    position: "absolute",
    bottom: "-1.5rem",
    left: "50%",
    transform: "translate(-50%, 0)",
});
