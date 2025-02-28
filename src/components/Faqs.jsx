import { useState } from "react";

const faqs = [
  {
    question: "What is Kaamsetu?",
    answer:
      "Kaamsetu a Nepal-based job portal designed to bridge the gap between job seekers and employers, making the job search and hiring process more efficient and seamless. Our intuitive platform enables job seekers to explore a wide range of opportunities across various industries while helping employers find the right talent quickly. Kaamsetu offers advanced search filters, personalized job recommendations, and real-time updates to keep users informed about the latest openings. For employers, the platform streamlines the recruitment process, allowing them to post job listings, review applications, and connect with potential candidates effortlessly. Designed to cater to fresh graduates, experienced professionals, and businesses of all sizes, Kaamsetu supports full-time, part-time, and freelance job opportunities. By leveraging technology, we aim to enhance Nepal’s employment sector, fostering career growth and business success.",
  },
  {
    question: "How do I create an account on Kaamsetu?",
    answer:
      "Creating an account on Kaamsetu is simple and straightforward. First, visit the official Kaamsetu website and click on the 'Sign Up' button. You will then need to choose whether you want to create an account as a 'Job Seeker' or an 'Employer'. For job seekers, the registration process involves filling in personal details, uploading a resume, and specifying job preferences. Employers, on the other hand, must provide company details and job posting information. After completing the form, users will receive a verification email to activate their account. Once verified, users can start applying for jobs or posting job listings immediately.",
  },
  {
    question: "How does Kaamsetu help job seekers?",
    answer:
      "Kaamsetu makes job searching easier by offering a powerful search engine that allows users to filter job postings based on their industry, preferred location, experience level, and salary expectations. The platform also provides personalized job recommendations based on the user’s profile and past searches. Job seekers can upload their resumes, create professional profiles, and apply to jobs with just a few clicks. Additionally, Kaamsetu provides job alerts and notifications to ensure that candidates never miss out on new opportunities that match their interests and qualifications.",
  },
  {
    question: "How can employers benefit from Kaamsetu?",
    answer:
      "Kaamsetu provides employers with a streamlined recruitment process by allowing them to post job openings, review applications, and connect with qualified candidates in an efficient manner. Employers can filter applicants based on skills, experience, and qualifications, making it easier to shortlist the right individuals. The platform also offers premium job postings that provide increased visibility, helping employers attract top talent. With built-in messaging features, employers can directly communicate with candidates, schedule interviews, and manage the hiring process all within a single platform.",
  },
  {
    question: "What types of jobs are available on Kaamsetu?",
    answer:
      "Kaamsetu offers a diverse range of job opportunities, including full-time, part-time, freelance, contract-based, and internship positions. Job listings cover various industries such as IT, finance, healthcare, education, hospitality, and more. Whether you're a fresh graduate looking for an entry-level job, an experienced professional seeking career growth, or a freelancer looking for short-term projects, Kaamsetu provides opportunities tailored to different career paths. The platform continuously updates its job listings to ensure users have access to the latest employment opportunities.",
  },
  {
    question: "Does Kaamsetu provide job alerts?",
    answer:
      "Yes, For premium users Kaamsetu offers job alerts and notifications to ensure that users never miss out on new opportunities. Job seekers can set up alerts based on their preferred job categories, location, and salary expectations. Whenever a new job matching their criteria is posted, they will receive an email or app notification. This feature helps job seekers stay updated and apply for jobs quickly before positions fill up. Employers can also receive notifications about new applicants, ensuring they can review and respond to candidates in a timely manner.",
  },
  {
    question: "Can I edit my job application after submission?",
    answer:
      "Once a job application has been submitted, it cannot be directly edited. However, if a user realizes they made an error or need to update their resume, they can withdraw their application and reapply for the job with the correct details. It’s always recommended to review applications carefully before submitting to avoid mistakes. If an employer has already reviewed the initial application, reapplying may still be beneficial if important updates need to be made.",
  },
  {
    question: "What should I do if I face issues with my account?",
    answer:
      "If you experience any issues with your Kaamsetu account, such as login problems, missing job applications, or difficulty accessing features, you can contact the Kaamsetu support team through the 'Help' section on the website. The platform offers customer support via email, live chat, and phone. Common issues such as password resets, verification problems, and technical difficulties can often be resolved quickly through the help center. Kaamsetu strives to provide a smooth user experience and ensures that all concerns are addressed promptly.",
  },
];

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="pt-10">
      <h2 className="text-3xl text-center mb-10 font-medium">
        Frequently Asked Questions
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`${
              openIndex === index
                ? "row-start-1 row-end-2 col-start-1 col-end-3"
                : ""
            } rounded-md   overflow-hidden`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full flex justify-between items-center text-start  md:px-2 px-1   py-2 border-2 hover:bg-gray-100"
            >
              <span className="text-xl">{faq.question}</span>
              <span className="text-3xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="p-5 text-justify text-gray-500">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
