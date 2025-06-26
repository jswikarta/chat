import { useEffect, useRef, useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";

export default function ModalLogin({ setShowModalLogin }) {
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleInputChange = (event) => {
    setName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem("UserSession", JSON.stringify({ name: name }));

    setShowModalLogin(false);
  };

  return (
    <>
      <div className="fixed z-50 flex h-screen w-full items-center justify-center bg-white">
        <form
          onSubmit={handleSubmit}
          className="-translate-y-30 transform rounded-sm border border-gray-100 p-4 shadow-sm"
        >
          <div className="flex w-72 flex-col gap-4 text-center">
            <p className="text-sm text-gray-600">Silahkan masukkan nama anda</p>

            <Input
              id={"name"}
              value={name}
              onChange={handleInputChange}
              placeholder={"Johan Saka Wikarta"}
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
