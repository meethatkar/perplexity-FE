import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSocketIO } from "../hooks/UseSocketIO";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, loading } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const socketIO = useSocketIO();

  useEffect(() => {
    console.log(socketIO.initializeSocketConnection());
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  return <div>{user?.username}</div>;
};

export default Dashboard;
