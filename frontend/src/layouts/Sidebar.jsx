import { useEffect, useState } from "react";
import Input from "../components/Input";
import ListRoom from "./components/ListRoom";

export default function Sidebar({
  ws,
  setSelectedRoom,
  setShowModalLogin,
  setShowModalRoom,
}) {
  const [search, setSearch] = useState("");
  const [roomsData, setRoomsData] = useState([]);
  const [roomsData2, setRoomsData2] = useState([]);

  useEffect(() => {
    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      if (data.type === "ping") return;
      if (data.type === "welcome") return;
      if (data.type === "confirm_subscription") return;

      if (data.identifier && data.identifier.includes("RoomChannel")) {
        const message = data.message;
        setRoomsData((prevData) => [...prevData, message]);
        setRoomsData2((prevData) => [...prevData, message]);
      }
    };
  }, [ws]);

  const fetchRoom = async () => {
    const response = await fetch("http://localhost:3000/rooms");
    const data = await response.json();
    setRoomsData(data);
    setRoomsData2(data);
  };

  useEffect(() => {
    fetchRoom();
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;

    setSearch(value);
    setRoomsData(
      roomsData2.filter((i) =>
        i.name.toLowerCase().includes(value.toLowerCase()),
      ),
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("UserSession");
    setShowModalLogin(true);
  };

  return (
    <>
      <aside className="fixed h-screen w-full overflow-y-auto border-r border-gray-200 bg-white shadow-xs md:w-128">
        <div className="flex flex-col">
          <div className="px-8">
            <div className="flex h-12 items-center justify-between space-x-2">
              <div className="text-2xl font-bold text-slate-700">Chat Room</div>

              <button
                onClick={() => setShowModalRoom(true)}
                className="text-green-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="28px"
                  viewBox="0 -960 960 960"
                  width="28px"
                  fill="currentColor"
                >
                  <path d="M440-400h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM80-80v-720q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v480q0 33-23.5 56.5T800-240H240L80-80Z" />
                </svg>
              </button>
            </div>
            <div className="mt-3 flex justify-between">
              <div className="w-full">
                <Input
                  id={"search"}
                  value={search}
                  onChange={handleInputChange}
                  placeholder={"Cari Atau Buat Room Baru"}
                />
              </div>
            </div>
          </div>

          <div className="mt-3 flex-1">
            <ul className="max-h-[calc(100vh-172px)] overflow-y-auto pr-2">
              {roomsData.length > 0 &&
                roomsData.map((room) => (
                  <div key={room.id} className="px-8">
                    <ListRoom
                      roomData={room}
                      setSelectedRoom={setSelectedRoom}
                    />
                  </div>
                ))}
            </ul>
          </div>

          <div className="">
            <button
              onClick={handleLogout}
              className="m-4 text-gray-600 hover:text-gray-700"
            >
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
