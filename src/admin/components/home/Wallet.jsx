import React from "react";
import walletBg from "../../../assets/images/adminDashboard/walletBg.png";
import { FaChevronUp } from "react-icons/fa6";
import Dropdown from "../shared/Dropdown";

const data = [
  { option: "This week" },
  { option: "This month" },
  { option: "This year" },
];

const Wallet = () => {
  return (
    <div
      className=" bg-cover rounded-2xl border-[1px] border-red"
      style={{ backgroundImage: `url(${walletBg})` }}
    >
      <div className="p-5 text-white flex justify-between md:flex-row flex-col-reverse ">
        <div className="flex flex-col gap-2">
          <h6 className="text-sm sm:text-base">Total Balance</h6>

          <h2 className="text-xl sm:text-5xl font-[700]">$ 5,756</h2>

          <div className="text-sm sm:text-base rounded-xl p-3 w-fit bg-[#ffffff20] flex items-center gap-5">
            <h5 className="gap-1 flex items-center">
              +5 <FaChevronUp fontSize={10} />{" "}
            </h5>
            <h5>Increases this month</h5>
          </div>

          <h5 className="text-sm sm:text-base">Subscription Revenue</h5>
          <h5 className="text-lg sm:text-3xl font-[700]">$ 345</h5>

          <div className="text-sm sm:text-base rounded-xl p-3 w-fit bg-[#ffffff20] flex items-center gap-5">
            <h5 className="gap-1 flex items-center">
              +5 <FaChevronUp fontSize={10} />{" "}
            </h5>
            <h5>Increases this month</h5>
          </div>
        </div>
        <div className="mb-2 md:mb-0 ml-auto">
          <Dropdown color="#fff" options={data} bg="bg-[#00000080]" />
        </div>
      </div>
    </div>
  );
};

export default Wallet;
