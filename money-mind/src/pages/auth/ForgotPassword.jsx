import { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👉 ici tu peux connecter ton backend plus tard
    console.log("Reset link sent to:", email);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-2">
      
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-2xl shadow-md w-[90%] sm:w-96 space-y-4"
        style={{ backgroundColor: "rgba(230, 235, 248, 0.53)" }}
      >

        {/* TITLE */}
        <h1 className="text-2xl font-bold text-center text-gray-700">
          Forgot Password
        </h1>

        {/* SUBTITLE */}
        <p className="text-sm text-gray-600 text-center">
          Enter your email address to receive a reset link and regain access to your account
        </p>

        {/* EMAIL */}
        <div className="flex flex-col items-start gap-1 w-full">
          <label className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl2 px-4 py-3 outline-none"
            style={{ backgroundColor: "rgba(225, 229, 248, 0.57)" }}
            required
          />
        </div>

        {/* BUTTON */}
        <button
          type="submit"
          className="bg-primaryGreen text-lightText rounded-xl2 px-4 py-3 w-full"
        >
          Continue
        </button>

        {/* BACK TO LOGIN */}
        <p className="text-sm text-center">
          Remember your password?{" "}
          <Link to="/login" className="text-green-300">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
};

export default ForgotPassword;