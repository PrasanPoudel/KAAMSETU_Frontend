import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateProfile from "../components/ProfileManagement/UpdateProfile";
import UpdatePassword from "../components/ProfileManagement/UpdatePassword";
import MyJobs from "../components/MyJobs";
import JobPost from "../components/JobPost";
import Applications from "../components/Applications";
import MyApplications from "../components/MyApplications";

const Profile = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page
  }, []);
  const { activeComponent } = useParams();
  const [componentName, setComponentName] = useState(activeComponent);
  useEffect(() => {
    if (activeComponent) {
      setComponentName(activeComponent);
    }
  }, [activeComponent]);
  
  const componentsMap = {
    "Update Profile": <UpdateProfile />,
    "Update Password": <UpdatePassword />,
    "Job Post": <JobPost />,
    "My Jobs": <MyJobs />,
    Applications: <Applications />,
    "My Applications": <MyApplications />,
  };

  return (
    <div className="flex h-auto py-5 w-full items-center justify-center" >
      {componentsMap[componentName]}
    </div>
  );
};

export default Profile;
