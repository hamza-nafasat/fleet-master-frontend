/* eslint-disable react/prop-types */
import { Fragment } from "react";

const DeleteIcon = ({ onClick, isLoading }) => {
  return (
    <Fragment>
      <svg
        onClick={onClick}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{ cursor: isLoading ? "not-allowed" : "pointer", opacity: isLoading ? "0.5" : "1" }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="24" height="24" rx="12" fill="#FF6969" />
        <path
          d="M7.58818 9.93781C7.76438 9.94226 7.94056 9.94448 8.11721 9.9467C8.04029 10.2654 8.1114 10.7522 8.14806 11.127C8.27954 12.4518 8.42845 13.7752 8.5796 15.0978L8.6355 15.5939C8.64713 15.6828 8.64803 15.7397 8.67441 15.8771C8.70079 15.9944 8.73612 16.1091 8.79112 16.2149C9.00041 16.6452 9.44135 16.9502 9.91895 16.9933C9.97396 16.9991 10.046 17 10.0884 17H10.2146L10.4654 16.9964L10.9667 16.9929L11.9707 16.9907H13.0207H13.5448H13.8069H13.941C14.0027 16.9884 14.0645 16.9871 14.1253 16.9769C14.6185 16.9133 15.0581 16.567 15.2348 16.1051C15.2817 15.9935 15.3068 15.8651 15.3229 15.7499L15.3492 15.4903L15.402 14.9715L15.8255 10.8176C15.8474 10.6025 15.8988 10.3419 15.9033 10.1179C15.9995 10.1268 16.0956 10.1361 16.1918 10.1463C16.5263 10.1828 17.0101 10.2259 16.9998 9.65689C16.9909 9.19011 16.533 9.24258 16.2235 9.24035C15.572 9.2359 14.9208 9.24835 14.2706 9.26213C14.2661 9.19278 14.2509 9.12209 14.2433 9.06075C14.1999 8.74912 14.1494 8.43837 14.0957 8.12764L14.0921 8.10719C14.0886 8.08763 14.0841 8.06985 14.0774 8.05162C13.9253 7.61907 13.5761 7.26655 13.1535 7.10606C13.047 7.06738 12.9384 7.03537 12.827 7.01937C12.772 7.01048 12.7161 7.00559 12.6598 7.00248C12.6048 7.00025 12.5431 6.99892 12.5077 7.00114L12.0122 7.00559H11.5118H11.4488L11.3643 7.00914C11.3084 7.01048 11.252 7.01937 11.1961 7.02737C11.0852 7.04693 10.9752 7.07627 10.8696 7.1185C10.4484 7.28343 10.1094 7.64219 9.96855 8.06896V8.07341C9.9605 8.09386 9.95469 8.11564 9.95156 8.13831L9.79951 9.18301C9.7937 9.22035 9.78252 9.26036 9.77223 9.30126L7.6154 9.30171C7.37391 9.30304 7.01571 9.19146 7.0005 9.61022C6.9844 10.0632 7.3587 9.93564 7.58767 9.94142L7.58818 9.93781ZM15.1923 10.7015C15.0376 12.0525 14.8971 13.4044 14.7594 14.7577L14.708 15.2654L14.6829 15.5192C14.6749 15.601 14.6668 15.6988 14.6557 15.7504C14.6074 15.9998 14.4164 16.2171 14.1736 16.2989C14.1141 16.3216 14.0502 16.3318 13.9871 16.3376L13.9388 16.3398H13.8758H13.7474H13.2345H12.2086L10.156 16.3283C10.0612 16.3283 10.0084 16.3261 9.94533 16.3145C9.88451 16.3007 9.8228 16.2847 9.76779 16.2563C9.65555 16.2029 9.55582 16.1198 9.48741 16.0171C9.41541 15.9157 9.3765 15.7984 9.36488 15.6734L9.32239 15.1649C9.21238 13.8095 9.12205 12.4531 9.06124 11.0941C9.04514 10.7255 9.02009 10.2623 8.89175 9.95248C11.011 9.96048 13.132 9.90225 15.249 10.0605C15.2168 10.2686 15.2146 10.5122 15.1931 10.7002L15.1923 10.7015ZM10.431 9.29139C10.494 8.94775 10.549 8.60411 10.6005 8.25825C10.6863 8.02042 10.8728 7.81992 11.1089 7.72346C11.1698 7.69945 11.2315 7.68123 11.2954 7.67011C11.3276 7.66567 11.3594 7.65989 11.3929 7.65855C11.4238 7.65722 11.4569 7.655 11.5016 7.65633H11.9998L12.4979 7.66433C12.5427 7.66433 12.5749 7.66789 12.6066 7.67011C12.6388 7.67233 12.6705 7.67811 12.7014 7.68389C12.7645 7.69767 12.8248 7.71812 12.8821 7.74435C13.0972 7.84349 13.2555 8.03553 13.3149 8.24981C13.3319 8.5561 13.34 8.86417 13.3378 9.1727C13.3378 9.20782 13.3378 9.2456 13.3391 9.28428C12.8973 9.29228 12.4563 9.29895 12.0145 9.29895H10.4287V9.29317L10.431 9.29139Z"
          fill="white"
          stroke="white"
          strokeWidth="0.6"
        />
      </svg>
    </Fragment>
  );
};

export default DeleteIcon;
