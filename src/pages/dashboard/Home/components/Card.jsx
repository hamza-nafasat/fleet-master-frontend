import PropTypes from "prop-types";
import fleetIcon from "../../../../assets/images/cards/your-fleet-truck.png";
import assignIcon from "../../../../assets/images/cards/vehicle-assignment-truck.png";
import issuesIcon from "../../../../assets/images/cards/issues-truck.png";
import alarmsIcon from "../../../../assets/images/cards/alarms-vehicle.png";
import { Box, Grid, Stack, Typography, styled } from "@mui/material";

const Card = ({ dashboardData }) => {
  const cardsData = [
    {
      title: "Your Fleet",
      subtitleOneTxt: "Vehicles",
      subtitleOneValue: dashboardData?.totalTrucks || 0,
      subtitleTwoTxt: "Drivers",
      subtitleTwoValue: dashboardData?.totalDrivers || 0,
      Icon: fleetIcon,
    },
    {
      title: "Vehicle Assignment",
      subtitleOneTxt: "Assigned",
      subtitleOneValue: dashboardData?.totalAssignedTrucks || 0,
      subtitleTwoTxt: "Unassigned",
      subtitleTwoValue: dashboardData?.totalUnAssignedTrucks || 0,
      Icon: assignIcon,
    },
    {
      title: "Devices & Employees",
      subtitleOneTxt: "Devices",
      subtitleOneValue: dashboardData?.totalDevices || 0,
      subtitleTwoTxt: "Employees",
      subtitleTwoValue: dashboardData?.totalEmployees || 0,
      Icon: issuesIcon,
    },
    {
      title: "Alarms",
      subtitleOneValue: dashboardData?.totalAlarms || 0,
      Icon: alarmsIcon,
    },
  ];

  return (
    <Grid container spacing={2} justifyContent="space-between">
      {cardsData.map((card, index) => (
        <Grid item xs={12} lg={6} xl={3} key={index}>
          <InnerCard>
            <Stack justifyContent="space-between" spacing={4}>
              {/* Card Title */}
              <Typography
                variant="h6"
                fontSize={16}
                fontWeight="600"
                color="#000"
              >
                {card.title}
              </Typography>

              {/* Card Content */}
              <Stack direction="row" alignItems="center" spacing={2}>
                <Stack>
                  {/* First Subtitle Value */}
                  <Typography
                    variant="h4"
                    fontWeight="500"
                    color="rgba(0, 107, 206, 1)"
                  >
                    {card.subtitleOneValue}
                  </Typography>
                  {/* First Subtitle Text */}
                  {card.subtitleOneTxt && (
                    <SubtitleText text={card.subtitleOneTxt} />
                  )}
                </Stack>

                <Stack>
                  {/* Second Subtitle Value */}
                  {card.subtitleTwoValue !== undefined && (
                    <Typography
                      variant="h4"
                      fontWeight="500"
                      color="rgba(0, 107, 206, 1)"
                    >
                      {card.subtitleTwoValue}
                    </Typography>
                  )}
                  {/* Second Subtitle Text */}
                  {card.subtitleTwoTxt && (
                    <Typography>
                      <SubtitleText text={card.subtitleTwoTxt} />
                    </Typography>
                  )}
                </Stack>
              </Stack>
            </Stack>

            {/* Card Icon */}
            <Box>
              <img src={card.Icon} alt={`${card.title} icon`} />
            </Box>
          </InnerCard>
        </Grid>
      ))}
    </Grid>
  );
};

// SubtitleText Component for conditional rendering of text with optional colored dots
const SubtitleText = ({ text }) => {
  const getDotColor = (text) => {
    switch (text) {
      case "Critical":
        return "#ff6454";
      case "Idle":
        return "#969696";
      case "Overdue":
        return "#edec0b";
      default:
        return null;
    }
  };

  const dotColor = getDotColor(text);

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      {dotColor && (
        <Box
          sx={{
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            backgroundColor: dotColor,
          }}
        />
      )}
      <Typography
        variant="body2"
        color="rgba(17, 17, 17, 0.6)"
        sx={{ marginTop: 0 }}
        fontSize={14}
      >
        {text}
      </Typography>
    </Stack>
  );
};

SubtitleText.propTypes = {
  text: PropTypes.string.isRequired,
};

// Styling for the inner card
const InnerCard = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  [theme.breakpoints.between(1500, 1600)]: {
    flexWrap: "wrap",
  },

  alignItems: "center",
  padding: "16px",
  minHeight: "180px",
  borderRadius: "16px",
  boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
  backgroundColor: "#fff",
  [theme.breakpoints.up("sm")]: {
    gap: "1rem",
  },
  height: "100%",
}));

// PropTypes for validation
Card.propTypes = {
  dashboardData: PropTypes.shape({
    totalTrucks: PropTypes.number,
    totalDrivers: PropTypes.number,
    totalAssignedTrucks: PropTypes.number,
    totalUnAssignedTrucks: PropTypes.number,
    totalDevices: PropTypes.number,
    totalEmployees: PropTypes.number,
    totalAlarms: PropTypes.number,
  }),
};

export default Card;
