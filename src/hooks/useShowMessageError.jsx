// import { useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// const useShowMessageError = (message, clearMessage, error, clearError, sNavigation = "") => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     useEffect(() => {
//         if (message) {
//             toast.success(message);
//             dispatch(clearMessage());
//             if (sNavigation) return navigate(sNavigation);
//         }
//         if (error) {
//             toast.error(error);
//             dispatch(clearError());
//         }
//     }, [message, error, clearMessage, clearError, dispatch, navigate, sNavigation]);
//     return;
// };

// export default useShowMessageError;
