import { useEffect, useState } from "react";
import Sidebar from "./layouts/Sidebar";
import ModalLogin from "./modals/ModalLogin";
import ModalRoom from "./modals/ModalRoom";
import Chat from "./layouts/Chat";

const ws = new WebSocket("ws://localhost:3000/cable");

export default function App() {
  const [selectedRoom, setSelectedRoom] = useState();
  const [showModalRoom, setShowModalRoom] = useState(false);
  const [showModalLogin, setShowModalLogin] = useState(false);

  useEffect(() => {
    if (selectedRoom) {
      const identifier = JSON.stringify({
        channel: "ChatChannel",
        room_id: selectedRoom.id,
      });

      ws.send(
        JSON.stringify({
          command: "subscribe",
          identifier: identifier,
        }),
      );

      return () => {
        ws.send(
          JSON.stringify({
            command: "unsubscribe",
            identifier: identifier,
          }),
        );
      };
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
