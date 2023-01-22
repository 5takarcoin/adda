import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { user } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const ref = useRef();
  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  const processDate = (s) => {
    return new Date(s * 1000).toTimeString().split(" ")[0];
  };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === user.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === user.uid ? user.photoURL : data.user.photoURL
          }
          alt=""
        />
        <span>{processDate(message.date.seconds)}</span>
      </div>
      <div className="messageContent">
        {message.text !== "" && <p>{message.text}</p>}
        {message.image && <img src={message.image} alt="" />}
      </div>
    </div>
  );
};

export default Message;
