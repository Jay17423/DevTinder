import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);
  const handleGetConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetConnections();
  }, []);

  if (!connections) return;
  if (connections.length === 0) {
    return (
      <div className="flex justify-center p-4 bg-base-200 h-screen">
        <h1 className="text-bold text-2xl">No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-4 bg-base-200 min-h-screen">
      <div className="w-full max-w-2xl">
        <h1 className="text-bold text-3xl text-white text-center mb-4">
          Connections
        </h1>
        <div className="flex flex-col gap-4">
          {connections.map((user) => (
            <div key={user._id} className="card bg-base-300 shadow-md p-4">
              <div className="flex items-center gap-4">
                <img
                  src={user.photoUrl}
                  alt={user.firstName}
                  className="w-16 h-16 rounded-full"
                />
                <div className="flex-grow">
                  <h2 className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
                  {user.age && user.gender && (
                    <p>{`${user.age} ${user.gender}`}</p>
                  )}
                  <h3>{user.about.slice(0, 80) + "..."}</h3>
                </div>
                <Link to={`/chat/${user._id}`}><button className="btn btn-primary">Chat</button></Link>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Connections;
