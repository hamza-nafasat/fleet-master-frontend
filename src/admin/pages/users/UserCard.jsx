import React from "react";
import PhoneIcon from '../../../assets/svgs/admin/PhoneIcon'
import EmailIcon from '../../../assets/svgs/admin/EmailIcon'
import { Link } from "react-router-dom";

const UserCard = ({ user }) => {
  return (
    <div className="bg-white shadow-md p-4 md:p-5 rounded-[10px] relative">
      <div className="absolute top-[20px] right-[14px]">
        <Link>
          <ThreeDotsIcon />
        </Link>
      </div>
      <div className="flex flex-col items-center">
        <img
          src={user.profile}
          alt="profile"
          className="w-[113px] h-[105px] object-cover rounded-[20px]"
        />
        <div className="my-[12px] bg-[#047cff] rounded-[17px] w-[77px] h-[24px] text-[10px] grid place-items-center text-white">
          Subscribed
        </div>
        <h3 className="text-lg font-bold text-[#202020]">{user.firstName} {user.lastName}</h3>
        <p className="mt-[10px] text-[#a5a5a5] text-xs font-semibold">
          Role:{" "}
          <span className="text-[#047cff]">{user.role}</span>
        </p>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <EmailIcon />
        <p className="font-semibold text-sm text-[#202020]">{user.email}</p>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <PhoneIcon />
        <p className="font-semibold text-sm text-[#202020]">{user.phone}</p>
      </div>
    </div>
  );
};

export default UserCard;

const ThreeDotsIcon = () => {
  return (
    <svg
      width="46"
      height="38"
      viewBox="0 0 46 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0.505981"
        y="0.5"
        width="44.1807"
        height="37"
        rx="11.5"
        fill="white"
        stroke="white"
      />
      <ellipse cx="23.1908" cy="10.5" rx="2.97242" ry="2.5" fill="#A5A5A5" />
      <ellipse cx="23.1908" cy="18.5" rx="2.97242" ry="2.5" fill="#A5A5A5" />
      <ellipse cx="23.1908" cy="26.5" rx="2.97242" ry="2.5" fill="#A5A5A5" />
    </svg>
  );
};
