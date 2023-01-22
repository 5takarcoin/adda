import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="user">
        <img src={user.photoURL} alt="" />
        <span>{user.displayName}</span>
      </div>
      <button onClick={async () => await signOut(auth)}>Logout</button>
    </div>
  );
};

export default Navbar;
