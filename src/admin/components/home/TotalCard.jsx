import React from "react";
import LineChart from "../charts/LineChart";

const TotalCard = ({ days, heading, count, data }) => {
  console.log(data);
  return (
    <div className="rounded-lg shadow-md p-3 bg-white">
      <div className="flex items-center gap-4">
        <div className="flex flex-col w-full gap-1">
          <h6 className="text-base sm:text-lg font-[600] ">{heading}</h6>
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h3 className="font-[600] text-[#006BCE] text-xl sm:text-2xl mb-2">
                {count}
              </h3>
              <h3 className=" text-[#00000050] text-xs sm:text-sm">{days}</h3>
            </div>
            <LineChart data={data} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalCard;
