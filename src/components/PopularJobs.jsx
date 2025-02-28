import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Sd from "../images/Sd.webp";
import UiUx from "../images/ui-ux.jpg";
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
      description: "Hub - Leading the Future of Advertising. Join us to revolutionize digital marketing strategies and drive brand growth through innovative campaigns.",
      headline: "Marketing Manager - Driving Brand Growth and Awareness",
      image: Mm,
    },
    {
      description: "DesignPros - Innovating Through Design. Be part of a team that creates seamless and intuitive user experiences for cutting-edge digital products.",
      headline: "UX/UI Designer - Crafting User-Centered Digital Experiences",
      image: UiUx,
    },
    {
      description: "SalesHub - Empowering Sales Teams to Succeed. Help businesses grow by building strong customer relationships and closing high-value deals.",
      headline: "Sales Executive - Building Strong Customer Relationships",
      image: Se,
    },
    {
      description: "PeopleFirst - Creating a Positive Work Culture. Lead initiatives to build effective teams and foster a collaborative workplace environment.",
      headline: "Human Resources Manager - Building Effective Teams",
      image: Hr,
    },
    {
      description: "CodeWorks - Shaping the Digital World. Develop innovative software solutions that solve real-world problems and drive technological advancements.",
      headline: "Software Developer - Creating Cutting-Edge Applications",
      image: Sd,
    },
    {
      description: "FinancePro - Turning Data into Financial Strategies. Analyze market trends and provide insights to help businesses make informed financial decisions.",
      headline: "Financial Analyst - Analyzing Market Trends and Forecasts",
      image: Fa,
    },
    {
      description: "WriteNow - Bringing Ideas to Life Through Words. Craft compelling narratives and create engaging content that resonates with diverse audiences.",
      headline: "Content Writer - Crafting Compelling Written Narratives",
      image: Cw,
    },
  ];

  return (
    <div className="w-full pt-10">
      <h2 className="text-3xl text-center mb-10 font-medium">
        Popular Jobs Categories
      </h2>
      <div className="z-10 relative">
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
                loading="lazy"
              />
              <h3 className="text-xl mt-2 font-medium text-justify">{job.headline}</h3>
              <p className="text-gray-500 text-justify">{job.description}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default PopularJobs;
