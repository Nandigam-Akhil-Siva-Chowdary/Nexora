import { useState } from "react";
import "./App.css"
import { PiBasketballThin } from "react-icons/pi";
import { IoFootball } from "react-icons/io5";
import { MdSportsCricket } from "react-icons/md";
import { GiShuttlecock } from "react-icons/gi";

export function Technologies() {
  const [activeTab, setActiveTab] = useState("Indoor");
  const [hoverIndex, setHoverIndex] = useState(null);

  const SportsTypes = {
      Outdoor: [
        { name: "BasketBall", icon: <PiBasketballThin size={40}/> },
        { name: "Football", icon: <IoFootball size={40} /> },
        { name: "Cricket", icon: <MdSportsCricket size={40} /> },
      ],
    Indoor: [
      { name: "Badminton", icon: <GiShuttlecock size={40} /> },
      { name: "Pickle Ball", icon: <FaReact size={40} /> },
      { name: "Tennis", icon: <SiKotlin size={40} /> },
      { name: "Swimming", icon: <SiSwift size={40} /> },
    ],
  };

  return (
    <section className="tech text-white sm:py-24 py-14 px-6 md:px-24 min-h-[80vh]" id="technologies">
      <h2 className="text-3xl font-bold mb-8">Types of Sports</h2>
      <div className="flex gap-10 border-b border-gray-700 mb-10">
        {Object.keys(SportsTypes).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 uppercase tracking-wide font-medium transition-all ${
              activeTab === tab
                ? "text-[#3db3a5] border-b-2 border-[#3db3a5]"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 text-center">
        {SportsTypes[activeTab].map((tech, index) => (
          <div
            key={tech.name}
            onMouseEnter={() => setHoverIndex(index)}
            onMouseLeave={() => setHoverIndex(null)}
            className="bg-[#99e1d9] text-black py-10 rounded-lg relative group overflow-hidden flex flex-col items-center transition-all duration-500 hover:bg-[#3db3a5]"
          >
            <div className="mb-4">{tech.icon}</div>
            <div
              className={`h-[3px] w-16 mb-4 transition-all duration-500 ${
                hoverIndex === index
                  ? "bg-white opacity-0 scale-x-100"
                  : "bg-black opacity-100 scale-x-100"
              }`}
            ></div>
            <p className="font-semibold transition-all duration-500">
              {tech.name}
            </p>
            <div
              className={`h-[3px] w-16 mt-4 transition-all duration-500 ${
                hoverIndex === index
                  ? "bg-white opacity-100 scale-x-100"
                  : "bg-black opacity-0 scale-x-0"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </section>
  );
}