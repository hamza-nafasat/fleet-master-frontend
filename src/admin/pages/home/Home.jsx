import React from "react";
import TotalCard from "../../components/home/TotalCard";
import LineChart from "../../components/charts/LineChart";
import BarChart from "../../components/charts/BarChart";
import { users } from "../../../data/data";
import { Link } from "react-router-dom";
import UserCard from "../users/UserCard";

const cardsData = [
  {
    days: "Last 7 days",
    heading: "TOTAL USERS",
    count: 25,
    data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
  },
  {
    days: "Last 7 days",
    heading: "TOTAL SENSORS",
    count: 16,
    data: [10, 41, 35, 51, 49, 62, 69, 91, 100],
  },
  {
    days: "Last 7 days",
    heading: "TOTAL SUBSCRIPTIONS",
    count: 125,
    data: [10, 41, 35, 51, 49, 62, 69, 91, 50],
  },
];

const spliceUser = users.slice(0, 5);

const Home = () => {
  return (
    <div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-12 lg:col-span-8">
          <div className=" grid   grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {cardsData.map((card, i) => (
              <TotalCard
                key={i}
                days={card.days}
                heading={card.heading}
                count={card.count}
                data={card.data}
              />
            ))}
          </div>
          <div className="mt-4 grid  grid-cols-1  lg:grid-cols-2 gap-4">
            <div className="p-5 bg-[#005CAE26] rounded-lg flex justify-between">
              <h3 className="font-[600] md:text-lg text-base text-[#0067C2]">
                TOTAL FLEETS
              </h3>
              <h3 className="font-[600] md:text-lg text-base text-[#0067C2]">
                38
              </h3>
            </div>
            <div className="p-5 bg-[#005CAE26] rounded-lg flex justify-between">
              <h3 className="font-[600] md:text-lg text-base text-[#0067C2]">
                TOTAL DRIVERS
              </h3>
              <h3 className="font-[600] md:text-lg text-base text-[#0067C2]">
                38
              </h3>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1">
            <BarChart />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-4 bg-white rounded-lg p-3">
          Wallet
        </div>
      </div>
      <div className="flex justify-between items-center mb-1 w-full mt-4">
        <h3 className="font-[600] text-black text-base sm:text-lg ">
          All Users
        </h3>
        <Link to="/admin/users">
          <button className="text-[#007AFF] text-sm ">View All</button>
        </Link>
      </div>
      <div className="gap-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 ">
        {spliceUser.map((user, i) => (
          <div key={user._id}>
            <UserCard user={user} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
