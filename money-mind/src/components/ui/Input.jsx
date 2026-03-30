export const Input = ({ ...props }) => {
  return (
    <input
      {...props}
      className="
        w-full
        px-4 py-3
        bg-[#E1E5F8]
        rounded-[30px]
        outline-none
        text-sm
        placeholder:text-[rgba(0,0,0,0.45)]
        focus:ring-2 focus:ring-green-400
      "
    />
  );
};