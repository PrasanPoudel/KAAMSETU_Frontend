import React, { useEffect, Suspense } from "react";
import Loader from "../components/Loader";
import FeaturedJobs from "../components/FeaturedJobs";
const Hero = React.lazy(() => import("../components/Hero"));
const PopularJobs = React.lazy(() => import("../components/PopularJobs"));
const Faqs = React.lazy(() => import("../components/Faqs"));
const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);
  return (
    <>
      <Suspense fallback={<Loader />}>
        <Hero />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <FeaturedJobs />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <PopularJobs />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <Faqs />
      </Suspense>
    </>
  );
};

export default Home;
