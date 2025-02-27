import React, { useState, useEffect, useRef, Suspense } from "react";
import Loader from "../components/Loader";
const Hero = React.lazy(() => import("../components/Hero"));
const PopularJobs = React.lazy(() => import("../components/PopularJobs"));
const Faqs = React.lazy(() => import("../components/Faqs"));

const LazyLoadComponent = ({ component: Component }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once the component is visible
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the element is in the viewport
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (observer && ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref}>
      {isVisible ? (
        <Suspense fallback={<Loader />}>
          <Component />
        </Suspense>
      ) : (
        <div>Scroll to load the component</div>
      )}
    </div>
  );
};

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when the component mounts
  }, []);

  return (
    <>
      <LazyLoadComponent component={Hero} />
      <LazyLoadComponent component={PopularJobs} />
      <LazyLoadComponent component={Faqs} />
    </>
  );
};

export default Home;
