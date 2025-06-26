import { useRef, useEffect } from "react";

export default function Textarea({ id, value, onChange, placeholder }) {
  const textareaRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // sesuaikan
    }
  }, [value]);

  return (
    <textarea
      id={id}
      ref={textareaRef}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="text-md w-full resize-none overflow-hidden rounded-xl border border-white bg-white px-6 py-4 pr-12 placeholder-gray-400 shadow-lg transition-colors duration-150 ease-in-out hover:border-green-400 focus:border-green-400 focus:bg-white focus:outline-none"
      rows={1}
      style={{ maxHeight: "6rem" }}
    />
  );
}
