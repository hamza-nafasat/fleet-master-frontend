/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Box, Grid, Typography } from "@mui/material";
import { Fragment, useState } from "react";
import thumbnailPng from "../../../../../../assets/images/thumbnail.png";
import CloseIcon from "../../../../../../assets/svgs/modal/CloseIcon";

const SdCardModal = ({ liveUrl, onClose }) => {
  const [layout, setLayout] = useState("layout1");
  const handleChangeLayout = (newLayout) => {
    setLayout(newLayout);
  };

  const getGridItemSize = (layout, i) => {
    if (layout === "layout1" && i === 0) {
      return 12;
    }
    switch (layout) {
      case "layout1":
        return 3.98;
      case "layout2":
        return 6;
      case "layout3":
        return 3.98;
      default:
        return 4;
    }
  };

  const channels = [
    {
      url: thumbnailPng,
      name: "CHANNEL 1",
    },
    {
      url: thumbnailPng,
      name: "CHANNEL 2",
    },
    {
      url: thumbnailPng,
      name: "CHANNEL 3",
    },
    {
      url: thumbnailPng,
      name: "CHANNEL 4",
    },
  ];

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          color: "rgba(0, 107, 206, 1)",
          fontSize: "24px",
          fontWeight: 600,
          textAlign: "center",
        }}
      >
        SD CARD REMOVAL
      </Box>
      <Box
        sx={{ textAlign: "center", cursor: "pointer", position: "absolute", top: "10px", right: "10px" }}
        onClick={onClose}
      >
        <CloseIcon />
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
        <LayoutOne click={() => handleChangeLayout("layout1")} />
        <LayoutTwo click={() => handleChangeLayout("layout2")} />
        <LayoutThree click={() => handleChangeLayout("layout3")} />
      </Box>
      <Grid container spacing={2} mt={3}>
        {channels.map((channel, i) => (
          <Grid
            item
            xs={getGridItemSize(layout, i)}
            key={i}
            sx={{ transition: "all cubic-bezier(0.19, 1, 0.22, 1) 1s" }}
          >
            {
              <iframe
                width="100%"
                height="250"
                src={liveUrl}
                title="Live Stream"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            }
            <Typography sx={{ textAlign: "center", fontWeight: 600 }}>{channel.name}</Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default SdCardModal;

const LayoutOne = ({ click }) => {
  return (
    <Box
      onClick={click}
      sx={{
        width: "80px",
        height: "40px",
        background: "rgba(0, 107, 206, 1)",
        borderRadius: "8px",
        cursor: "pointer",
      }}
    ></Box>
  );
};
const LayoutTwo = ({ click }) => {
  return (
    <Box
      onClick={click}
      sx={{
        width: "44px",
        height: "40px",
        cursor: "pointer",
        display: "flex",
        flexWrap: "wrap",
        gap: "4px",
      }}
    >
      <Box
        sx={{
          background: "rgba(0, 107, 206, 1)",
          borderRadius: "4px",
          width: "18px",
          height: "18px",
        }}
      ></Box>
      <Box
        sx={{
          background: "rgba(0, 107, 206, 1)",
          borderRadius: "4px",
          width: "18px",
          height: "18px",
        }}
      ></Box>
      <Box
        sx={{
          background: "rgba(0, 107, 206, 1)",
          borderRadius: "4px",
          width: "18px",
          height: "18px",
        }}
      ></Box>
      <Box
        sx={{
          background: "rgba(0, 107, 206, 1)",
          borderRadius: "4px",
          width: "18px",
          height: "18px",
        }}
      ></Box>
    </Box>
  );
};
const LayoutThree = ({ click }) => {
  return (
    <Box
      onClick={click}
      sx={{
        width: "64px",
        height: "40px",
        cursor: "pointer",
        display: "flex",
        flexWrap: "wrap",
        gap: "4px",
      }}
    >
      <Box
        sx={{
          background: "rgba(0, 107, 206, 1)",
          borderRadius: "4px",
          width: "18px",
          height: "18px",
        }}
      ></Box>
      <Box
        sx={{
          background: "rgba(0, 107, 206, 1)",
          borderRadius: "4px",
          width: "18px",
          height: "18px",
        }}
      ></Box>
      <Box
        sx={{
          background: "rgba(0, 107, 206, 1)",
          borderRadius: "4px",
          width: "18px",
          height: "18px",
        }}
      ></Box>
      <Box
        sx={{
          background: "rgba(0, 107, 206, 1)",
          borderRadius: "4px",
          width: "18px",
          height: "18px",
        }}
      ></Box>
      <Box
        sx={{
          background: "rgba(0, 107, 206, 1)",
          borderRadius: "4px",
          width: "18px",
          height: "18px",
        }}
      ></Box>
      <Box
        sx={{
          background: "rgba(0, 107, 206, 1)",
          borderRadius: "4px",
          width: "18px",
          height: "18px",
        }}
      ></Box>
    </Box>
  );
};
