import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });

      dispatch(addRequest(res.data.connectionRequests)); // Store the entire connectionRequests array
    } catch (error) {
      console.log("Error fetching requests:", error);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) return null;

  if (requests.length === 0) {
    return (
      <div className="flex justify-center p-4 bg-base-200 h-screen">
        <h1 className="text-bold text-2xl">No Connections Found</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center p-4 bg-base-200 min-h-screen">
      <div className="w-full max-w-2xl">
        <h1 className="text-bold text-3xl text-white text-center mb-4">Connection Requests</h1>
        <div className="flex flex-col gap-4">
          {requests.map((request) => {
            const user = request.fromUserId; 
            return (
              <div key={request._id} className="card bg-base-300 shadow-md p-4">
                <div className="flex items-center gap-4">
                  <img
                    src={user.photoUrl}
                    alt={user.firstName}
                    className="w-16 h-16 rounded-full"
                  />
                  <div className="flex-grow">
                    <h2 className="text-xl font-bold">{`${user.firstName} ${user.lastName}`}</h2>
                    <p className="text-gray-400">{user.about?.slice(0, 80) + "..."}</p>
                    {user.skills.length > 0 && (
                      <p className="text-sm text-gray-600">Skills: {user.skills.join(", ")}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button className="btn btn-success">Accept</button>
                    <button className="btn btn-error">Reject</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Requests;
