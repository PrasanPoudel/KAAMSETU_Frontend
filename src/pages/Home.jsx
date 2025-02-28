import React, { useState, useEffect, Suspense } from "react";
import Loader from "../components/Loader";
import Spinner from "../components/Spinner";
import FeaturedJobs from "../components/FeaturedJobs";
const Hero = React.lazy(() => import("../components/Hero"));
const PopularJobs = React.lazy(() => import("../components/PopularJobs"));
const Faqs = React.lazy(() => import("../components/Faqs"));
const Home = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const pageLoading = setTimeout(() => {
      window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
      setLoading(false);
    }, 1500);
  }, []);
  return (
    <>
      {!loading ? (
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
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default Home;
