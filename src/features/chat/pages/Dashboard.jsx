import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
  }

  return <div>{user?.username}</div>;
};

export default Dashboard;
