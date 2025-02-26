import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Sd from "../images/Sd.webp";
import UiUx from  "../images/ui-ux.jpg";
import Se from "../images/sales-executive.jpg";
import Mm from "../images/marketing-manager.jpg";
import Hr from "../images/hr.jpg";
import Fa from "../images/financial-analyst.jpg";
import Cw from "../images/content-writer.jpeg";


const PopularJobs = () => {
  // Responsive Breakpoints
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 30,
    },
  };

  const jobItems = [
    {
      description: "Marketing Manager - Driving Brand Growth and Awareness",
      headline: "MarketHub - Leading the Future of Advertising",
      image: Mm,
    },
    {
      description: "UX/UI Designer - Crafting User-Centered Digital Experiences",
      headline: "DesignPros - Innovating Through Design",
      image: UiUx,
    },
    {
      description: "Sales Executive - Building Strong Customer Relationships",
      headline: "SalesHub - Empowering Sales Teams to Succeed",
      image: Se,
    },
    {
      description: "Human Resources Manager - Building Effective Teams",
      headline: "PeopleFirst - Creating a Positive Work Culture",
      image: Hr,
    },
    {
      description: "Software Developer - Creating Cutting-Edge Applications",
      headline: "CodeWorks - Shaping the Digital World",
      image: Sd,
    },
    {
      description: "Financial Analyst - Analyzing Market Trends and Forecasts",
      headline: "FinancePro - Turning Data into Financial Strategies",
      image: Fa,
    },
    {
      description: "Content Writer - Crafting Compelling Written Narratives",
      headline: "WriteNow - Bringing Ideas to Life Through Words",
      image: Cw,
    },
  ];  

  return (
    <div className="w-full pt-10">
      <h2 className="text-3xl text-center mb-10 font-medium" >Popular Jobs Categories</h2>
      <div className="z-10 relative" >
        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={2000}
          keyBoardControl
          pauseOnHover
          showDots={false}
          arrows
          slidesToSlide={1}
          containerClass="carousel-container"
          itemClass="carousel-item"
        >
          {jobItems.map((job, index) => (
            <div
              key={index}
              className="p-2 border-2 border-gray-100   rounded-md mx-1 flex flex-col gap-5 h-full"
            >
              <img
                src={job.image}
                alt="Job"
                className="w-full h-[250px] object-cover rounded-md"
              />
              <h3 className="text-xl mt-2 font-medium">{job.headline}</h3>
              <p className="text-gray-500">{job.description}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default PopularJobs;
