/* eslint-disable react/prop-types */
import { Box, Typography, styled } from "@mui/material";
import CheckIcon from "../../../../../assets/svgs/plans/CheckIcon";

const CardInfo = ({ card }) => {
    return (
        <Card
            sx={{
                background: card.bg,
                padding: "24px 16px",
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    color: "#fff",
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
                }}
            >
                {card.price}
                <Typography sx={{ fontSize: "18px", fontWeight: 400 }} variant="span">
                    /{card.type}
                </Typography>
            </Typography>
            {/* Features list */}
            <Typography sx={{ marginTop: "12px", fontSize: "8px" }}>Features</Typography>
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
                            }}
                        >
                            {list}
                        </Typography>
                    </Box>
                ))}
            </Box>
            <Typography sx={{ marginTop: "12px", fontSize: "8px" }}>Description</Typography>
            <Typography sx={{ fontSize: "8px", marginTop: "11px" }}>{card.description}</Typography>
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
