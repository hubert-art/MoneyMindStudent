export const Button = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className="
        bg-green-300
        text-[#EFF2F9]
        px-5 py-3
        rounded-[30px]
        font-medium
        hover:opacity-90
        active:scale-95
        transition
      "
    >
      {children}
    </button>
  );
};