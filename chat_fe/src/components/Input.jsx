export default function Input({
  id,
  value,
  onChange,
  placeholder,
  className = "",
  ref,
}) {
  return (
    <>
      <input
        id={id}
        ref={ref}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${className} text-md w-full rounded-full border border-white bg-gray-100 px-6 py-1.5 text-gray-700 placeholder-gray-400 transition-colors duration-150 ease-in-out hover:border-gray-300 focus:border-green-400 focus:bg-white focus:outline-none`}
      />
    </>
  );
}
