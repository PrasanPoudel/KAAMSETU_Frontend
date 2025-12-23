import react from "react";
import { LuCrown } from "react-icons/lu";

const Subscribe = () => {
  return (
    <div className="w-full flex flex-col items-start bg-gray-50 py-5 px-2 bg-gradient-to-b from-sky-100 to-white">
      <div className="bg-white rounded-xl min-w-[60%] max-w-lg text-start p-5 shadow-md">
        <h1 className="text-4xl md:text-3xl lg:text-4xl font-medium mb-5 leading-tight">
          Premium Job Notifications
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
          Premium users get " <strong className="text-xl">instant notifications</strong>" whenever a job from their
          preferred category is posted. Stay ahead and never miss an
          opportunity!
        </p>
        <button
          to={"/subscribe"}
          className="bg-sky-600 text-xl text-white  px-5 py-2 rounded-md font-medium text-center hover:bg-sky-700 transition-all shadow-lg hover:shadow-sky-200 hover:-translate-y-1 duration-300"
        >
          <div className="text-xl flex gap-2 items-center">
            <LuCrown />
            Subscribe
          </div>
        </button>

        <div className="mt-8 border-t pt-6">
          <h2 className="md:text-2xl lg:text-3xl font-medium mb-5">How it works:</h2>
          <ul className="list-disc list-inside space-y-2">
            <li className="text-sm">Choose your preferred job categories.</li>
            <li className="text-sm">
              Get instant Email alerts as soon as a job matching your
              preferences is posted.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
