import React from "react";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const getTitle = () => {
    switch (location.pathname) {
  case "/dashboard/feed":
    return "Feed";
  case "/dashboard/mytasks":
    return "MyTasks";
  case "/dashboard/requests":
    return "Requests";
  case "/dashboard/myrequests":
    return "MyRequests";
  case "/dashboard/settings":
    return "Settings";
  default:
    return "Dashboard";
}
  };

  return (
    <div>
      <h2>{getTitle()}</h2>
      <h2>Searchbar</h2>
      <h2>Notification</h2>
    </div>
  );
}

export default Header;