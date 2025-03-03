import React from 'react'
import KaamSetu from "../images/KaamSetu.png"
import { ScaleLoader } from "react-spinners";
const SpinnerHome = () => {
  return (
    <section
    style={{
      minHeight: "525px",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
      gap:"5px"
    }}
  >
    <img src={KaamSetu} className='h-[200px] w-[200px] mix-blend-multiply'/>
    <ScaleLoader height={25} width={5} color="#0284c7" />
  </section>
  )
}

export default SpinnerHome