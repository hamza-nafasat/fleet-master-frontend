import React, { useState } from "react";
import BackIcon from "../../../assets/svgs/modal/BackIcon";
import CloseIcon from "../../../assets/svgs/modal/CloseIcon";
import Input from "../../components/Input";
import { Button, Menu, MenuItem } from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";

const AddUser = ({ onClose }) => {
  const [imgSrc, setImgSrc] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const uploadImgHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="pb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 text-[rgba(17,17,17,1)] font-semibold">
          <div className="cursor-pointer h-[25px]" onClick={onClose}>
            <BackIcon />
          </div>
          <span className="text-base md:text-xl">Add User</span>
        </div>
        <div className="cursor-pointer" onClick={onClose}>
          <CloseIcon onClick={onClose} />
        </div>
      </div>
      <div className="mt-4 md:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6">
        <div className="lg:col-span-8 grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-6">
            <Input label="First Name" type="text" placeholder="MKS" />
          </div>
          <div className="lg:col-span-6">
            <Input label="Last Name" type="text" placeholder="MKS" />
          </div>
          <div className="lg:col-span-6">
            <Input label="Email" type="text" placeholder="info@gmail.com" />
            <p className="text-xs md:text-sm text-[rgba(8,73,132,1)] mt-1">
              User credentials will be shared at this email.
            </p>
          </div>
          <div className="lg:col-span-6">
            <Input
              label="Phone Number"
              type="text"
              placeholder="923092309233"
            />
          </div>
          <div className="lg:col-span-12">
            <Input
              label="Address"
              type="text"
              placeholder="Tetratech, Lakhpat Road, Lahore"
              icon={<LocationIcon />}
            />
          </div>
          <div className="lg:col-span-12">
            <Input label="Password" type="password" placeholder="Password" />
          </div>
          <div className="lg:col-span-12">
            <Input
              label="Address"
              type="password"
              placeholder="Confirm password"
            />
          </div>
          <div className="lg:col-span-12 flex items-center justify-between">
            <p className="text-base md:text-xl font-semibold text-[rgba(8,73,132,1)]">
              Trial Period
            </p>
            <div>
              <Button
                onClick={handleClick}
                endIcon={<ArrowDropDownIcon />}
                sx={{
                  borderRadius: "8px",
                  padding: "4px 12px",
                  background: "transparent",
                  border: "2px solid rgba(0,86,161,1)",
                  ':hover': {
                    color:'#fff'
                  }
                }}
              >
                7 Days
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>7 Days</MenuItem>
                <MenuItem onClick={handleClose}>14 Days</MenuItem>
                <MenuItem onClick={handleClose}>21 Days</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 flex flex-col items-center">
          <img
            src={imgSrc || "https://placehold.co/278x278"}
            alt=""
            className="w-[278px] h-[278px] object-cover rounded-full"
          />
          <ChangeBtn onChange={uploadImgHandler} />
        </div>
        <div className="col-span-12 lg:col-span-8 flex justify-end gap-4">
          <Button
            onClick={onClose}
            sx={{
              background: "rgba(118,118,118,0.25)",
              color: "rgba(17,17,17,0.7)",
              borderRadius: "16px",
              width: "137px",
              padding: "16px",
            }}
          >
            Cancel
          </Button>
          <Button
            sx={{
              color: "#fff",
              borderRadius: "16px",
              width: "137px",
              padding: "16px",
            }}
          >
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddUser;

const ChangeBtn = ({ onChange }) => {
  return (
    <button className="relative w-[209px] h-[58px] rounded-xl border-[2.5px] border-[rgba(8,73,132,1)] grid place-items-center mt- md:mt-8 cursor-pointer text-base md:text-lg text-[rgba(8,73,132,1)]">
      Change
      <input
        type="file"
        className="absolute inset-0 z-50 cursor-pointer opacity-0"
        onChange={onChange}
      />
    </button>
  );
};

const LocationIcon = () => {
  return (
    <svg
      width="14"
      height="20"
      viewBox="0 0 14 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7 9.5C6.33696 9.5 5.70107 9.23661 5.23223 8.76777C4.76339 8.29893 4.5 7.66304 4.5 7C4.5 6.33696 4.76339 5.70107 5.23223 5.23223C5.70107 4.76339 6.33696 4.5 7 4.5C7.66304 4.5 8.29893 4.76339 8.76777 5.23223C9.23661 5.70107 9.5 6.33696 9.5 7C9.5 7.3283 9.43534 7.65339 9.3097 7.95671C9.18406 8.26002 8.99991 8.53562 8.76777 8.76777C8.53562 8.99991 8.26002 9.18406 7.95671 9.3097C7.65339 9.43534 7.3283 9.5 7 9.5ZM7 0C5.14348 0 3.36301 0.737498 2.05025 2.05025C0.737498 3.36301 0 5.14348 0 7C0 12.25 7 20 7 20C7 20 14 12.25 14 7C14 5.14348 13.2625 3.36301 11.9497 2.05025C10.637 0.737498 8.85652 0 7 0Z"
        fill="#0056A1"
      />
    </svg>
  );
};
