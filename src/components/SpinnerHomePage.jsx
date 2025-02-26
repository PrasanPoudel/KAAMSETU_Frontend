import React from "react";
import { ScaleLoader } from "react-spinners";
import KaamSetu from "../images/KaamSetu.png";
const SpinnerHomePage = () => {
  return (
    <section
      style={{
        minHeight: "400px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img src={KaamSetu} alt="" className="w-[200px] rounded-md h-[200px]" />
      <ScaleLoader height={25} width={5} color="#0284c7" />
    </section>
  );
};

export default SpinnerHomePage;
