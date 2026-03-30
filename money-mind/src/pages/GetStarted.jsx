import { useNavigate } from "react-router-dom";

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex items-center justify-center bg-[#F9FAFB]">

      {/* Box */}
      <div className="relative bg-white w-[90%] max-w-md p-8 rounded-2xl shadow text-center">

        {/* Logo (absolute) */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2">
          <div className=" p-3 rounded-full">
            <img
              src="/mind'.png"
              alt="MoneyMind Logo"
              className="h-30 object-contain"
            />
          </div>
        </div>

        {/* Content */}
        <h1 className="mt-8 text-xl font-semibold text-gray-700">
          Welcome to MoneyMind
        </h1>

        <p className="mt-2 text-gray-500">
          Track your expenses and manage your money easily
        </p>

        {/* Button */}
        <button
          onClick={() => navigate("/login")}
          className="mt-6 w-full py-3 rounded-[30px]"
          style={{
            background: "rgba(34, 197, 94, 0.57)",
            color: "#EFF2F9",
          }}
        >
          Get Started
        </button>

      </div>
    </div>
  );
};

export default GetStarted;