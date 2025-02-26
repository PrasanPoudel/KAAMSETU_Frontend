import React from "react";
import { ScaleLoader } from "react-spinners";

const Spinner = () => {
  return (
    <>
      <section
        style={{
          minHeight: "525px",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ScaleLoader height={25} width={5} color="#0284c7" />
      </section>
    </>
  );
};

export default Spinner;
