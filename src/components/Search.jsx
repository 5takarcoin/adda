import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [userFound, setUserFound] = useState(null);
  const [error, setError] = useState(false);

  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSearch = async () => {
    setUserFound(null);
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserFound(doc.data());
      });
    } catch {
      setError(true);
      console.log(error);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    dispatch({ type: "CHANGE_USER", payload: userFound });
    const combinedId =
      user.uid > userFound.uid
        ? user.uid + userFound.uid
        : userFound.uid + user.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: userFound.uid,
            displayName: userFound.displayName,
            photoURL: userFound.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", userFound.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }
    setUserFound(null);
    setUsername("");
  };
  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find users"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
        />
      </div>
      {userFound && (
        <div className="userChat" onClick={handleSelect}>
          <img src={userFound.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{userFound.displayName}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
