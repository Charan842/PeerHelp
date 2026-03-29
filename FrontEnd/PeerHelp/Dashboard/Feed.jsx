import React, { useEffect, useState } from "react";
import axios from "axios";

function Feed() {
    const [data, setData] = useState([]);
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            const res = await axios.get("http://localhost:8426/api/tasks/feed");

            setData(res.data.tasks);
            setMessage("");

        } catch (err) {
            if (!err.response) {
                setMessage("Network error");
                return;
            }

            const status = err.response.status;

            switch (status) {
                case 404:
                    setMessage("No tasks found");
                    break;

                case 401:
                    setMessage("Unauthorized - please login again");
                    break;

                case 403:
                    setMessage("Forbidden access");
                    break;

                case 500:
                    setMessage("Server error");
                    break;

                default:
                    setMessage(err.response.data.message || "Error");
            }

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // 🔄 Loading UI
    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h2>Feed</h2>

            {/* 🔔 Error Message */}
            {message && <p>{message}</p>}

            {/* 📭 No Data */}
            {!message && data.length === 0 && (
                <p>No tasks available</p>
            )}

            {/* 📦 Data Display */}
            {data.map((item) => (
                <div key={item._id}>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </div>
            ))}
        </div>
    );
}

export default Feed;