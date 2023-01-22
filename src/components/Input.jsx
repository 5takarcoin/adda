import {
  arrayUnion,
  doc,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const { user } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleKey = (e) => {
    e.code === "Enter" && handleSend();
  };

  const handleSend = async () => {
    setText("");
    setImage(null);

    ref.value = "";
    if (image) {
      const storageRef = ref(storage, `messages/${v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        (error) => {
          console.log(error);
        },
        async () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: v4(),
                text,
                senderId: user.uid,
                date: Timestamp.now(),
                image: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      const newText = text
        .replace(/\s+/g, " ")
        .replace(/^\s+|\s+$/g, "")
        .replace(/ +(\W)/g, "$1");
      if (newText === "") return;
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: v4(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
        }),
      });
    }
    await updateDoc(doc(db, "userChats", user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
  };
  return (
    <div className="input">
      <input
        type="text"
        placeholder="Write something..."
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKey}
        value={text}
      />
      <div className="send">
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImage(e.target.files[0])}
          // value={image}
        />
        <label htmlFor="file">
          <i className="fa-sharp fa-solid fa-images"></i>
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Input;
