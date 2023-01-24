import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import Input from "./Input";
import Messages from "./Messages";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user?.displayName}</span>
        <div>
          <img
            className="logo"
            src="https://cdn.discordapp.com/attachments/913539818246533132/1066120463769665586/image.png"
            alt=""
          />
        </div>
      </div>
      <Messages />
      {data.user.displayName ? (
        <Input />
      ) : (
        <div className="selectAnUser">
          <span>Select an User from Left</span>
          <br />
          <span>Find if you don't have any</span>
        </div>
      )}
    </div>
  );
};

export default Chat;
