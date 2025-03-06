import React, { useEffect, Suspense } from "react";
import Loader from "../components/Loader";
import FeaturedJobs from "../components/FeaturedJobs";
import Hero from "../components/Hero";
const PopularJobs = React.lazy(() => import("../components/PopularJobs"));
import Faqs from "../components/Faqs";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);
  return (
    <>
      <Hero />
      <section className="body-font">
        <div className="container p-8 mx-auto">
          <div className="flex flex-wrap justify-between text-center">
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font  sm:text-4xl text-3xl">200+</h2>
              <p className="leading-relaxed">Users</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font  sm:text-4xl text-3xl">1k+</h2>
              <p className="leading-relaxed">Jobs Posted</p>
            </div>
            <div className="p-4 sm:w-1/4 w-1/2">
              <h2 className="title-font  sm:text-4xl text-3xl">250+</h2>
              <p className="leading-relaxed">Companies</p>
            </div>
          </div>
        </div>
      </section>
      <Suspense fallback={<Loader />}>
        <FeaturedJobs />
      </Suspense>
      <Suspense fallback={<Loader />}>
        <PopularJobs />
      </Suspense>
      <section className="body-font mt-5">
        <p className="my-10 text-3xl text-center">Testimonail</p>
        <div className="container px-5 py-10 mx-auto shadow-[0px_0px_2.5px_rgba(0,0,0,0.35)] rounded-md">
          <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="inline-block w-8 h-8 text-sky-600 mb-8"
              viewBox="0 0 975.036 975.036"
            >
              <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
            </svg>
            <p className="leading-relaxed text-lg text-justify">
              Kaamsetu made my job search effortless! The platform is
              user-friendly, and within days of signing up, I connected with
              multiple employers. Thanks to Kaamsetu, I landed a job that
              perfectly matches my skills and interests. Highly recommended for
              job seekers.
            </p>
            <span className="inline-block h-1 w-10 rounded bg-sky-600 mt-8 mb-6"></span>
            <h2 className="text-gray-900 font-medium title-font tracking-wider text-2xl">
              John Doe
            </h2>
            <p className="text-gray-500 text-sm">Product Reviewer</p>
          </div>
        </div>
      </section>
      <Faqs />
    </>
  );
};

export default Home;
