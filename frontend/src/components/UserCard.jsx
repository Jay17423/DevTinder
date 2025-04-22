import axios from "axios";
import React from "react";
import { BASE_URL } from "../utils/constant";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const handleSendRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true }
      );
      dispatch(removeUserFromFeed(userId))
    } catch (error) {
      console.log("Error sending request:", error);
    }
  };
  

  return (
    <div>
      <div className="card bg-base-300 w-96 shadow-sm">
        <figure>
          <img src={user?.photoUrl} alt="photoUrl" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{user.firstName + " " + user.lastName}</h2>
          {user.age && user.gender && <p>{user.age + "," + user?.gender}</p>}
          <p>{user?.about}</p>
          <div className="card-actions justify-end justify-center my-3">
            <button className="btn btn-primary" onClick={() => handleSendRequest("ignored",user._id)}>Ignore</button>
            <button className="btn btn-secondary"  onClick={() => handleSendRequest("intrested",user._id)}>Intrested</button>
          </div>
        </div>
      </div>
    </div>
  );
}; 

export default UserCard;
