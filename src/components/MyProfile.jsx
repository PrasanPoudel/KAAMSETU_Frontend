import React , {useEffect} from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const MyProfile = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  const { user } = useSelector((state) => state.user);
  let createdAt = "Unknown";
  if (typeof user.createdAt === "string") {
    createdAt = user.createdAt.substring(0, 10);
  }
  return (
    <div className="flex flex-col w-full md:w-[80%]">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-xl">Name</label>
          <input
            type="text"
            disabled
            value={user && user.name}
            onChange={(e) => e.target.value}
            className="w-full border-2 border-black pl-2 "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">Role</label>
          <input
            type="text"
            disabled
            value={user && user.role}
            onChange={(e) => e.target.value}
            className="w-full border-2 border-black pl-2 "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">Email Address</label>
          <input
            type="email"
            disabled
            value={user && user.email}
            onChange={(e) => e.target.value}
            className="w-full border-2 border-black pl-2 "
          />
        </div>
        {user && user.role === "Job Seeker" && (
          <div className="flex flex-col gap-2">
            <label className="text-xl">Job choices</label>
            <ul className="list-disc pl-5 space-y-2">
              <li>{user && user.jobChoices.firstChoice}</li>
              <li>{user && user.jobChoices.secondChoice}</li>
              <li>{user && user.jobChoices.thirdChoice}</li>
            </ul>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <label className="text-xl">Phone Number</label>
          <input
            type="number"
            disabled
            value={user && user.phone}
            onChange={(e) => e.target.value}
            className="w-full border-2 border-black pl-2 "
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-xl">Address</label>
          <input
            type="text"
            disabled
            value={user && user.address}
            onChange={(e) => e.target.value}
            className="w-full border-2 border-black pl-2 "
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-xl">Joined On</label>
          <input
            type="text"
            disabled
            value={user && createdAt}
            onChange={(e) => e.target.value}
            className="w-full border-2 border-black pl-2 "
          />
        </div>
        {user && user.resume && user.role === "Job Seeker" && (
          <div className="flex flex-col gap-2">
            <label className="text-xl">Resume</label>
            <Link
              to={user.resume && user.resume.url}
              target="_blank"
              className="bg-sky-600 rounded hover:cursor-pointer text-center text-white px-2 py-1  w-full"
            >
              View Resume
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
