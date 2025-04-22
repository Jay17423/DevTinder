import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((store) => store.feed);
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (error) {
      console.error("Error fetching feed data:", error);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);



  if(!feed) return;


  if(feed.length <= 0) return <h1 className="flex justify-center text-3xl text-red-600" > No User Found !</h1>

  return (
    feed && (
      <div className="flex flex-col items-center justify-center h-screen bg-base-200">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
