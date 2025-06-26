import groupImage from "../../assets/group.png";

export default function ListRoom({ roomData, setSelectedRoom }) {
  return (
    <>
      <li
        onClick={() =>
          setSelectedRoom({ id: roomData.id, name: roomData.name })
        }
        className="flex items-center rounded-md p-2 py-4 text-lg hover:bg-gray-100"
      >
        <img
          src={groupImage}
          className="mr-4 h-12 w-12 rounded-full border border-green-400 bg-gray-100"
        />
        {roomData.name}
      </li>
    </>
  );
}
