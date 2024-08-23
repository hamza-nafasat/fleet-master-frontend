import { Box } from "@mui/material";
import Loader from "../../assets/svgs/Loader";

const GlobalLoader = () => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
                width: "100vw",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1500,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
            }}
        >
            <Loader />
        </Box>
    );
};

export default GlobalLoader;
