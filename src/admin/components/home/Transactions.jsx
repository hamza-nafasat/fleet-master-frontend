import React from "react";
import Subscription from "../../../assets/svgs/admin/Subscription";
import Revenue from "../../../assets/svgs/admin/Revenue";

const Transactions = ({ type, via, price }) => {
  return (
    <div>
      <div className="bg-[#005CAE26] p-5 rounded-lg flex justify-between items-center mb-2">
        <div className="flex gap-2 items-center">
          {type === "Subscription" || type === "subscription" ? (
            <Subscription />
          ) : (
            <Revenue />
          )}
          <h3 className="text-[#0067C2] text-xs sm:text-sm font-[500]">
            {type}
          </h3>
        </div>
        <h3 className="text-[#0067C2] text-xs sm:text-sm font-[500]">{via}</h3>
        <h3 className="text-[#FF8585] text-xs sm:text-sm font-[500]">
          {price}
        </h3>
      </div>
    </div>
  );
};

export default Transactions;
