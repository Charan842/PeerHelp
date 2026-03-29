import {BrowserRouter as Router,Routes,Route} from "react-router-dom"; 
import Login from "../authcomponents/Login.jsx";
import Signup from "../authcomponents/Signup.jsx";
import OTPVerification from "../authcomponents/OTPVerification.jsx";
import Dashboard from "../Dashboard/Dashboard.jsx";
import Feed from "../Dashboard/Feed.jsx";
import Mytasks from "../Dashboard/Mytasks.jsx";
import Requests from "../Dashboard/Requests.jsx";
import Myrequests from "../Dashboard/Myrequests.jsx";
import Settings from "../Dashboard/Settings.jsx";
function App(){
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/OTPVerification" element={<OTPVerification/>}/>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="feed" element={<Feed />} />
          <Route path="mytasks" element={<Mytasks />} />
          <Route path="requests" element={<Requests />} />
          <Route path="myrequests" element={<Myrequests />} />
          <Route path="settings" element={<Settings />} />
        </Route>

      </Routes>
    </Router>
  );
}
export default App;