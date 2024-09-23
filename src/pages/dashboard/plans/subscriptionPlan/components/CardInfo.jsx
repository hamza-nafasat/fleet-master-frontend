/* eslint-disable react/prop-types */
import { Box, Typography, styled } from "@mui/material";
import CheckIcon from "../../../../../assets/svgs/plans/CheckIcon";

const CardInfo = ({ card }) => {
    return (
        <Card
            sx={{
                background: "#fff",
                padding: "24px 16px",
                boxShadow: '0px 0px 6px 0px rgba(0, 0, 0, 0.25)'
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    color: "#000",
                    textAlign: "center",
                    fontSize: "16px",
                }}
            >
                {card.title}
            </Typography>
            <Typography
                sx={{
                    textAlign: "center",
                    fontSize: "16px",
                    fontWeight: 600,
                    color: '#006BCB'
                }}
            >
                {card.price}
                <Typography sx={{ fontSize: "18px", fontWeight: 400 }} variant="span">
                    /{card.type}
                </Typography>
            </Typography>
            {/* Features list */}
            <Typography sx={{ marginTop: "12px", fontSize: "8px", color:'#414141B2' }}>Features</Typography>
            <Box
                sx={{
                    marginTop: "11px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                }}
            >
                {card.featuresList.map((list, i) => (
                    <Box key={i} sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <CheckIcon width={13} />
                        <Typography
                            sx={{
                                fontSize: "9px",
                                color: '#000'
                            }}
                        >
                            {list}
                        </Typography>
                    </Box>
                ))}
            </Box>
            <Typography sx={{ marginTop: "12px", fontSize: "8px",color:'#414141B2' }}>Description</Typography>
            <Typography sx={{ fontSize: "8px", marginTop: "11px", color: '#000' }}>{card.description}</Typography>
        </Card>
    );
};

export default CardInfo;

const Card = styled(Box)({
    borderRadius: "10px",
    position: "relative",
    color: "#fff",
    width: "330px",
    "@media (max-width:576px)": {
        width: "100%",
    },
});
