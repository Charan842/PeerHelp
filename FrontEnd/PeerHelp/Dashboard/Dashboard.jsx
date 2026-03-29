
import Header from './Header';
import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';
function Dashboard() {
  return (
    <div>
        <Header/>
        <Sidebar/>
        <div><Outlet/></div>
    </div>
  )
}

export default Dashboard;