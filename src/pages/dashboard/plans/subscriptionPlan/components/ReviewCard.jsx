/* eslint-disable react/prop-types */
import { Box, Button, CircularProgress, Grid, Typography, styled } from "@mui/material";
import { useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import { toast } from "react-toastify";
import PinIcon from "../../../../../assets/svgs/plans/PinIcon";
import { customAxios } from "../../../../../utils/customAxios";
import CardInfo from "./CardInfo";

const ReviewCard = ({ card }) => {
  const [loading, setLoading] = useState(false);
  const stripe = useStripe();
  const totalAmount = parseFloat(card.price.replace("$", ""));
  const taxAmount = totalAmount * (30 / 100);
  const flooredTax = Math.floor(taxAmount * 100) / 100;
  const tax = flooredTax.toFixed(2);
  const price = totalAmount + flooredTax;
  const totalPrice = price.toFixed(2);

  const subscriptionHandler = async () => {
    try {
      setLoading(true);
      const plan = card?.type;
      if (!plan) return toast.error("Please select a plan");
      const response = await customAxios.post("/subscription/create-session", { plan });
      const data = response.data;
      console.log("response data getted", data);
      //   dispatch(createStripeSessionSuccess(data));
      const sessionId = data.sessionId;
      const redirectUrl = data.redirect_url;
      if (redirectUrl) window.location.href = redirectUrl;
      if (sessionId) await redirectToCheckout(sessionId, stripe);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const redirectToCheckout = async (sessionId, stripe) => {
    try {
      if (!stripe) return toast.error("Stripe is not loaded");
      if (!sessionId) return toast.error("Session id not found");
      await stripe.redirectToCheckout({
        sessionId,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        sx={{
          color: "rgba(17, 17, 17, 0.6)",
          fontSize: "14px",
          fontWeight: 600,
          marginTop: "36px",
        }}
      >
        REVIEW ORDER
      </Typography>
      <GridContainer container>
        <Grid item xs={12} md={4}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "9px" }}>
            <PinIcon />
            <TypographyOne>Billing Address:</TypographyOne>
          </Box>
          <TypographyOne sx={{ fontWeight: 600, margin: "16px 0" }}>
            5678 Maple Avenue, Anytown, CA, 90210, USA
          </TypographyOne>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <TypographyOne>Plan Selected:</TypographyOne>
            <TypographyOne sx={{ fontWeight: 600 }}>{card.title}</TypographyOne>
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "16px 0",
            }}
          >
            <TypographyOne>Monthly Fee:</TypographyOne>
            <TypographyOne sx={{ fontWeight: 600 }}>{card.price}</TypographyOne>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <TypographyOne>Tax:</TypographyOne>
            <TypographyOne sx={{ fontWeight: 600 }}>${tax}</TypographyOne>
          </Box>
          <Divider></Divider>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <TypographyOne>Total Monthly Charge:</TypographyOne>
            <TypographyOne sx={{ fontWeight: 600 }}>${totalPrice}</TypographyOne>
          </Box>
        </Grid>
        <Grid item xs={12} md={8} display="flex" justifyContent="flex-end">
          <CardInfo card={card} />
        </Grid>
      </GridContainer>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "24px",
        }}
      >
        <Button
          disabled={loading}
          onClick={subscriptionHandler}
          sx={{
            color: "#fff",
            width: "249px",
            height: "56px",
            borderRadius: "8px",
            "&:disabled": { color: "white", cursor: "not-allowed", opacity: 0.5 },
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ mx: 2, color: "#fff" }} /> : ""}
          CONTINUE & SUBSCRIBE
        </Button>
      </Box>
    </Box>
  );
};

export default ReviewCard;

const GridContainer = styled(Grid)({
  background: "rgba(49, 39, 91, 0.05)",
  padding: "24px",
  "@media(max-width:576px)": {
    padding: "16px",
  },
});

const TypographyOne = styled(Typography)({
  fontSize: "16px",
  color: "rgba(0, 0, 0, 1)",
});

const Divider = styled(Box)({
  width: "100%",
  height: "1px",
  background: "rgba(0, 0, 0, 0.4)",
  margin: "16px 0",
});
