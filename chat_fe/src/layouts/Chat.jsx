import { useEffect, useRef, useState } from "react";
import userImage from "../assets/user.png";
import FormChat from "./components/FormChat";
import Navbar from "./Navbar";

function Chat({ ws, selectedRoom, setSelectedRoom }) {
  const [firstLoad, setFirstLoad] = useState([]);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = (behavior) => {
    messagesEndRef.current?.scrollIntoView({ behavior: behavior });
  };

  useEffect(() => {
    if (messages.length > firstLoad.length) {
      scrollToBottom("smooth");
    } else {
      scrollToBottom("auto");
    }
  }, [messages, firstLoad]);

  useEffect(() => {
    const fetchChat = async (id) => {
      const response = await fetch(
        `http://localhost:3000/rooms/${id}/chats`,
      );
      const data = await response.json();
      setMessages(data);
      setFirstLoad(data);
    };

    fetchChat(selectedRoom.id);
  }, [selectedRoom.id]);

  useEffect(() => {
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "ping") return;
      if (data.type === "welcome") return;
      if (data.type === "confirm_subscription") return;

      const identifier = JSON.parse(data.identifier || "{}");
      if (
        identifier.channel === "ChatChannel" &&
        identifier.room_id === selectedRoom.id
      ) {
        setMessages((prevData) => [...prevData, data.message]);
      }
    };
  }, [ws, selectedRoom.id]);

  return (
    <>
      <div className="flex h-screen flex-col bg-gray-200">
        <Navbar selectedRoom={selectedRoom} setSelectedRoom={setSelectedRoom} />

        <div className="flex-1 overflow-y-auto px-8 pb-8">
          <ul className="flex flex-col justify-end">
            <li className="h-5"></li>
            {messages.length > 0 &&
              messages.map((message) => (
                <li className="flex pt-2" key={message.id}>
                  <img
                    src={userImage}
                    className="mr-4 h-12 w-12 rounded-full border border-green-400"
                  />
                  <div className="">
                    <div className="rounded-tr-xl rounded-br-xl rounded-bl-xl bg-white px-4 py-2 shadow-sm">
                      <div className="text-blue-600">{message.name}</div>
                      <div className="break-all">{message.body}</div>
                    </div>
                    <div className="text-end text-xs text-gray-400">
                      {formatTime(message.created_at)}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
          <div ref={messagesEndRef} />
        </div>

        <FormChat roomId={selectedRoom.id} />
      </div>
    </>
  );
}

function formatTime(isoString) {
  const date = new Date(isoString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

export default Chat;
