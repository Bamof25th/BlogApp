// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

const Dashboard = () => {
  const location = useLocation();
  const [tab, setTab] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabUrlForm = urlParams.get("tab");
    if (tabUrlForm) {
      setTab(tabUrlForm);
    }
  }, [location.search]);

  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:w-56">
          {/* sidebar */}
          <DashSidebar />
        </div>
        {/* Profile */}
        {tab === "profile" && <DashProfile />}
      </div>
    </>
  );
};

export default Dashboard;
