import { useState } from "react";
import { Tabs, Tab, Box, Typography, Divider, Grid } from "@mui/material";
import { planCards } from "../../../../data/data";
import PlanCard from "./components/PlanCard";
import ReviewCard from "./components/ReviewCard";
import { useSelector } from "react-redux";

const SubscriptionPlan = () => {
  const { user } = useSelector((state) => state.user);
  const [selectedTab, setSelectedTab] = useState("plans");
  const [selectedCard, setSelectedCard] = useState(null);

  const handleChangeTabs = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setSelectedTab("reviews");
  };

  return (
    <Box
      sx={{
        width: "100%",
        background: "#fff",
        borderRadius: "24px",
        padding: { xs: "16px", md: "35px 35px 55px" },
        marginTop: "-4rem",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Tabs
          value={selectedTab}
          onChange={handleChangeTabs}
          aria-label="subscription plan tabs"
          sx={{
            "& .MuiTabs-indicator": {
              display: "none",
            },
            "& .MuiTab-root": {
              minWidth: {
                xs: "118px",
                md: "150px",
              },
              borderRadius: "10px",
              backgroundColor: "#e3f2fd",
              color: "black",
              border: selectedTab === "plans" ? "1px solid rgba(49, 39, 91, 1)" : "1px solid rgba(0, 103, 194, 1)",
              "&.Mui-selected": {
                backgroundColor: "#1976d2",
                color: "white",
                border: "none",
              },
            },
          }}
        >
          <Tab label="PRICE PLANS" value="plans" />
          <Divider
            orientation="vertical"
            flexItem
            sx={{
              height: "48px",
              background: selectedTab === "plans" ? "rgba(49, 39, 91, 1)" : "rgba(0, 103, 194, 1)",
              width: "2px",
              margin: "0 22px",
              transform: "rotate(90deg)",
            }}
          />
          <Tab label="REVIEW" value="reviews" disabled={!selectedCard} />
        </Tabs>
      </Box>
      <Typography sx={{ color: "#000", fontSize: "20px", fontWeight: 600, marginTop: "3rem" }}>
        {selectedTab === "plans" ? "Choose Plan" : "Review Order"}
      </Typography>
      <Grid container spacing={2} sx={{ display: "flex", rowGap: "3rem", marginTop: "1rem" }}>
        {selectedTab === "plans" &&
          planCards.map((card, i) => (
            <PlanCard
              title={card.title}
              price={card.price}
              featuresList={card.featuresList}
              description={card.description}
              bg={card.bg}
              type={card.type}
              btnBg={card.btnBg}
              key={i}
              subscription={user?.subscriptionId}
              onClick={() => handleCardClick(card)}
            />
          ))}
        {selectedTab === "reviews" && <ReviewCard card={selectedCard} />}
      </Grid>
    </Box>
  );
};

export default SubscriptionPlan;
