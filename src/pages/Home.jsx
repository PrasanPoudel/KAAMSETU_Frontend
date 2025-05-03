import React, { useEffect, Suspense } from "react";
import Spinner from "../components/Spinner";
import FeaturedJobs from "../components/ForHomePageOnly/FeaturedJobs";
import Hero from "../components/ForHomePageOnly/Hero";
import JobCategories from "../components/ForHomePageOnly/JobCategories"
const PopularJobs = React.lazy(() => import("../components/ForHomePageOnly/PopularJobs"));
import Faqs from "../components/ForHomePageOnly/Faqs";
import WhyChooseUs from "../components/ForHomePageOnly/WhyChooseUs";
import TrustedCompanies from "../components/ForHomePageOnly/TrustedCompanies";
import Stats from "../components/ForHomePageOnly/Stats";
import Testimonial from "../components/ForHomePageOnly/Testimonial";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);
  return (
    <>
      <Hero />
      <Stats />
      <JobCategories/>
      <Suspense fallback={<Spinner />}>
        <FeaturedJobs />
      </Suspense>
      <Suspense fallback={<Spinner />}>
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
