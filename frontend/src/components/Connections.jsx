import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const handleGetConnections = async () => {
    try {
      const res = await axios.get(BASE_URL+"/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() =>{
    handleGetConnections();
  },[])
  return (
    <div className="flex justify-center p-4 bg-base-200 h-screen">
      <h1 className="text-bold text-2xl">Connections</h1>
    </div>
  );
};

export default Connections;
