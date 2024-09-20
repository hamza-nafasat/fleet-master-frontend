/* eslint-disable react/prop-types */
import { styled } from "@mui/material";
import { Fragment } from "react";
import ReactDOM from 'react-dom';

const Modal = ({ children, onClose, zIndex = 1000, width }) => {
  return ReactDOM.createPortal(
    <Fragment>
      <ModalOuter onClick={onClose} sx={{ zIndex: zIndex }}>
        <ModalInner
          onClick={(e) => e.stopPropagation()}
          sx={{
            padding: {
              xs: "1rem",
              md: "1.2rem",
            },
            width: width ? width : {
              xs: "300px",
              sm: "600px",
              lg: "900px",
              xl: "1000px",
            },
            height: 'auto',
            maxHeight: '100%',
            // "@media (max-height:1000px)": {
            //   height: "100%",
            // },
          }}
        >
          {children}
        </ModalInner>
      </ModalOuter>
    </Fragment>,
    document.body
  );
};

const ModalOuter = styled("div")({
  background: "rgba(0, 0, 0, 0.8)",
  position: "fixed",
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  overflowY: "scroll",
  padding: "30px 16px",
});
export default Modal;

const ModalInner = styled("div")({
  background: "rgba(245, 244, 244, 1)",
  borderRadius: "24px",
  maxWidth: "100%",
  overflow: "auto",
  height: "fit-content",
  display: "flex",
  flexDirection: "column",
  "&::-webkit-scrollbar": {
    width: "0",
  },
});
