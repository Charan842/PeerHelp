import React from 'react'
import { Link } from 'react-router-dom'
function Sidebar() {
  return (
    <div>
        <Link to="/dashboard/feed">Feed</Link>
        <Link to="/dashboard/mytasks">MyTasks</Link>
        <Link to="/dashboard/requests">Requests</Link>
        <Link to="/dashboard/myrequests">MyRequests</Link>
        <Link to="/dashboard/settings">Settings</Link>
    </div>
  )
}

export default Sidebar;