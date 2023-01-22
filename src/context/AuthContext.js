import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => {
      unsub();
    };
  }, []);

  const processMessage = (message) => {
    return message
      .split("/")[1]
      .slice(0, -2)
      .split("-")
      .map((str) => str.charAt(0).toUpperCase() + str.slice(1))
      .join(" ");
  };

  return (
    <AuthContext.Provider value={{ user, processMessage }}>
      {children}
    </AuthContext.Provider>
  );
};
