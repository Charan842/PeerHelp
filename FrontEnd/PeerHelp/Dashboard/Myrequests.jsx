import React, { useEffect, useState } from "react";
import axios from "axios";

function Myrequests() {
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [requests, setRequests] = useState([]);

  const fetchMyRequests = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8426/api/requests/outrequests",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        }
      );
      setRequests(res.data);
    } catch (err) {
      if (!err.response) {
        setMessage("Network error");
        return;
      }

      switch (err.response.status) {
        case 404:
          setMessage("No tasks found");
          break;
        case 401:
          setMessage("Unauthorized - please login again");
          break;
        case 403:
          setMessage("Forbidden access");
          break;
        case 400:
          setMessage("No requests found");
          break;  
        case 500:
          setMessage("Server error");
          break;
        default:
          setMessage(err.response.data?.message || "Error");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyRequests();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {message && <p>{message}</p>}
      {requests.map((req) => (
        <div key={req._id}>{req.description}</div>
      ))}
    </div>
  );
}

export default Myrequests;