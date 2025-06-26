import { useState } from "react";
import Textarea from "../../components/Textarea";

export default function FormChat({ roomId }) {
  const [text, setText] = useState("");

  const localSession = localStorage.getItem("UserSession");
  const parseSession = JSON.parse(localSession);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await fetch(`http://localhost:3000/rooms/${roomId}/chats`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat: {
          name: parseSession.name,
          body: text,
        },
      }),
    });

    setText("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex w-full gap-4 px-6 pb-8">
        <div className="flex h-12 w-full items-end">
          <Textarea
            id={`text`}
            value={text}
            inputFor="text"
            onChange={handleInputChange}
          />
          <button
            type="submit"
            className="fixed right-0 bottom-0 h-9.5 w-9.5 -translate-x-8 -translate-y-10 transform rounded-full bg-green-400 p-2 hover:bg-green-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M120-160v-640l760 320-760 320Zm80-120 474-200-474-200v140l240 60-240 60v140Zm0 0v-400 400Z" />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
}
