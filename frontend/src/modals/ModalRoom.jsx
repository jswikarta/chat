import { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

export default function ModalRoom({ setShowModalRoom }) {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setName(value.slice(0, 20));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch("http://localhost:3000/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ room: { name: name } }),
    });

    setShowModalRoom(false);
  };

  return (
    <>
      <div className="fixed z-50 flex h-screen w-full items-center justify-center bg-gray-400/50">
        <button
          onClick={() => setShowModalRoom(false)}
          className="absolute top-0 right-0 m-2 rounded-full bg-white text-red-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="currentColor"
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
          </svg>
        </button>
        <form
          onSubmit={handleSubmit}
          className="-translate-y-30 transform rounded-sm border border-gray-100 bg-white p-4 shadow-sm"
        >
          <div className="flex w-72 flex-col gap-4 text-center">
            <p className="text-sm text-gray-600">
              Silahkan masukkan nama room baru
            </p>

            <Input
              id={"name"}
              value={name}
              onChange={handleInputChange}
              placeholder={"Makan Makan"}
              className={`text-center`}
              ref={inputRef}
            />

            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </div>
    </>
  );
}
