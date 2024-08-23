/* eslint-disable react/prop-types */
import { Box, Button, Grid, Typography, styled } from "@mui/material";
import CheckIcon from "../../../../../assets/svgs/plans/CheckIcon";

const PlanCard = ({ bg, title, type, price, featuresList, description, btnBg, onClick }) => {
    return (
        <Grid item xs={12} md={6} lg={4}>
            <Card
                // key={key}
                sx={{
                    background: bg,
                    padding: {
                        xs: "16px 16px 40px",
                        lg: "34px 24px 90px",
                    },
                }}
            >
                <Typography
                    variant="h2"
                    sx={{
                        color: "#fff",
                        fontSize: {
                            xs: "18px",
                            md: "26px",
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
                            md: "24px",
                        },
                        fontWeight: 600,
                    }}
                >
                    {price}
                    <Typography sx={{ fontSize: "18px", fontWeight: 400 }} variant="span">
                        /{type}
                    </Typography>
                </Typography>
                {/* Features list */}
                <Typography sx={{ marginTop: "24px", fontSize: "12px" }}>Features</Typography>
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
                                    fontSize: "16px",
                                }}
                            >
                                {list}
                            </Typography>
                        </Box>
                    ))}
                </Box>
                <Typography sx={{ marginTop: "24px", fontSize: "12px" }}>Description</Typography>
                <Typography sx={{ fontSize: "14px", marginTop: "10px" }}>{description}</Typography>
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
    height: "70px",
    borderRadius: "10px",
    position: "absolute",
    bottom: "-2rem",
    left: "50%",
    transform: "translate(-50%, 0)",
});
