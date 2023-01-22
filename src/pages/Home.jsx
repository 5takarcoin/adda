import React, { useContext } from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
};

export default Home;
