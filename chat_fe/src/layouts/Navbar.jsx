export default function Navbar({ selectedRoom, setSelectedRoom }) {
  return (
    <>
      <nav className="flex h-14 items-center bg-white px-2 shadow-md">
        <button
          size="sm"
          onClick={() => setSelectedRoom(null)}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="30px"
            viewBox="0 -960 960 960"
            width="30px"
            fill="currentColor"
          >
            <path d="M354-270 144-480l210-210 51 51-123 123h534v72H282l123 123-51 51Z" />
          </svg>
        </button>
        <div className="ml-4">{selectedRoom.name}</div>
      </nav>
    </>
  );
}
