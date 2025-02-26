import React, { useEffect } from "react";
import Hero from '../components/Hero'
import PopularJobs from "../components/PopularJobs";
import Faqs from "../components/Faqs";

const Home = () => {
  useEffect(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page
    }, []);
  return (
    <>
    <Hero />
    <PopularJobs />
    <Faqs />
    </>
    
  )
}

export default Home