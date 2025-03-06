import React, { useEffect, Suspense } from "react";
import Loader from "../components/Loader";
import FeaturedJobs from "../components/FeaturedJobs";
import Hero from "../components/Hero";
import JobCategories from "../components/JobCategories"
const PopularJobs = React.lazy(() => import("../components/PopularJobs"));
import Faqs from "../components/Faqs";
import WhyChooseUs from "../components/WhyChooseUs";
import TrustedCompanies from "../components/TrustedCompanies";
import Stats from "../components/Stats";
import Testimonial from "../components/Testimonial";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);
  return (
    <>
      <Hero />
      <Stats />
      <JobCategories/>
      <Suspense fallback={<Loader />}>
        <FeaturedJobs />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <PopularJobs />
      </Suspense>
      <WhyChooseUs/>
      <TrustedCompanies />
      <Testimonial/>
      <Faqs />
    </>
  );
};

export default Home;
