import React from "react";
import WeborHomeAppliances from "../images/Webor Home Appliances.jpg";
import TDC from "../images/TDC.png";
import SuzimBazar from "../images/SuzimBazar.jpg";
import ClassicTech from "../images/Classic Tech.jpg";
import HarbourEducation from "../images/Harbour Education.jpg";

const TrustedCompanies = () => {
  return (
    <section className="w-full py-10">
      <div>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-medium mb-5">
            Trusted by Leading Companies
          </h2>
          <p className="text-lg text-gray-500">
            Join the 1000+ companies that trust KAAMSETU for their hiring needs
          </p>
        </div>

        <div className="flex justify-between flex-wrap gap-5">
          <img
            src={WeborHomeAppliances}
            alt=""
            className="h-[120px] w-[120px] rounded-md"
          />
          <img
            src={TDC}
            alt="Thunder Development Center"
            className="h-[120px] w-[120px] rounded-md"
          />
          <img
            src={SuzimBazar}
            alt="SuzimBazar"
            className="h-[120px] w-[120px] rounded-md"
          />
          <img
            src={ClassicTech}
            alt="Classic Tech"
            className="h-[120px] w-[120px] rounded-md"
          />
          <img
            src={HarbourEducation}
            alt="Harbour Education"
            className="h-[120px] w-[120px] rounded-md"
          />
        </div>
      </div>
    </section>
  );
};

export default TrustedCompanies;
