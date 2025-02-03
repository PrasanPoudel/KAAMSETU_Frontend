import React from "react";
import { ScaleLoader } from "react-spinners";

const SpinnerHomePage = () => {
  return (
      <section
        style={{
          minHeight: "525px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection:"column",
        }}
      >
        <img src="/KaamSetu.png" alt=""  className="w-[200px] rounded-lg h-[200px]"/>
        <ScaleLoader height={25} width={5} color="#0284c7"/>
      </section>
  );
};

export default SpinnerHomePage;
