import { useEffect, useState } from "react";
import Sidebar from "./layouts/Sidebar";
import ModalLogin from "./modals/ModalLogin";
import ModalRoom from "./modals/ModalRoom";
import Chat from "./layouts/Chat";
import ChatChannel from "./channels/Chat";
import RoomChannel from "./channels/Room";

const ws = new WebSocket("ws://localhost:3000/cable");

export default function App() {
  const [selectedRoom, setSelectedRoom] = useState();
  const [showModalRoom, setShowModalRoom] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);

  useEffect(() => {
    ws.onopen = () => {
      RoomChannel(ws);
    };
  }, []);

  useEffect(() => {
    if (selectedRoom && selectedRoom.id) {
      ChatChannel(ws, selectedRoom.id);
    }
  }, [selectedRoom]);

  useEffect(() => {
    const localSession = localStorage.getItem("UserSession");
    if (!localSession) {
      setShowModalLogin(true);
      return;
    }

    const parseSession = JSON.parse(localSession);
    if (!parseSession || !parseSession.name) {
      setShowModalLogin(true);
      return;
    }
  }, []);

  return (
    <>
      {showModalRoom && <ModalRoom setShowModalRoom={setShowModalRoom} />}
      {showModalLogin && <ModalLogin setShowModalLogin={setShowModalLogin} />}
      <div className={!selectedRoom ? "block" : "hidden md:block"}>
        <Sidebar
          ws={ws}
          setSelectedRoom={setSelectedRoom}
          setShowModalRoom={setShowModalRoom}
          setShowModalLogin={setShowModalLogin}
        />
      </div>

      {selectedRoom && (
        <div className="md:ml-128">
          <Chat
            ws={ws}
            selectedRoom={selectedRoom}
            setSelectedRoom={setSelectedRoom}
          />
        </div>
      )}
    </>
  );
}
