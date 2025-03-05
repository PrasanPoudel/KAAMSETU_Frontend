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
      <section class="body-font">
        <div class="container p-8 mx-auto">
          <div class="flex flex-wrap justify-between text-center">
            <div class="p-4 sm:w-1/4 w-1/2">
              <h2 class="title-font  sm:text-4xl text-3xl">
                100+
              </h2>
              <p class="leading-relaxed">Users</p>
            </div>
            <div class="p-4 sm:w-1/4 w-1/2">
              <h2 class="title-font  sm:text-4xl text-3xl">
                1k+
              </h2>
              <p class="leading-relaxed">Jobs Posted</p>
            </div>
            <div class="p-4 sm:w-1/4 w-1/2">
              <h2 class="title-font  sm:text-4xl text-3xl">
                250+
              </h2>
              <p class="leading-relaxed">Companies</p>
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
      <section>
        <div class="container px-5 py-24 mx-auto">
          <h1 class="text-3xl  mb-10 text-center">Testimonials</h1>
          <div class="flex flex-wrap -m-4">
            <div class="p-4 md:w-1/2 w-full">
              <div class="h-full shadow-[0px_0px_2.5px_rgba(0,0,0,0.35)] border p-8 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="block w-5 h-5 text-sky-600 mb-4"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p class="leading-relaxed mb-6">
                  "Kaamsetu made my job search effortless! The platform is
                  user-friendly, and within days of signing up, I connected with
                  multiple employers. Thanks to Kaamsetu, I landed a job that
                  perfectly matches my skills and interests. Highly recommended
                  for job seekers!"
                </p>

                <span class="flex-grow flex flex-col pl-4">
                  <span class="title-font text-2xl font-medium">User 1</span>
                  <span class="text-sm">UI DEVELOPER</span>
                </span>
              </div>
            </div>
            <div class="p-4 md:w-1/2 w-full">
              <div class="h-full shadow-[0px_0px_2.5px_rgba(0,0,0,0.35)] border p-8 rounded-md">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="block w-5 h-5 text-sky-600 mb-4"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p class="leading-relaxed mb-6">
                  "Finding the right candidates used to be a challenge, but
                  Kaamsetu simplified the entire hiring process. We posted a job
                  opening, and within a week, we found the perfect fit for our
                  team. The platform is efficient, and the support team is
                  always helpful!"
                </p>
                <span class="flex-grow flex flex-col pl-4">
                  <span class="title-font  text-2xl font-medium">User 2</span>
                  <span class="text-sm">DESIGNER</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Faqs />
    </>
  );
};

export default Home;
