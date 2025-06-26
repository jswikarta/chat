export default function Button({ children, className, onClick, size = "md" }) {
  const sizeClass =
    size === "md"
      ? "text-md rounded-full border bg-green-400 border-green-400 px-4 py-1 text-gray-100 hover:bg-green-500 hover:text-gray-100 "
      : size === "sm"
        ? "text-sm rounded-sm border border-green-400 px-2 py-0.5 text-green-400 hover:bg-green-400 hover:text-gray-100 "
        : "";

  return (
    <>
      <button
        onClick={onClick}
        className={
          "flex min-w-auto items-center justify-center transition-colors duration-200 ease-in-out " +
          className +
          sizeClass
        }
      >
        {children}
      </button>
    </>
  );
}
